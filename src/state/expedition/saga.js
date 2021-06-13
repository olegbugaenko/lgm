import { put, select, takeLatest, call } from 'redux-saga/effects';
import {setExpeditionMapLevel, UPDATE_PROGRESS, updateValues} from "./actions";
import {MODIFY_RESOURCE} from "../resources/actions";
import {postNotification} from "../navigation/actions";

class ExpeditionSaga {

    static *checkProgress() {
        //console.log('worked');
        const progress = yield select(state => state.app.expedition);
        progress.progress += progress.progressPerTick;
        // console.log('progress', progress);
        if(progress.progress >= progress.maxProgress) {
            progress.progress = 0;
            progress.subLevelsProgress++;
            /* grant some sweat cookies */
            const lootLevel = amount => Math.round(amount * (progress.level + 1) * Math.pow(progress.progressPerTick/2, 0.4));
            const add = {};
            const rand = Math.random()*100;
            switch (true) {
                case rand < 30:
                    add.food = lootLevel(20);
                    break;
                case rand < 50:
                    add.wood = lootLevel(15);
                    break;
                case rand < 65:
                    add.stone = lootLevel(8);
                    break;
                case rand < 75:
                    add.science = lootLevel(5);
                    break;
                case rand < 80:
                    add.population = lootLevel(4);
                    break;
                case rand < 83:
                    add.territory = lootLevel(1);
                    break;
                default:
                    break;
            }
            console.log('rnd', rand, add);
            for(let resource in add) {
                if(resource !== 'territory') {
                    yield put({
                        type: MODIFY_RESOURCE,
                        payload: {
                            resource,
                            value: add[resource],
                        }
                    });
                } else {
                    progress.territoryGain += add[resource];
                }

                yield put(postNotification({
                    message: `Your expedition just found ${add[resource]} ${resource}`,
                }))
            }
        }
        if(progress.subLevelsProgress >= progress.maxSubLevels) {
            /*progress.progress = 0;
            progress.subLevelsProgress = 0;*/
            progress.territoryGain += Math.round(5*Math.pow((progress.level+1), 1.5));
            yield put(setExpeditionMapLevel(progress.level));
            yield put(updateValues({ territoryGain: progress.territoryGain }));

        } else {
            yield put(updateValues({ ...progress }));
        }
    }

    static *watch() {
        yield takeLatest(UPDATE_PROGRESS, ExpeditionSaga.checkProgress);
    }

}

export default ExpeditionSaga;
