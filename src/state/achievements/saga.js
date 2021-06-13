import { put, select, takeLatest, call } from 'redux-saga/effects'
import { achievements as AchievementList } from "../../database/achievements";
import ResourceHelper from "../../helpers/resource-helper";
import { SET_ACHIEVEMENT_META } from "./actions";

class AchievementsSaga {


    static applyProductionEffect({buildingId, value, achievements }) {
        const newVal = {...value};
        const multipliers = Object.values(achievements)
            .filter(a => a.production);

        multipliers.forEach(m => {
            for(let key in newVal) {
                newVal[key] = newVal[key] * (m.production[key] || 1);
            }
        });
        // console.log(value, multipliers, newVal);
        return newVal;
    }

    static applyCapacityEffect({buildingId, value, achievements }) {
        const newVal = {...value};
        const multipliers = Object.values(achievements)
            .filter(a => a.capacity);

        multipliers.forEach(m => {
            for(let key in newVal) {
                newVal[key] = newVal[key] * (m.capacity[key] || 1);
            }
        });

        return newVal;
    }

    static assertLevel({ achievement, buildings, resources, researches }) {
        let result = {
            level: 0,
            next: {

            },
            meta: {

            }
        };
        let isComplete = true;
        while(isComplete) {
            result.next = achievement.getRequirements(result.level+1);
            if(result.level >= achievement.maxQuantity) {
                isComplete = false;
                break;
            }
            if(result.next.buildings) {
                for(let buildingId in result.next.buildings) {
                    if(buildings[buildingId]?.level < result.next.buildings[buildingId]) {
                        isComplete = false;
                        break;
                    }
                }
            }
            if(result.next.resources) {
                for(let id in result.next.resources) {
                    if(resources[id] < result.next.resources[id]) {
                        isComplete = false;
                        break;
                    }
                }
            }
            if(isComplete)
                result.level++;
        }

        return result;
    }

    static *checkAchievements({
        buildings,
        researches,
        resources,
    }) {
        const result = {
            achievements: {},
        };

        const achievements = yield select((state) => state.app.achievements?.list);

        for(let achievementId in achievements ) {

            const achievementInfo = AchievementList.find(b => b.id === achievementId);

            if(!achievementInfo) {
                continue;
            }

            const level = AchievementsSaga.assertLevel({
                achievement: achievementInfo,
                buildings,
                researches,
                resources,
            });

            result.achievements[achievementId] = {
                ...level,
                ...achievementInfo,
                capacity: achievementInfo.capacity ? achievementInfo.capacity(level.level) : null,
                production: achievementInfo.production ? achievementInfo.production(level.level) : null,
            }

           /* result.total.income = ResourceHelper.mergeValues(result.total.income, income);
            result.total.capacity = ResourceHelper.mergeValues(result.total.capacity, capacity);*/

        }
        yield put({
            type: SET_ACHIEVEMENT_META,
            payload: result.achievements,
        })
        return result.achievements;
    }


}

export default AchievementsSaga;
