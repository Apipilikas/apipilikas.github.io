export default function jsonProperty<T = any>(key: string, filter?: (value: T) => T) {
    return function(target: any, propertyKey: string) {
        if (!target.constructor._mapping) {
            target.constructor._mapping = {};
        }

        target.constructor._mapping[propertyKey] = [key, filter];
    }
}

export function mapJsonToClass<T extends object>(ClassType: new () => T, jsonObject: any): T {
    const instance = new ClassType();
    const mapping = (ClassType as any)._mapping || {};

    Object.assign(instance, jsonObject);

    for (const [classProp, tuple] of Object.entries(mapping)) {
        const [jsonKey, filter] = tuple as [string, ((value: any) => any) | undefined];
        const value = jsonObject[jsonKey];
        
        if (value !== undefined) {
            (instance as any)[classProp] = filter ? filter(value) : value; 
        }
    }

    return instance;
}