export const achievements = [{
    id: "farming",
    name: "More food",
    maxQuantity: 1.e+44,
    requirments: ({buildings, researches, resources}) => {
        // console.log('log', Math.log(buildings.farm?.level));
      return Math.floor(Math.log(buildings.farm?.level)/Math.log(5));
    },
    getRequirements: (level) => ({
        buildings: {
            farm: Math.pow(5, level),
        }
    }),
    capacity: (level) => ({
        population: Math.pow(1.15, level),
    }),
    description: "Each achievement level increase max population by 15%",
    sort: 0,
},{
    id: "woodcutting",
    name: "Forests destroyer",
    maxQuantity: 1.e+44,
    requirments: ({buildings, researches, resources}) => {
        return Math.floor(Math.log(buildings.woodcutter?.level)/Math.log(5));
    },
    getRequirements: (level) => ({
        buildings: {
            woodcutter: Math.pow(5, level),
        }
    }),
    capacity: (level) => ({
        wood: Math.pow(1.15, level),
        food: Math.pow(1.15, level),
        stone: Math.pow(1.15, level),
        metal: Math.pow(1.15, level),
    }),
    description: "Each achievement level increase max resorces capacity by 15%",
    sort: 1,
},{
    id: "resourcekeeper",
    name: "Resource keeper",
    maxQuantity: 9.e+44,
    requirments: ({buildings, researches, resources}) => {
        return Math.floor(Math.log(buildings.stockpile?.level)/Math.log(5));
    },
    getRequirements: (level) => ({
        buildings: {
            stockpile: Math.pow(5, level),
        }
    }),
    production: (level) => ({
        wood: Math.pow(1.10, level),
        food: Math.pow(1.10, level),
        stone: Math.pow(1.10, level),
        metal: Math.pow(1.10, level),
    }),
    description: "Each achievement level increase resources production by 10%",
    sort: 2,
},{
    id: "wealth",
    name: "Rich guy",
    maxQuantity: 9.e+44,
    requirments: ({buildings, researches, resources}) => {
        return Math.floor(Math.log(buildings.stockpile?.level)/Math.log(5));
    },
    getRequirements: (level) => ({
        resources: {
            food: 100*Math.pow(5, level),
            wood: 50*Math.pow(5, level),
        }
    }),
    production: (level) => ({
        wood: Math.pow(1.10, level),
        food: Math.pow(1.10, level),
        stone: Math.pow(1.10, level),
        metal: Math.pow(1.10, level),
    }),
    description: "Each achievement level increase resources production by 10%",
    sort: 2,
}]
