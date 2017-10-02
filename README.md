This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Running the project
1. You must have `node` and `npm` installed. From `create-react-app`:
"You’ll need to have Node >= 4 on your machine.
We strongly recommend to use Node >= 6 and npm >= 3 for faster installation speed and better disk usage. You can use nvm to easily switch Node versions between different projects.""
1. `npm install`
1. To start in dev mode:

`npm start`

The app should appear in your browser at `http://localhost:3000/` in development mode.

To build production mode, `npm run build`, then `npm install -g serve` (first time only) and `serve -s build`. The console should provide some output telling you where the app is running.

## Structure
`Index.js` is the entry point for the app. It initializes the redux data store and renders the Game component.

`/components` contains my react components, each in their own directory with accompanying tests and styles (where applicable).

`/actions` and `/reducers` contain files that define actions and reducers for the `react-redux` store. `/reducers` also contains `model.json`, which is not used anywhere in the code but meant to be an example of what the redux state looks like. When running the app I also have the redux logger running, so you can see the changes in state in the developer console.

`/utils` contains helper methods (factored out pieces of business logic and smaller, more typical "helpers" like `sumArray`)
## Improvements

* I would like to use a more sophisticated Redux pattern, with multiple reducers and more specific actions that mutate less of the state. For example, I'd like to handle the scoring for strikes/spares with smaller state changes vs. a method that recalculates the entire score card every turn

* Finish implementing tests. I have covered most of the small helpers, but no component tests, and not the updateScore method. I'd like to use TDD with added features, as well. It would save me some bugs down the line :)

## Process

I prioritized:

* Feature completion-- getting a successful scoring system down

* Refactoring for readability and tests

* Documentation

## Incomplete/Next Steps (also ordered by priority):

* Error handling

..* Although there is really no user input at this point, I would still like to implement some checking (ex: score should be possible considering pins)

* Responsiveness

..* I used flexbox which gives a bit of responsiveness out of the box, but I would ideally spend more time making sure things work for all screen sizes

* Added Features

..* Multiple users
..* Interactive UI where you have some influence over the bowling instead of clicking a button for random pins
..* Remove logging of state to console in production mode

* Styling

..* There is a lot to be desired from the "look and feel" of Babbowling in its current implementation

## Sources

* I'm still quite new with Redux, so I used this blog to help get me started: https://onsen.io/blog/react-state-management-redux-store/
