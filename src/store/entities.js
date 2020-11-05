import {combineReducers} from 'redux';
import AuthReducer from './Authontication';
import ApplicationReducer from './Configuration';

export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
});
