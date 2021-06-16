export const researches = [{
    id: "fire",
    name: "Fire",
    description: "Learn your little green man's to make fire. Improves overall effectiveness by 10%",
    effect: ["all"],
    maxQuantity: 1,
    production: ({value, level}) => Math.pow(1.1, level) * value,
    resourcesToResearch: qty => ({
        science: 300*Math.pow(1.05, qty),
        wood: 1250*Math.pow(1.05, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => true,
    sort: 1,
},{
    id: "agriculture",
    name: "Agriculture",
    description: "Learn your little green man's to be more effective in farming. Each level increase farm's outcome by 2%",
    effect: ["farm"],
    maxQuantity: 10000,
    production: ({value, level}) => Math.pow(1.02, level) * value,
    resourcesToResearch: qty => ({
        science: 1500*Math.pow(2, qty),
        food: 2500*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => true,
    sort: 2,
},{
    id: "tools",
    name: "Tools",
    description: "Learn your little green man's to construct more sofisticated tools. Improves overall effiency by 5%",
    effect: ["all"],
    maxQuantity: 5,
    production: ({value, level}) => Math.pow(1.05, level) * value,
    resourcesToResearch: qty => ({
        science: 1500*Math.pow(4, qty),
        food: 2500*Math.pow(4, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.fire?.level > 0,
    sort: 3,
},{
    id: "scribing",
    name: "scribing",
    description: "A possibility to provide information to future generations improves science income by 50%!",
    effect: ["research-sm","research-md","research-bg","research-lg"],
    maxQuantity: 1,
    production: ({value, level}) => Math.pow(1.05, level) * value,
    resourcesToResearch: qty => ({
        science: 430*Math.pow(2, qty),
        // food: 2500*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.fire?.level > 0,
    sort: 4,
},{
    id: "pottery",
    name: "Pottery",
    description: "Pottery allows to store 25% more goods and handle more people",
    effect: ["all"],
    maxQuantity: 2,
    capacity: ({value, level}) => Math.pow(1.25, level) * value,
    resourcesToResearch: qty => ({
        science: 1500*Math.pow(5, qty),
        wood: 1500*Math.pow(5, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.tools?.level > 0,
    sort: 5,
},{
    id: "math",
    name: "Maths",
    description: "Better calculation abilities increase stockpile and warehouse effiency by 10% and gives 10% science bonus per level",
    effect: ["science","stockpile","warehouse"],
    maxQuantity: 10,
    production: ({value, level}) => Math.pow(1.1, level) * value,
    capacity: ({value, level}) => Math.pow(1.1, level) * value,
    resourcesToResearch: qty => ({
        science: 1500*Math.pow(4, qty),
        // food: 2500*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.scribing?.level > 0,
    sort: 6,
},{
    id: "mining",
    name: "Mining",
    description: "Allows you to build mines",
    effect: ["mine"],
    maxQuantity: 1,
    // production: ({value, level}) => Math.pow(1.05, level) * value,
    resourcesToResearch: qty => ({
        science: 1500*Math.pow(2, qty),
        food: 2500*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.tools?.level > 0,
    sort: 7,
},{
    id: "wheel",
    name: "Wheel",
    description: "Improves overall effiency by 5%. Opens new researches.",
    effect: ["all"],
    maxQuantity: 1,
    // production: ({value, level}) => Math.pow(1.05, level) * value,
    resourcesToResearch: qty => ({
        science: 500*Math.pow(2, qty),
        food: 300*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => true,
    sort: 8,
},{
    id: "logistics",
    name: "Logistic",
    description: "Opens warehouse",
    effect: ["all"],
    maxQuantity: 1,
    // production: ({value, level}) => Math.pow(1.05, level) * value,
    resourcesToResearch: qty => ({
        science: 5500*Math.pow(2, qty),
        food: 300*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.math.level > 0 && researches.wheel.level > 0,
    sort: 9,
},{
    id: "architecture",
    name: "Architecture",
    description: "Opens new buildings, and decreases cost increase per quantity, reducing building cost dramatically",
    effect: ["all"],
    maxQuantity: 1,
    //production: ({value, level}) => Math.pow(1.05, level) * value,
    resourcesToResearch: qty => ({
        science: 17500*Math.pow(2, qty),
        stone: 3000*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.math.level > 0 && researches.logistics.level > 0,
    sort: 10,
},{
    id: "metallurgy",
    name: "Metallurgy",
    description: "Improves mining effiency by 25% and allows creating weapons",
    effect: ["mine"],
    maxQuantity: 1,
    production: ({value, level}) => Math.pow(1.25, level) * value,
    resourcesToResearch: qty => ({
        science: 17500*Math.pow(2, qty),
        metal: 3000*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.math.level > 0 && researches.mining.level > 0,
    sort: 11,
},{
    id: "mysticism",
    name: "Mysticism",
    description: "Allows building monuments, increasing happiness",
    effect: ["all"],
    maxQuantity: 1,
    // production: ({value, level}) => Math.pow(1.25, level) * value,
    resourcesToResearch: qty => ({
        science: 1500*Math.pow(2, qty),
        stone: 500*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.fire.level > 0,
    sort: 12,
},{
    id: "religion",
    name: "Religion",
    description: "Allows building temples, increasing happiness",
    effect: ["all"],
    maxQuantity: 1,
    // production: ({value, level}) => Math.pow(1.25, level) * value,
    resourcesToResearch: qty => ({
        science: 17500*Math.pow(2, qty),
        metal: 3000*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.mysticism.level > 0,
    sort: 13,
},{
    id: "herbalism",
    name: "Herbalism",
    description: "Allows building herbalists hut, that would help to maintain higher health level. Each herbalysm level improves total health output from herbalists by 10%",
    effect: ["herbalistHut"],
    maxQuantity: 5,
    // production: ({value, level}) => Math.pow(1.25, level) * value,
    resourcesToResearch: qty => ({
        science: 2500*Math.pow(2, qty),
        food: 4000*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.tools.level > 0,
    sort: 13,
},{
    id: "dramma",
    name: "Dramma",
    description: "Allows building theaters, increasing happiness",
    effect: ["all"],
    maxQuantity: 1,
    // production: ({value, level}) => Math.pow(1.25, level) * value,
    resourcesToResearch: qty => ({
        science: 75000*Math.pow(2, qty),
        wood: 30000*Math.pow(2, qty),
        metal: 30000*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.religion.level > 0,
    sort: 13,
},{
    id: "enginery",
    name: "Enginery",
    description: "Allows your little green men to build more sofisticated mechanisms. Improves overall effiency by 15%",
    effect: ["all"],
    maxQuantity: 1,
    production: ({value, level}) => Math.pow(1.15, level) * value,
    resourcesToResearch: qty => ({
        science: 150000*Math.pow(2, qty),
        metal: 25000*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.tools?.level > 1 && researches.metallurgy.level > 0,
    sort: 7,
},{
    id: "cartography",
    name: "Cartography",
    description: "Unlocks expedition outpost. Increases expedition output by 25%",
    effect: ["expedition"],
    maxQuantity: 1,
    production: ({value, level}) => Math.pow(1.25, level) * value,
    resourcesToResearch: qty => ({
        science: 150000*Math.pow(2, qty),
        metal: 25000*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.math?.level > 2,
    sort: 7,
},{
    id: "lumbery",
    name: "Advanced lumbery tools",
    description: "Allows your little green men to use more sofisticated mechanisms in wood extraction. Improves overall effiency of wood-gathering buildings by 25%",
    effect: ["wood"],
    maxQuantity: 10,
    production: ({value, level}) => Math.pow(1.25, level) * value,
    resourcesToResearch: qty => ({
        science: 150000*Math.pow(2, qty),
        metal: 25000*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.tools?.level > 1 && researches.enginery.level > 0,
    sort: 7,
},{
    id: "quarry-automation",
    name: "Advanced quarring tools",
    description: "Allows your little green men to use more sofisticated mechanisms in stone extraction. Improves overall effiency of stone-gathering buildings by 25%",
    effect: ["stone"],
    maxQuantity: 10,
    production: ({value, level}) => Math.pow(1.25, level) * value,
    resourcesToResearch: qty => ({
        science: 150000*Math.pow(2, qty),
        metal: 25000*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.tools?.level > 1 && researches.enginery.level > 0,
    sort: 7,
},{
    id: "mining-automation",
    name: "Advanced mining tools",
    description: "Allows your little green men to use more sofisticated mechanisms in metal extraction. Improves overall effiency of metal-gathering buildings by 25%",
    effect: ["metal"],
    maxQuantity: 10,
    production: ({value, level}) => Math.pow(1.25, level) * value,
    resourcesToResearch: qty => ({
        science: 150000*Math.pow(2, qty),
        metal: 25000*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.tools?.level > 1 && researches.enginery.level > 0,
    sort: 7,
},{
    id: "fundamentalSciences",
    name: "Fundamental sciences",
    description: "Unlocks new researches. Unlocks university",
    effect: ["all"],
    maxQuantity: 1,
    production: ({value, level}) => Math.pow(1.25, level) * value,
    resourcesToResearch: qty => ({
        science: 450000*Math.pow(2, qty),
        stone: 125000*Math.pow(2, qty)
    }),
    isAvailable: ({buildings, researches, resources}) => researches.tools?.level > 1 && researches.enginery.level > 0,
    sort: 7,
}]
