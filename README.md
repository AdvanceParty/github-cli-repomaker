# Github CLI Repomaker

This CLI tool allows you to quickly and easily create a new github repository from your command line.

## Usage

_Before you begin_
You will need a Github [personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) for whichever Github account you want your new repo to be added to.

_Installation and exectuion_
_in progress_

The tool will be updated shortly to run as an installable, standalone utility from the command line. For now, you need clone or download the project and run as a Node script.

```
$> git clone git@github.com:wearetheroyals/Github-CLI-Repomaker.git
$> cd Github-CLI-Repomaker
$> npm i
$> npm start
```

### Github Authentication

You will need to generate a personal access token for any Github account which you wish to use with this tool.

## IMPORTANT Note on security

You may optionally choose to save your access token to your local machine by accepting a 'save' prompt while the application is running.

If you choose to do this, your access token will be _in plain text_ in a config file on your computer.

You accept sole responsibility for any loss of data or security implications associated with securing tokens in this way. _Do not_ save your access token locally if you are using a public or shared computer.

Reading/Writing persistant config settings is managed with the Node [Config Store](https://www.npmjs.com/package/configstore) module.
