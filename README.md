Firebase 3.0 Starter using React Redux
=====================

This is a Firebase 3.0 start using React and Redux.

It uses the latest version of libraries, including the brand new React Hot Loader ([still beta](https://github.com/gaearon/react-hot-loader/pull/240))

## Stack

- React
  - [X] React `15.1.0`
  - [X] React Hot Loader `3.0.0-beta.2`
  - [X] React Router `2.4.1`
- Redux
  - [X] Redux `3.5.2`
  - [X] React Redux `4.4.5`
  - [X] React Router Redux `4.0.4`
  - [X] Redux Thunk `2.1.0`
  - [X] Redux Dev Tools
- Webpack    
  - [X] Webpack `1.13.1`
  - [X] Webpack Dev Middleware `1.6.1`
  - [X] Webpack Hot Middleware `2.10.0`
- Firebase
  - [X] Firebase `3.0.3`
- Linting
  - [X] Eslint `2.11.1`
- Styles
  - [X] Bootstrap `3.3.6`
- Testing
  - [X] Mocha `2.5.3`
  - [X] Enzyme `2.3.0`


## Features

- Firebase:
  - Auth
    - [X] Authentication setup (Registration/Login) 
    - [X] state.user sync with Firebase Auth
    - [X] Protected routes (needs to be logged in)    
    - [X] Store users on `'/users/<user.uid>'`
    - [X] Admin flag on user (`'/isAdmin/<user.uid>' :: bool`)
    - [X] Admin Protected routes (needs to be logged in)
  - Database
    - [X] Set example
    - [X] Query example 

## Usage

```
git clone git@github.com:douglascorrea/react-hot-redux-firebase-starter.git
cd react-hot-redux-firebase-starter
npm install
npm start -s
```

## Development Tasks

- `npm start` run the web app with lint and tests in watch mode
- `npm run lint` linting javascript code usig eslint
- `npm run test` test using mocha and enzyme

## Roadmap

Check our [roadmap issues](https://github.com/douglascorrea/react-hot-redux-firebase-starter/issues?q=is%3Aissue+is%3Aopen+label%3Aroadmap)
