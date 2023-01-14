import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* editUser(action) {
  try {
    yield axios.put('/api/user', action.payload);
    yield put({ type: 'FETCH_USER'});

  } catch (error) {
    console.log('User put request failed', error);
  }
}

function* resetProfilePic(){
  try{
    yield axios.put('/api/user/profilepic');
    yield put({ type: 'FETCH_USER'});
  } catch (error) {
    console.log('User profile pic put request failed', error);
  }
}

function* uploadProfilePic(action){
  try{
    yield axios.post('/api/user/upload/profilepic', action.payload, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });
  yield put({ type: 'FETCH_USER'});
  } catch (error) {
    console.log('User profile pic upload (post) failed', error);
  }
}

function* uploadDrawingPost(action){
  try{
    yield axios.post('/api/user/upload/post', action.payload, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });
  yield put({ type: 'FETCH_POSTS'});
  } catch (error) {
    console.log('User profile pic upload (post) failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('SAVE_CHANGES', editUser);
  yield takeLatest('RESET_PROFILE_PIC', resetProfilePic);
  yield takeLatest('UPLOAD_PROFILE_PIC', uploadProfilePic);
  yield takeLatest('UPLOAD_DRAWING_POST', uploadDrawingPost);
}

export default userSaga;
