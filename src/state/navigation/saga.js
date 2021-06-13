import { put, select, takeLatest, call, delay } from 'redux-saga/effects';
import {REMOVE_NOTIFICATIONS} from "./actions";

class UISaga {

    static *handleNotifications() {
        while(true) {
            yield delay(200);
            const nots = yield select(state => state.app.navigation.notifications);
            const notsToClose = (nots || []).filter(({expiresAt}) => expiresAt < (new Date()).getTime());
            if(notsToClose.length) {
                yield put({
                    type: REMOVE_NOTIFICATIONS,
                    payload: {
                        ids: notsToClose.map(one => one.id),
                    }
                })
            }
        }
    }

}

export default UISaga;
