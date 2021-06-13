export const buildings = [{
    id: "farm",
    name: "Farm",
    maxQuantity: 1.e+44,
    maxWorkers: ({buildings, researches, resources}) => 5,
    resourcesToBuild: qty => ({
        // food: 75*Math.pow(1.05, qty),
        wood: 70*Math.pow(1.05, qty)
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        food: 1,
    }),
    isAvailable: ({buildings, researches, resources}) => true,
    territoryRequired: 1,
    sort: 0,
    category: "resources"
},{
    id: "woodcutter",
    name: "Woodcutter",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 3,
    resourcesToBuild: qty => ({
        food: 75*Math.pow(1.05, qty),
        //wood: 20*Math.pow(1.05, qty)
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        wood: 1,
    }),
    isAvailable: ({buildings, researches, resources}) => buildings?.farm?.level >= 1,
    territoryRequired: 1,
    sort: 1,
    category: "resources"
},{
    id: "stockpile",
    name: "Stock",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 0,
    resourcesToBuild: qty => ({
        food: 55*Math.pow(1.05, qty),
        wood: 20*Math.pow(1.05, qty)
    }),
    capacityProvided: ({buildings, researches, resources}) => ({
        food: 200+300*Math.pow(buildings?.stockpile?.level, 1.05),
        wood: 200+300*Math.pow(buildings?.stockpile?.level, 1.05),
        stone: 200+300*Math.pow(buildings?.stockpile?.level, 1.05),
        metal: 200+300*Math.pow(buildings?.stockpile?.level, 1.05),
    }),
    isAvailable: ({buildings, researches, resources}) => buildings?.woodcutter?.level >= 1,
    territoryRequired: 1,
    sort: 2,
    category: "resources"
},{
    id: "housingSmall",
    name: "Hut",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 0,
    resourcesToBuild: qty => ({
        food: 135*Math.pow(1.05, qty),
        wood: 130*Math.pow(1.05, qty)
    }),
    capacityProvided: ({buildings, researches, resources}) => ({
        population: 15+5*buildings?.housingSmall?.level,
    }),
    isAvailable: ({buildings, researches, resources}) => buildings?.woodcutter?.level >= 1,
    territoryRequired: 1,
    sort: 3,
    category: "residental"
},{
    id: "quarry",
    name: "Quarry",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 3,
    resourcesToBuild: qty => ({
        food: 235*Math.pow(1.05, qty),
        wood: 130*Math.pow(1.05, qty)
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        stone: 1,
    }),
    isAvailable: ({buildings, researches, resources}) => buildings?.woodcutter?.level >= 2,
    territoryRequired: 1,
    sort: 4,
    category: "resources",
},{
    id: "metalmine",
    name: "Metal mine",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 5,
    resourcesToBuild: qty => ({
        stone: 2235*Math.pow(1.05, qty),
        wood: 3700*Math.pow(1.05, qty)
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        metal: 1,
    }),
    isAvailable: ({buildings, researches, resources}) => buildings?.woodcutter?.level >= 4 && researches?.mining?.level > 0,
    territoryRequired: 1,
    sort: 5,
    category: "resources",
},{
    id: "research-sm",
    name: "Observatory",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 30,
    resourcesToBuild: qty => ({
        wood: 2350*Math.pow(1.05, qty),
        stone: 1300*Math.pow(1.05, qty)
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        science: 0.5,
    }),
    isAvailable: ({buildings, researches, resources}) => buildings?.quarry?.level >= 2,
    territoryRequired: 1,
    sort: 6,
    category: "research",
},{
    id: "housingMedium",
    name: "Small House",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 0,
    resourcesToBuild: qty => ({
        food: 935*Math.pow(1.05, qty),
        wood: 630*Math.pow(1.05, qty),
        stone: 500*Math.pow(1.05, qty),
    }),
    capacityProvided: ({buildings, researches, resources}) => ({
        population: 10*buildings?.housingMedium?.level,
    }),
    isAvailable: ({buildings, researches, resources}) => researches?.math?.level >= 1,
    territoryRequired: 1,
    sort: 7,
    category: "residental"
},{
    id: "scout-outpost",
    name: "Scouts outpost",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 3,
    resourcesToBuild: qty => ({
        food: 155*Math.pow(1.05, qty),
        wood: 120*Math.pow(1.05, qty),
        // stone: 150*Math.pow(1.05, qty),
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        expedition: 0.5,
    }),
    isAvailable: ({buildings, researches, resources}) => true,
    territoryRequired: 1,
    sort: 8,
    category: "war"
},{
    id: "warehouse",
    name: "Warehouse",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 0,
    resourcesToBuild: qty => ({
        food: 1000*Math.pow(1.1, qty),
        wood: 1000*Math.pow(1.1, qty),
        stone: 1000*Math.pow(1.1, qty),
    }),
    capacityProvided: ({buildings, researches, resources}) => ({
        food: 2000*Math.pow(buildings?.warehouse?.level, 1.1),
        wood: 2000*Math.pow(buildings?.warehouse?.level, 1.1),
        stone: 2000*Math.pow(buildings?.warehouse?.level, 1.1),
        metal: 2000*Math.pow(buildings?.warehouse?.level, 1.1),
    }),
    isAvailable: ({buildings, researches, resources}) => buildings?.woodcutter?.level >= 1,
    territoryRequired: 1,
    sort: 9,
    category: "resources"
},{
    id: "smallTownhouse",
    name: "Small Townhouse",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 0,
    resourcesToBuild: qty => ({
        food: 2935*Math.pow(1.05, qty),
        wood: 2630*Math.pow(1.05, qty),
        stone: 2500*Math.pow(1.05, qty),
        metal: 1500*Math.pow(1.05, qty),
    }),
    capacityProvided: ({buildings, researches, resources}) => ({
        population: 25*buildings?.smallTownhouse?.level,
    }),
    isAvailable: ({buildings, researches, resources}) => researches?.architecture?.level >= 1,
    territoryRequired: 1,
    sort: 10,
    category: "residental"
}]
