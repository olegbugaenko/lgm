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
    category: "resources",
    tags: ["wood"],
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
    category: "resources",
    tags: ["storage"],
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
    tags: ["stone"],
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
    tags: ["metal"],
},{
    id: "research-sm",
    name: "Observatory",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 10,
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
    tags: ["science"],
},{
    id: "research-smm",
    name: "School",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 15,
    resourcesToBuild: qty => ({
        wood: 12350*Math.pow(1.05, qty),
        stone: 11300*Math.pow(1.05, qty),
        metal: 10500*Math.pow(1.05, qty)
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        science: 1,
    }),
    isAvailable: ({buildings, researches, resources}) => researches?.math?.level >= 1,
    territoryRequired: 1,
    sort: 6,
    category: "research",
    tags: ["science"],
},{
    id: "research-med",
    name: "University",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 30,
    resourcesToBuild: qty => ({
        wood: 112350*Math.pow(1.05, qty),
        stone: 111300*Math.pow(1.05, qty),
        metal: 110500*Math.pow(1.05, qty)
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        science: 1.5,
    }),
    isAvailable: ({buildings, researches, resources}) => researches?.fundamentalSciences?.level >= 1,
    territoryRequired: 1,
    sort: 6,
    category: "research",
    tags: ["science"],
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
    category: "war",
    tags: ["expedition"],
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
    category: "resources",
    tags: ["storage"],
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
},{
    id: "monument",
    name: "Monument",
    maxQuantity: 1000000,
    maxWorkers: ({buildings, researches, resources}) => 1,
    resourcesToBuild: qty => ({
        wood: 70*Math.pow(1.05, qty),
        stone: 50*Math.pow(1.05, qty),
        // metal: 1500*Math.pow(1.05, qty),
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        happiness: 12,
    }),
    isAvailable: ({buildings, researches, resources}) => researches?.mysticism?.level >= 1,
    territoryRequired: 1,
    sort: 10,
    category: "social"
},{
    id: "temple",
    name: "Temple",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 8,
    resourcesToBuild: qty => ({
        wood: 2630*Math.pow(1.05, qty),
        stone: 2500*Math.pow(1.05, qty),
        metal: 100*Math.pow(1.05, qty),
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        happiness: 15,
    }),
    isAvailable: ({buildings, researches, resources}) => researches?.religion?.level >= 1,
    territoryRequired: 1,
    sort: 10,
    category: "social"
},{
    id: "herbalistHut",
    name: "Herbalist Hut",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 4,
    resourcesToBuild: qty => ({
        wood: 1630*Math.pow(1.05, qty),
        stone: 500*Math.pow(1.05, qty),
        //metal: 100*Math.pow(1.05, qty),
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        health: 6,
    }),
    isAvailable: ({buildings, researches, resources}) => researches?.herbalism?.level >= 1,
    territoryRequired: 1,
    sort: 10,
    category: "social"
},{
    id: "aqueduct",
    name: "Aqueduct",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 20,
    resourcesToBuild: qty => ({
        wood: 16300*Math.pow(1.5, qty),
        stone: 15000*Math.pow(1.5, qty),
        metal: 1000*Math.pow(1.5, qty),
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        health: 15,
    }),
    isAvailable: ({buildings, researches, resources}) => researches?.math?.level >= 2 && researches.architecture?.level >= 1,
    territoryRequired: 1,
    sort: 10,
    category: "social"
},{
    id: "theater",
    name: "Theater",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 12,
    resourcesToBuild: qty => ({
        wood: 15625*Math.pow(1.05, qty),
        stone: 17500*Math.pow(1.05, qty),
        metal: 4500*Math.pow(1.05, qty),
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        happiness: 18,
    }),
    isAvailable: ({buildings, researches, resources}) => researches?.dramma?.level >= 1,
    territoryRequired: 1,
    sort: 10,
    category: "social"
},{
    id: "expedition-outpost",
    name: "Expedition outpost",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 6,
    resourcesToBuild: qty => ({
        food: 7500*Math.pow(1.05, qty),
        wood: 10000*Math.pow(1.05, qty),
        stone: 5000*Math.pow(1.05, qty),
        metal: 5000*Math.pow(1.05, qty),
    }),
    productionPerWorker: ({buildings, researches, resources}) => ({
        expedition: 0.75,
    }),
    isAvailable: ({buildings, researches, resources}) => researches.cartography.level > 0,
    territoryRequired: 1,
    sort: 8,
    category: "war",
    tags: ["expedition"],
},{
    id: "barracks",
    name: "Barracks",
    maxQuantity: 9.e+44,
    maxWorkers: ({buildings, researches, resources}) => 30,
    resourcesToBuild: qty => ({
        food: 3500*Math.pow(1.05, qty),
        wood: 5000*Math.pow(1.05, qty),
        stone: 3000*Math.pow(1.05, qty),
        metal: 2000*Math.pow(1.05, qty),
    }),
    /*productionPerWorker: ({buildings, researches, resources}) => ({
        expedition: 0.75,
    }),*/
    isAvailable: ({buildings, researches, resources}) => researches.mining.level > 0,
    territoryRequired: 1,
    sort: 800,
    category: "war"
}]
