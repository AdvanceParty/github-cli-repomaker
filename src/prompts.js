const inquirer = require('inquirer');
const Configstore = require('configstore');

const messages = require('./messages');
const { isNotEmpty, isValidRepoName } = require('./validation');
const { namespace, configStoreKeys } = require('./config').constants;
const { prepObjectPropsForPrettyPrint } = require('./utils');

const configStore = new Configstore(namespace);

const promptData = {
  repo: [
    {
      name: 'name',
      type: 'input',
      message: `What is the name of your new repo?\n(Alphanumeric only)`,
      validate: function(value) {
        return isValidRepoName(value) ? true : messages.repoNameNotValid;
      },
    },
    {
      name: 'description',
      type: 'input',
      message: 'A brief description of your project:',
    },
    {
      name: 'private',
      type: 'confirm',
      message: 'Make repository private?',
      default: true,
    },
    {
      name: 'auto_init',
      type: 'confirm',
      message: 'Create an initial commit with empty README file?',
      default: true,
    },
    {
      name: 'gitignore_template',
      type: 'list',
      message: 'Add a .gitignore template?',
      choices: ['Nope', new inquirer.Separator(), 'Node', 'Python', 'R', 'Sass', 'Unity'],
      filter: function(value) {
        return value == 'Nope' ? '' : value;
      },
    },
  ],
  auth: [
    {
      name: 'access_token',
      type: 'input',
      message: 'Enter your GitHub access token',
      validate: function(value) {
        return isNotEmpty(value) ? true : messages.inputRequired;
      },
      default: configStore.has(configStoreKeys.accessToken)
        ? configStore.get(configStoreKeys.accessToken)
        : null,
    },
    {
      name: 'save_token',
      type: 'confirm',
      message:
        'Save access token (not recommended for public/shared machines)\n  • This will save your access token on your local machine.\n  • The token will be saved in clear text in a config folder\n  • The token will not be stored remotely\n  • See the Configstore npm package for more info https://www.npmjs.com/package/configstore.\n Save token to your local machine?',
      default: true,
    },
  ],
  collaborator: [
    {
      name: 'userName',
      type: 'input',
      message: 'Add a collaborator to the repo? Enter a GitHub username or leave blank for none.',
    },
  ],
  confirm: [
    {
      name: 'CONTINUE',
      type: 'confirm',
      message: `Ready to do this?`,
    },
  ],
};

module.exports.getRepoConfig = () => {
  return inquirer.prompt(promptData.repo);
};

module.exports.getAuth = () => {
  return inquirer.prompt(promptData.auth);
};

module.exports.getCollaboratorName = () => {
  return inquirer.prompt(promptData.collaborator);
};

module.exports.getConfirmation = function() {
  console.log(messages.recapHeadline);
  console.table(prepObjectPropsForPrettyPrint(Array.from(arguments)));
  return inquirer.prompt(promptData.confirm);
};
