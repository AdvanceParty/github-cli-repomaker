const chalk = require('chalk');
const figlet = require('figlet');
const Configstore = require('configstore');

const { getAuth, getRepoConfig, getCollaboratorName, getConfirmation } = require('./prompts');
const messages = require('./messages');
const { createRepo, addCollaborator } = require('./api');
const { namespace, configStoreKeys } = require('./config').constants;

const configStore = new Configstore(namespace);

module.exports = async () => {
  welcome();

  const results = {};
  const repoConfig = await getRepoConfig();
  const collaborator = await getCollaboratorName();
  const auth = await getAuth();
  const confirmation = await getConfirmation(repoConfig, collaborator, auth);

  if (!confirmation.CONTINUE) {
    console.log(messages.cancelOperation);
    process.exit(0);
  }

  const saveTokenValue = auth.save_token ? auth.access_token : '';
  configStore.set(configStoreKeys.accessToken, saveTokenValue);

  try {
    console.log(`Creating new GitHub Repo.`);
    results.repo = await createRepo(repoConfig, auth);
    results.repoMessage = `Repo created >> ${results.repo.clone_url}`;
  } catch (e) {
    onAPIError(e);
  }

  if (collaborator.userName.length > 0) {
    try {
      console.log(`Adding collaborator to GitHub Repo.`);
      await addCollaborator(results.repo.full_name, collaborator.userName, auth);
      results.collabMessage = `Added collaborator ${collaborator.userName}.`;
    } catch (e) {
      results.collabMessage = `Unable to add collaborator ${collaborator.userName}.`;
      onAPIError(e, false);
    }
  }

  console.log(results.repoMessage || '');
  console.log(results.collabMessage || '');
  process.exit(0);
};

const onAPIError = (e, endProcess = true) => {
  console.log(`  > API Error: ${e.message}`);
  if (endProcess) {
    process.exit(0);
  }
};

const welcome = () => {
  console.log(
    chalk.green(
      figlet.textSync(messages.headline, {
        font: 'slant',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
    ),
  );
};
