export const getAchievements = (state) => Object.values(state.app.achievements?.list)
    .sort((a,b) => a.sort > b.sort ? 1 : (a.sort < b.sort ? -1 : 0));

export const getWithMeta = (state) => {
    const achieves = Object.values(state.app.achievements?.list);
    const metaFromRes = (a) => {
      if(!a.next.resources) return [];
      let result = [];
      for(let id in a.next.resources) {
          result.push({
              required: a.next.resources[id],
              present: state.app.resources[id]?.value,
              name: state.app.resources[id]?.name,
              isEnought: state.app.resources[id]?.value >= a.next.resources[id]
          })
      }
      return result;
    };
    const metaFromBuildings = (a) => {
        if(!a.next.buildings) return [];
        let result = [];
        for(let id in a.next.buildings) {
            result.push({
                required: a.next.buildings[id],
                present: state.app.buildings.list[id]?.level,
                name: state.app.buildings.list[id]?.name,
                isEnought: state.app.buildings.list[id]?.level >= a.next.buildings[id]
            })
        }
        return result;
    };
    return achieves.map(a => ({
        ...a,
        requirementsMeta: [
            ...metaFromBuildings(a),
            ...metaFromRes(a)
        ]
    }))
}
