export const isObject = (value: any): boolean => typeof value === 'object';
export const toStringObject = (value: any): string => (isObject(value) ? JSON.stringify(value) : value);
export const objectEquals = (compareFrom: any, compareTo: any) => {
  if (compareFrom === null || compareFrom === undefined || compareTo === null || compareTo === undefined) {
    return compareFrom === compareTo;
  }

  if (compareFrom.constructor !== compareTo.constructor) {
    return false;
  }

  if (compareFrom === compareTo || compareFrom.valueOf() === compareTo.valueOf()) {
    return true;
  }

  if (Array.isArray(compareFrom) && compareFrom.length !== compareTo.length) {
    return false;
  }

  if (!(compareFrom instanceof Object) || !(compareTo instanceof Object)) {
    return false;
  }

  const keysFrom = Object.keys(compareFrom);
  return (
    Object.keys(compareTo).every((keyTo) => keysFrom.indexOf(keyTo) !== -1) &&
    keysFrom.every((keyFrom) => objectEquals(compareFrom[keyFrom], compareTo[keyFrom]))
  );
};
