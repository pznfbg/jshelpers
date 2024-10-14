const ObjectUtil = {
    isEmpty: o => Object.keys(o).length === 0,
    isEmptyObject: o => ObjectUtil.isObject(o) && ObjectUtil.isEmpty(o),
    isObject: o => o instanceof Object && o.constructor === Object,
    hasOwn: (o, k) => Object.prototype.hasOwnProperty.call(o, k),
    isEqual: (a, b) => {
        if(Object.getOwnPropertyNames(a).length !== Object.getOwnPropertyNames(b).length) return false;
        for(let key in a) {
            if(ObjectUtil.hasOwn(a, key)) {
                if(ObjectUtil.hasOwn(b, key)) {
                    if(ObjectUtil.isObject(a[key])) {
                        if(!ObjectUtil.isObjectsEqual(a[key], b[key])) {
                            return false;
                        }
                    } else {
                        if(a[key] !== b[key]) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    },
    extend: (destination, source) => {
        for(let key in source) {
            if(ObjectUtil.hasOwn(source, key)) {
                let value = source[key];
                if(ObjectUtil.isObject(value)) {
                    destination[key] = ObjectUtil.extend({}, value);
                } else {
                    destination[key] = value;
                }
            }
        }
        return destination;
    },
    objectDiff: (org, changed) => {
        if(ObjectUtil.isEqual(org, changed)) {
          return {};
        }
        let keys = Object.keys(changed);
        let result = {};
        for(let key of keys) {
            if(ObjectUtil.hasOwn(changed, key) && ObjectUtil.hasOwn(org, key)) {
                let value = changed[key];
                if(ObjectUtil.isObject(value) && !ObjectUtil.isEmpty(value)) {
                    let valueDiff = ObjectUtil.objectDiff(org[key], value);
                    if(!ObjectUtil.isEmpty(valueDiff)) {
                        result[key] = valueDiff;
                    }
                } else {
                    if(value !== org[key]) {
                        result[key] = value;
                    }
                }
            }
        }
        return result;
    }
}
