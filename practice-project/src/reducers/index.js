import { combineReducers } from 'redux';

import pictures from './pictures'

const appReducers = combineReducers({
  pictures,
});

export default appReducers;