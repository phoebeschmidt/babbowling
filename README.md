This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Running the project
1. You must have `node` and `npm` installed. From `create-react-app`:
"You’ll need to have Node >= 4 on your machine.
We strongly recommend to use Node >= 6 and npm >= 3 for faster installation speed and better disk usage. You can use nvm to easily switch Node versions between different projects.""
1. `npm install`

-To start in dev mode: `npm start`
The app should appear in your browser at `http://localhost:3000/` in development mode.

-To build 'production mode': `npm run build`

then: `npm install -g serve` and `serve -s build`
The console should provide some output telling you where the app is running.

## Structure
`Index.js` is the entry point for the app. It defines the routes and initializes the redux data store

<!-- `/utils` contains files with helper methods reused in many files. -->

`/components` contains my react components, each in their own directory.
<!-- A few components that need additional data, (`Catalog` and `ArticleDetail`) also have container components in their directory. In these cases, the container component fetches data and passes it to the presentation component. -->

`/actions` and `/reducers` contain files that define actions and reducers for the `react-redux` store
