ChatX
=====================

This is a little chat example using [react](https://reactjs.org), [redux](https://redux.js.org), [firebase](https://firebase.google.com/) and [redux-saga](https://redux-saga.js.org)

## Demo

You can see a demo here : https://guillaumearm.github.io/demo-chatx

![image](https://user-images.githubusercontent.com/16897658/39813197-c315825a-538f-11e8-827f-e7529a417997.png)


## Major features
- create a room
- remove a room (if user is the author of this room)
- select a room
- join/leave a room
- can read last 10 messages of the room when entering
- can read new messages
- can write and send new messages

## Minor features
- select first room when entering in chat
- join and select a room at the creation
- focus the message prompt when typing
- auto scroll to the bottom of messages when receive a new message
- scrollable rooms list, messages list and users list
- author of a room has a `glyphicon-king` icon
- normal user has a `glyphicon-user` icon


## How to get started

#### Download
```bash
$ git clone https://github.com/guillaumearm/demo-chatx.git
$ cd demo-chatx
```

#### Installation
```bash
$ npm install
# or
$ yarn install
```

#### Use with your own firebase database (optional)
1. Please change `src/config.js` according to your database configuration
2. You should find a `firebase-rules.json` file in this project,
Please add this rules in your firebase console (https://console.firebase.google.com).

#### Tests
```bash
$ npm run lint && npm run test
```


#### Development
This will automatically launch app in development
```bash
$ npm run start
```

### Build for production
This will build assets in `dist/` folder
```bash
$ npm run build
```
