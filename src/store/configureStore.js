let configureStore = null;

if (process.env.NODE_ENV === 'production') {
  configureStore = require('./configureStore.prod');
} else {
  configureStore = require('./configureStore.dev');
}
export default configureStore;
