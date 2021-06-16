import { put, select, takeLatest, call } from 'redux-saga/effects'
import { researches as ResearchList } from "../../database/researches";
import ResourceHelper from "../../helpers/resource-helper";
import {RESEARCH, SET_RESEARCH_META, UPDATE_RESEARCH_LEVEL} from "./actions";
import {MODIFY_RESOURCE} from "../resources/actions";

class ResearchSaga {

    static applyProductionEffect({buildingId, value, researches, tags }) {
        // console.log(Object.values(researches));
        const multiplier = Object.values(researches)
            .filter(r => {
                if(r.effect?.includes("all")) {
                    return true;
                }
                if(r.effect?.includes(buildingId)){
                    return true;
                }
                if(r.effect?.find(item => tags?.includes(item))) {
                    return true;
                }
                return false;
            })
            .reduce((accum, item) => accum * item.production, 1);
        // console.log('multp', multiplier);
        return ResourceHelper.multiply(value, multiplier);
    }

    static applyCapacityEffect({buildingId, value, researches }) {
        // console.log(Object.values(researches));
        const multiplier = Object.values(researches)
            .filter(r => r.effect?.includes(buildingId) || r.effect?.includes("all"))
            .reduce((accum, item) => accum * item.capacity, 1);
        // console.log('multp', multiplier);
        return ResourceHelper.multiply(value, multiplier);
    }


    static *fillList({
        buildings,
        researches,
        resources,
    }) {
        const result = {
            researches: {},
            total: {
                income: {},
                capacity: {}
            },
        };

        const meta = yield select((state) => state.app.resources);

        for(let researchId in researches ) {

            const researchInfo = ResearchList.find(b => b.id === researchId);

            if(!researchInfo) {
                continue;
            }

            const cost = researchInfo.resourcesToResearch(researches[researchId].level);



            result.researches[researchId] = {
                cost: cost,
                isAvailable: researchInfo.isAvailable({ buildings, researches, resources }),
                buildable: ResourceHelper.mapEnought(resources, cost, meta),
                isMaxLevelReach: researchInfo.maxQuantity <= researches[researchId].level,
                production: researchInfo.production ? researchInfo.production({
                    level: researches[researchId].level,
                    value: 1,
                }) : 1,
                capacity: researchInfo.capacity ? researchInfo.capacity({
                    level: researches[researchId].level,
                    value: 1,
                }) : 1,
                isCalculated: true,
                id: researchInfo.id,
                effect: researchInfo.effect,
                description: researchInfo.description,
                maxQuantity: researchInfo.maxQuantity,
                level: researches[researchId].level,
                name: researchInfo.name,
            }

           /* result.total.income = ResourceHelper.mergeValues(result.total.income, income);
            result.total.capacity = ResourceHelper.mergeValues(result.total.capacity, capacity);*/

        }
        yield put({
            type: SET_RESEARCH_META,
            payload: result.researches,
        })
        return result.researches;
    }

    static *watch() {
        yield takeLatest(RESEARCH, function *({payload}) {
            const buildings = yield select(state => state.app.buildings.list);
            const researches = yield select(state => state.app.researches.list);
            const research = researches[payload.researchId];
            const resources = yield select((state) => {
                const rs = {};
                for(let key in state.app.resources) {
                    rs[key] = state.app.resources[key].value;
                }
                return rs;
            });
            // console.log('rrs', research);
            if(research.isAvailable && research.buildable.isAvailable) {
                //double-check to make sure we have enought resources
                const enought = ResourceHelper.mapEnought(resources, research.cost);
                if(!enought.isAvailable) {
                    console.error('not-available');
                    return;
                }
                for(let resource in research.buildable.resources) {
                    yield put({
                        type: MODIFY_RESOURCE,
                        payload: {
                            resource,
                            value: -research.buildable.resources[resource].required,
                        }
                    })
                }
                // increase level
                yield put({
                    type: UPDATE_RESEARCH_LEVEL,
                    payload,
                })
                yield call(ResearchSaga.fillList, {
                    buildings,
                    resources,
                    researches: {...researches, [payload.researchId]: {...researches, level: research.level + 1}},
                })
            }
        })
    }

}

export default ResearchSaga;
