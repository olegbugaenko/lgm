import { put, select, takeLatest, call } from 'redux-saga/effects';
import {MODIFY_RESOURCE} from "../resources/actions";
import {postNotification} from "../navigation/actions";
import {SET_BATTLE_STATS, UPDATE_PROGRESS, START_BATTLE} from "./actions";
import {updateValues} from "../expedition/actions";

class WarSaga {

    static *initBattle(progress) {
        progress.warriors.amount = yield select(state => state.app.buildings.list?.barracks?.workers);
        if(!progress.warriors.amount)
            progress.warriors.amount = 0;
                progress.warriors.hpRemaining = progress.warriors.hp * progress.warriors.amount;
        progress.warriors.initialHP = progress.warriors.hpRemaining;
        progress.warriors.initialAmount = progress.warriors.amount;
        progress.enemy.hp = Math.round(8 * (1 + progress.stack/10) * Math.pow(1 + progress.level, 1.5));
        progress.enemy.attack = Math.round(3 * (1 + progress.stack/50) * Math.pow(1 + progress.level, 1.5));
        progress.enemy.amount = 10 * (1 + progress.level);
        progress.enemy.hpRemaining = progress.enemy.hp * progress.enemy.amount;
        progress.enemy.initialHP = progress.enemy.hpRemaining;
        progress.enemy.initialAmount = progress.enemy.amount;
        return progress;
    }

    static *startBattle() {
        let progress = yield select(state => state.app.war);
        if(progress.isBattleInProgress) return;
        progress.isBattleInProgress = true;
        progress = yield call(WarSaga.initBattle, progress);
        yield put({
            type: SET_BATTLE_STATS,
            payload: {
                ...progress,
            }
        })

    }

    static *checkProgress() {
        //console.log('worked');
        let progress = yield select(state => state.app.war);
        if(!progress.isBattleInProgress) {
            return;
        }
        const myAttack = progress.warriors.amount * progress.warriors.attack;
        const theirAttack = progress.enemy.amount * progress.enemy.attack;
        progress.warriors.hpRemaining -= theirAttack;
        progress.enemy.hpRemaining -= myAttack;
        const prevAmount = progress.warriors.amount;
        progress.warriors.amount = Math.ceil(progress.warriors.hpRemaining/progress.warriors.hp);
        progress.enemy.amount = Math.ceil(progress.enemy.hpRemaining/progress.enemy.hp);
        if(progress.warriors.amount - prevAmount < 0) {
            console.log('depopulate',progress.warriors.amount - prevAmount);
            yield put({
                type: MODIFY_RESOURCE,
                payload: {
                    resource: 'population',
                    value: progress.warriors.amount - prevAmount,
                }
            })
        }
        if(progress.warriors.amount <= 0) {
            // lost
            progress.isBattleInProgress = false;
            yield put(postNotification({
                message: 'Battle lost!',
                type: 'danger'
            }))
            // postNotification({message: 'Battle lost!', type: 'danger'})
        }
        if(progress.enemy.amount <= 0) {
            //reinit
            progress.stack++;
            if(progress.stack > 9) {
                progress.level++;
                progress.stack = 0;
                yield put(updateValues({ maxLevel: progress.level }));
            }
            progress = yield call(WarSaga.initBattle, progress)
        }
        yield put({
            type: SET_BATTLE_STATS,
            payload: {
                ...progress,
            }
        })

        /*// progress.progress += progress.progressPerTick;
        // console.log('progress', progress);
        if(progress.progress >= progress.maxProgress) {
            progress.progress = 0;
            progress.subLevelsProgress++;
            /!* grant some sweat cookies *!/
            const lootLevel = (amount, pow = 0.4) => Math.round(amount * (progress.level + 1) * Math.pow(progress.progressPerTick/2, pow));
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
                    add.territory = lootLevel(1, 0.2);
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
            /!*progress.progress = 0;
            progress.subLevelsProgress = 0;*!/
            progress.territoryGain += Math.round(5*Math.pow((progress.level+1), 1.5));
            yield put(setExpeditionMapLevel(progress.maxLevel));
            yield put(updateValues({ territoryGain: progress.territoryGain }));

        } else {
            yield put(updateValues({ ...progress }));
        }*/
    }

    static *watch() {
        yield takeLatest(UPDATE_PROGRESS, WarSaga.checkProgress);
        yield takeLatest(START_BATTLE, WarSaga.startBattle);
    }

}

export default WarSaga;
