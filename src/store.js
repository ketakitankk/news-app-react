import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import newsReducer from './reducers/reducers';

const store = createStore(newsReducer, applyMiddleware(thunkMiddleware));

export default store;
