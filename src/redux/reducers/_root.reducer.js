import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import post from './post.reducer';
import reply from './reply.reducer';
import points from './points.reducer';
import userDetails from './userdetails.reducer';
import loves from './loves.reducer';
import lovesAll from './lovesall.reducer';
import userAll from './userall.reducer';
import stats from './stats.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  post,
  reply,
  points,
  userDetails,
  loves,
  lovesAll,
  userAll,
  stats,
});

export default rootReducer;
