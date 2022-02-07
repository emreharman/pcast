import {createStore, combineReducers} from 'redux';
import {loginReducer} from './reducers/loginReducer';

const rootReducer = combineReducers({
  loginState: loginReducer,
});

const store = createStore(rootReducer);

export default store;
