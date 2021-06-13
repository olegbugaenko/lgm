export const getBuildings = (state) => Object.values(state.app.buildings?.list)
    .sort((a,b) => a.sort > b.sort ? 1 : (a.sort < b.sort ? -1 : 0));
