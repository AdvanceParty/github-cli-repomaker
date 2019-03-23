const prepObjectPropsForPrettyPrint = arr => {
  return arr.reduce((acc, item) => {
    return {
      ...acc,
      ...Object.entries(item).reduce((acc, entry) => {
        const name = prettyPrintPropName(entry[0]);
        return { ...acc, [name]: entry[1] };
      }, {}),
    };
  }, {});
};

const prettyPrintPropName = str => str.replace(/[\-\_]/g, ' ');

module.exports.prepObjectPropsForPrettyPrint = prepObjectPropsForPrettyPrint;
module.exports.prettyPrintPropName = prettyPrintPropName;
