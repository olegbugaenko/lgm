export const getResearches = (state) => Object.values(state.app.researches?.list)
    .sort((a,b) => a.sort > b.sort ? 1 : (a.sort < b.sort ? -1 : 0));
