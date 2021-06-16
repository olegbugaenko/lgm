import { call, put, select, delay } from 'redux-saga/effects';
import * as ResourcesAction from './resources/actions';
import {INIT_BUILDINGS, SET_WORKERS} from "./buildings/actions";
import BuildingSaga from "./buildings/saga";
import ResearchSaga from "./researches/saga";
import ResourceHelper from "../helpers/resource-helper";
import {INIT_RESEARCHES} from "./researches/actions";
import {INIT_ACHIEVEMENTS} from "./achievements/actions";
import AchievementsSaga from "./achievements/saga";
import {UPDATE_PROGRESS} from "./expedition/actions";
import * as WarActions from "./war/actions";

class MainSaga {

    static *tick() {
        while(true) {
            yield put({type: INIT_BUILDINGS});
            yield put({type: INIT_RESEARCHES});
            yield put({type: INIT_ACHIEVEMENTS});
            yield put({type: UPDATE_PROGRESS});
            yield put({type: WarActions.UPDATE_PROGRESS});

            yield call(MainSaga.runTick);
            yield delay(1000);
        }
    }

    static *runTick() {
        // obtain buildings
        const buildings = yield select(state => state.app.buildings?.list);
        const researchesList = yield select(state => state.app.researches?.list);

        const resources = yield select((state) => {
            const rs = {};
            for(let key in state.app.resources) {
                rs[key] = state.app.resources[key].value;
            }
            return rs;
        });
        const researches = yield call(ResearchSaga.fillList, {
            buildings,
            resources,
            researches: researchesList,
        });

        const achievements = yield call(AchievementsSaga.checkAchievements, {
            buildings,
            resources,
            researches
        });
        // same for research

        // autofill labours
        let workers = BuildingSaga.getBusyLabours({ buildings });
        const maxLabour = Math.max(Math.floor(resources.population * 0.44),1);
        const bArr = Object.values(buildings)
            .sort((a,b) => a.sort > b.sort ? 1 : (a.sort < b.sort ? -1 : 0));
        let i = bArr.length - 1;
        console.log('labr: ', resources.population, maxLabour, workers, bArr[i].name);
        while(maxLabour - workers < 0) {
            let delta = Math.min(bArr[i].workers, workers - maxLabour);
            workers = workers - delta;
            yield put({
                type: SET_WORKERS,
                payload: {
                    buildingId: bArr[i].id,
                    workers: bArr[i].workers - delta,
                }
            });
            i--;
        }
        //console.log(maxLabour, workers);
        if(maxLabour - workers >= 1) {
            let i = 0;
            while(i < bArr.length) {
                if(bArr[i].autofill?.isTurnedOn) {
                    const target = Math.round(bArr[i].maxWorkers*bArr[i].autofill?.percentage/100);
                    if(target > bArr[i].workers) {
                        yield put({
                            type: SET_WORKERS,
                            payload: {
                                buildingId: bArr[i].id,
                                workers: Math.min(target, bArr[i].workers + maxLabour - workers),
                            }
                        });
                    }
                }
                i++;
            }
        }
        // console.log('wrk', maxLabour, workers);
        const freeWorkers = maxLabour - workers;



        const results = yield call(BuildingSaga.calculate, {
            buildings,
            resources,
            researches,
            achievements
        });
        /*yield put({type: ResourcesAction.SET_RESOURCE_METRICS, payload: {
            resource: 'population',
            income: 0.01*Math.max(resources.population, 5),
            // max: 15,
            freeLabour: freeWorkers,
        }});*/
        // now consume
        const consumption = {
            food: -resources.population * 0.2,
        }

        results.total.income.population = 0.004*Math.max(resources.population, 5)
            * Math.pow(results.total.happinessFactor, 1.5) * Math.pow(results.total.healthFactor, 2);

        // console.log('cons:', results.total.income.food, consumption.food);

        results.total.income = ResourceHelper.mergeValues(results.total.income, consumption);
        if(resources.food <= 0 && results.total.income.food <= 0) {
            results.total.income.population += Math.max(results.total.income.food*0.4, -0.1*resources.population);
            results.total.income.food = -resources.food-results.total.income.food;
        }
        if(resources.population < 2) {
            results.total.income.population = 2;
        }


        //results.total.income.science = 1000;

        for(let resource in {...results.total.income, ...results.total.capacity}) {
            yield put({type: ResourcesAction.SET_RESOURCE_METRICS, payload: {
                    resource,
                    income: results.total.income[resource] || 0,
                    max: results.total.capacity[resource] || 0,
                    freeLabour: resource === 'population' ? freeWorkers : null,
                }
            })
        }

        yield put({
            type: ResourcesAction.AUTOINCREMENT_ALL
        })

    }

}

export default MainSaga;
