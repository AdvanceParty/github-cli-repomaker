const axios = require('axios');
const { endpoint, userAgent } = require('./config.js').api;
const { HTTP } = require('./config.js').constants;

const createRepo = async (repoSettings, auth) => {
  const path = '/user/repos';
  const data = repoSettings;
  return await makeRequest(path, data, auth, HTTP.POST);
};

const addCollaborator = async (repoFullName, collaboratorUsername, auth) => {
  const path = `/repos/${repoFullName}/collaborators/${collaboratorUsername}`;
  const data = { permission: 'push' };
  return await makeRequest(path, data, auth, HTTP.PUT);
};

module.exports.createRepo = createRepo;
module.exports.addCollaborator = addCollaborator;

// **************************************************
// ********* 'private' functions ******************//
const makeRequest = async (path, data, auth, httpMethod = HTTP.GET) => {
  const { access_token } = auth;
  const url = `${endpoint}${path}`;
  const payload = JSON.stringify(stripEmptyValues(data));
  const config = {
    method: httpMethod,
    headers: {
      'User-Agent': userAgent,
      'Content-Length': payload.length,
      authorization: `token ${access_token}`,
    },
  };

  try {
    const resp = await axios[httpMethod](url, payload, config);
    return resp.data;
  } catch (e) {
    throw Error(e);
  }
};

/**
 * Strip out any props inside an object which have
 * an empty string (length == 0) for their value.
 * Useful for the Github API, which throws an error if it
 * receives a parameter with zero length string for its value.
 */
const stripEmptyValues = rawData => {
  var cleaned = Object.entries(rawData).reduce((acc, entry) => {
    const key = entry[0],
      value = entry[1];
    const zeroLength = value.length != undefined && value.length < 1;
    return !zeroLength ? { ...acc, [key]: value } : acc;
  }, {});
  return cleaned;
};
