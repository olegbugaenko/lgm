export const INIT_RESEARCHES = 'INIT_RESEARCHES';
export const SET_RESEARCH_META = 'SET_RESEARCH_META';
export const RESEARCH = 'PURCHASE_RESEARCH';
export const UPDATE_RESEARCH_LEVEL = 'UPDATE_RESEARCH_LEVEL';



export const purchaseResearch = ({researchId, qty = 1}) => ({
    type: RESEARCH,
    payload: {
        researchId,
        qty,
    }
})
