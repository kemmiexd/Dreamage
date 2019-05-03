import { combineReducers } from 'redux';

import pictures from './pictures';
import itemEditing from './itemEditing';

const appReducers = combineReducers({
  pictures,
  itemEditing
});

export default appReducers;