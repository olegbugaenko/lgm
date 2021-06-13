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
    effect: ["research-sm","research-md","research-bg","research-lg","stockpile","warehouse"],
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
    description: "Opens new buildings",
    effect: ["all"],
    maxQuantity: 1,
    // production: ({value, level}) => Math.pow(1.05, level) * value,
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
}]
