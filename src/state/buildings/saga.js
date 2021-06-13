import { put, select, takeLatest, call } from 'redux-saga/effects'
import { buildings as BuildingList } from "../../database/buildings";
import ResourceHelper from "../../helpers/resource-helper";
import {BUILD, SET_BUILDINGS_META, UPDATE_BUILDING_LEVEL} from "./actions";
import {MODIFY_RESOURCE} from "../resources/actions";
import ResearchSaga from "../researches/saga";
import AchievementsSaga from "../achievements/saga";
import {UPDATE_PROGRESS_PER_TICK} from "../expedition/actions";

class BuildingSaga {

    static getBusyLabours = ({ buildings }) => Object.values(buildings).reduce(
        (accum, item) => accum + item.workers,
        0
    );

    static *calculate({
        buildings,
        researches,
        resources,
        achievements,
    }) {
        const result = {
            buildings: {},
            total: {
                income: {},
                capacity: {},
                territoryUsed: 0
            },
        };

        const meta = yield select((state) => state.app.resources);

        // pre-fetch some data
        for(let buildingId in buildings ) {
            const buildingInfo = BuildingList.find(b => b.id === buildingId);
            result.total.territoryUsed += buildingInfo.territoryRequired * buildings[buildingId].level;
        }

        const territoryMax = yield select(state => state.app.expedition?.territoryGain);


        for(let buildingId in buildings ) {

            const buildingInfo = BuildingList.find(b => b.id === buildingId);

            if(!buildingInfo) {
                continue;
            }

            const maxWorkers = buildingInfo.maxWorkers
                ? buildingInfo.maxWorkers({ buildings, researches, resources }) * buildings[buildingId].level : 0;

            buildings[buildingId].workers = Math.min(buildings[buildingId].workers, maxWorkers);

            let income = ResourceHelper.multiply(
                buildingInfo.productionPerWorker
                    ? buildingInfo.productionPerWorker({ buildings, researches, resources }) : {},
                buildings[buildingId].workers
            );

            income = ResearchSaga.applyProductionEffect({
                buildingId,
                value: income,
                researches,
            });

            income = AchievementsSaga.applyProductionEffect({
                buildingId,
                value: income,
                achievements,
            });

            let capacity = buildingInfo.capacityProvided
                    ? buildingInfo.capacityProvided({ buildings, researches, resources }) : {};

            capacity = ResearchSaga.applyCapacityEffect({
                buildingId,
                value: capacity,
                researches,
            });

            capacity = AchievementsSaga.applyCapacityEffect({
                buildingId,
                value: capacity,
                achievements,
            });

            buildings[buildingId].qty = buildings[buildingId].qty || 1;
            let cost = buildingInfo.resourcesToBuild(buildings[buildingId].level);
            const territoryReq = buildingInfo.territoryRequired * buildings[buildingId].qty;
            if(buildings[buildingId].qty && buildings[buildingId].qty > 1) {
                for(let lvl = buildings[buildingId].level+1; lvl < buildings[buildingId].level + buildings[buildingId].qty; lvl++) {
                    cost = ResourceHelper.mergeValues(cost, buildingInfo.resourcesToBuild(lvl))
                }
            }

            // console.log(researches);
            result.buildings[buildingId] = {
                income,
                cost: cost,
                capacity,
                maxWorkers,
                isAvailable: buildingInfo.isAvailable({ buildings, researches, resources }),
                buildable: ResourceHelper.mapEnought(resources, cost, meta),
                isMaxLevelReach: buildingInfo.maxQuantity <= buildings[buildingId].level,
                isCalculated: true,
                isEnoughtTerritory: 120 + territoryMax - result.total.territoryUsed >= territoryReq,
                // territoryUsed: buildingInfo.territoryRequired * buildings[buildingId].level,
            }

            result.total.income = ResourceHelper.mergeValues(result.total.income, income);
            result.total.capacity = ResourceHelper.mergeValues(result.total.capacity, capacity);
            // result.total.territoryUsed += buildingInfo.territoryRequired * buildings[buildingId].level;

        }
        yield put({
            type: UPDATE_PROGRESS_PER_TICK,
            payload: result.total.income?.expedition,
        });
        yield put({
            type: SET_BUILDINGS_META,
            payload: {buildings: result.buildings, territoryUsed: result.total.territoryUsed},
        })
        return result;
    }

    static *watch() {
        yield takeLatest(BUILD, function *({payload}) {
            const buildings = yield select(state => state.app.buildings.list);
            const building = buildings[payload.buildingId];
            const resources = yield select((state) => {
                const rs = {};
                for(let key in state.app.resources) {
                    rs[key] = state.app.resources[key].value;
                }
                return rs;
            });
            const researches = yield select(state => state.app.researches?.list);
            console.log('bbb', building);
            if(building.isAvailable && building.buildable.isAvailable) {
                // treat qty
                let cost = building.cost;
                /*if(payload.qty > 1) {
                    const buildingInfo = BuildingList.find(b => b.id === payload.buildingId);
                    for(let lvl = building.level+1; lvl < building.level + payload.qty; lvl++) {
                        cost = ResourceHelper.mergeValues(cost, buildingInfo.resourcesToBuild(lvl))
                    }
                }*/
                //double-check to make sure we have enought resources
                const enought = ResourceHelper.mapEnought(resources, cost);
                if(!enought.isAvailable) {
                    console.error('not-available');
                    return;
                }
                for(let resource in building.buildable.resources) {
                    yield put({
                        type: MODIFY_RESOURCE,
                        payload: {
                            resource,
                            value: -enought.resources[resource].required,
                        }
                    })
                }
                // increase level
                yield put({
                    type: UPDATE_BUILDING_LEVEL,
                    payload,
                });
                const achievements = yield select((state) => state.app.achievements?.list);
                yield call(BuildingSaga.calculate, {
                    buildings: {...buildings, [payload.buildingId]: {...building, level: building.level + 1}},
                    resources,
                    researches,
                    achievements,
                })
            }
        })
    }

}

export default BuildingSaga;
