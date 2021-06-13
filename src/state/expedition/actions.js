export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const SET_LEVEL = 'SET_LEVEL';
export const UPDATE_VALUES = 'UPDATE_VALUES';
export const UPDATE_PROGRESS_PER_TICK = 'UPDATE_PROGRESS_PER_TICK';

export const updateProgressPerTick = val => ({
    type: UPDATE_PROGRESS_PER_TICK,
    payload: val || 0,
});

export const setExpeditionMapLevel = (level) => ({
    type: SET_LEVEL,
    payload: {
        level,
    }
});


export const updateValues = (values) => ({
    type: UPDATE_VALUES,
    payload: values,
});
