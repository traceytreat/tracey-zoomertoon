import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchLoves(action) {
    try{
        console.log('in fetchloves loves saga', action)
        const response = yield axios.get('/api/loves/' + action.payload.user_id);
        yield put({ type: 'SET_LOVES', payload: response.data });
    } catch (error) {
        console.log('Loves get request failed', error);
    }
}

function* addLove(action) {
    try {
        yield axios.post('/api/loves/', action.payload);
        console.log('Add love', action.payload);
        yield put({type: 'FETCH_LOVES', payload: action.payload});
        yield put({type: 'FETCH_POST_DETAILS', payload: action.payload});

    } catch (error) {
        console.log('Loves post request failed', error);
    }
}

function* removeLove(action) {
    try {
        yield axios.delete(`/api/loves/${action.payload.user_id}/${action.payload.posts_id}`);
        console.log('Remove love', action.payload);
        yield put({type: 'FETCH_LOVES', payload: action.payload});
        yield put({type: 'FETCH_POST_DETAILS', payload: action.payload});

    } catch (error) {
        console.log('Loves delete request failed', error);
    }
}

// For calculating the 'loves' section of the points on main feed
function* fetchLovesAll(){
    try{
        console.log('in fetchlovesall');
        const response = yield axios.get('/api/lovesall');
        yield put({ type: 'SET_LOVES_ALL', payload: response.data });
    } catch (error) {
        console.log('Loves all get request failed', error);
    }
}

function* fetchUserAll(action){
    try{
        console.log('in fetchuserall loves saga', action)
        const response = yield axios.get('/api/loves/user/' + action.payload.user_id);
        yield put({ type: 'SET_USER_ALL', payload: response.data });
    } catch (error) {
        console.log('Loves fetch user all get request failed', error);
    }
}

function* lovesSaga() {
    yield takeLatest('FETCH_LOVES', fetchLoves);
    yield takeLatest('ADD_LOVE', addLove);
    yield takeLatest('REMOVE_LOVE', removeLove);
    yield takeLatest('FETCH_LOVES_ALL', fetchLovesAll);
    yield takeLatest('FETCH_USER_ALL', fetchUserAll);

}
export default lovesSaga;