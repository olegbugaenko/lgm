export default class ResourceHelper {

    static mergeValues = (...vals) => {
        const initial = {};
        for(let val of vals) {
            for(let key in val) {
                if(!initial[key]) {
                    initial[key] = 0;
                }
                initial[key] += val[key];
            }
        }
        return initial;
    }

    static multiply = (val, multiplier) => {
        for(let key in val) {
            val[key] = val[key] * multiplier;
        }
        return val;
    }

    static mapEnought = (initial, delta, meta) => {
        const result = {
            resources: {},
            isAvailable: true,
        };
        for(let key in delta) {
            result.resources[key] = {
                title: meta ? meta[key].name : '',
                required: delta[key],
                isEnough: delta[key] <= 0 || (initial[key] && initial[key] >= delta[key])
            }
            if(!result.resources[key].isEnough) {
                result.isAvailable = false;
            }
        }
        return result;
    }

}
