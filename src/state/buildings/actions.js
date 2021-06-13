export const INIT_BUILDINGS = 'INIT_BUILDINGS';
export const SET_BUILDINGS_META = 'SET_BUILDINGS_META';
export const BUILD = 'PURCHASE_BUILDING';
export const UPDATE_BUILDING_LEVEL = 'UPDATE_BUILDING_LEVEL';
export const SET_WORKERS = 'SET_WORKERS';
export const SET_AUTOFILL_OPTIONS = 'SET_AUTOFILL_OPTIONS';
export const SET_QTY = 'SET_QTY';

export const setQty = ({ buildingId, qty }) => ({
    type: SET_QTY,
    payload: {
        buildingId,
        qty: Math.max(+qty, 1),
    }
})

export const autoFillSet = ({buildingId, isAutofill, autofillPercentage }) => ({
    type: SET_AUTOFILL_OPTIONS,
    payload: {
        buildingId,
        autofill: {
            isTurnedOn: isAutofill,
            percentage: autofillPercentage,
        }
    }
})


export const purchaseBuilding = ({buildingId, qty = 1}) => ({
    type: BUILD,
    payload: {
        buildingId,
        qty,
    }
})

export const setWorkers = ({ buildingId, workers }) => ({
    type: SET_WORKERS,
    payload: {
        buildingId,
        workers,
    }
})
