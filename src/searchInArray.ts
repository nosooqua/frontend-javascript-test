export const searchInArray = (array: any[], value: string) => {
    const found: any[] = [];

    // Helper to search obj for value
    const findInObj = (obj: any, value: any): any => {
        return Object.values(obj).some(
            v =>
                // If v is an object, call recursively
                typeof v == 'object' ? findInObj(v, value) :
                    // If string, check if value is part of v
                    typeof v == 'string'? v.indexOf(value) >= 0 :
                        // Check numbers, make NaN == NaN
                        typeof v == 'number'? v === value || isNaN(v) && isNaN(value):
                            // Otherwise look for strict equality: null, undefined, function, boolean
                            v === value
        );
    };

    array.forEach(function(obj) {
        if (findInObj(obj, value)) found.push(obj);
    })
    return found;
}