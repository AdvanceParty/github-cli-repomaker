const isMinLength = (str, minLength) => str && str.length >= minLength;
const isNotEmpty = str => isMinLength(str, 1);
const isValidRepoName = str => isMinLength(str, 5) && str.match(/[^A-Z,0-9,_,-]/gi) == null;

module.exports = {
  isMinLength: isMinLength,
  isNotEmpty: isNotEmpty,
  isValidRepoName: isValidRepoName,
};
