export default {
  // group an array by key and returns an object containing percentage for each group
  // ex: groupByKey([{color: 'blue'}, {color: 'green'}, {color: 'blue'}, {color: 'blue'}], 'color')  =>  {blue: 0.75, green: 0.25}
  groupByKey(array, key) {
    const totalLength = array.length;
    const occurrences = array.reduce((acc, obj) => {
      const value = obj[key];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    const percentages = Object.fromEntries(
      Object.entries(occurrences).map(([group, count]) => [group, count / totalLength])
    );

    return percentages;
  },
  // get the value of an object at a given dotted path
  // ex: getValueAtPath({my: {dotted: {path: 123}}}, 'my.dotted.path')  =>  123
  getValueAtPath(obj, path, defaultValue = 'none') {
    const value = path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
    return value !== undefined ? value : defaultValue;
  },
};
