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
        yield put({type: 'FETCH_LOVES', payload: action.payload})

    } catch (error) {
        console.log('Loves post request failed', error);
    }
}

function* removeLove(action) {
    try {
        yield axios.delete(`/api/loves/${action.payload.user_id}/${action.payload.posts_id}`);
        console.log('Remove love', action.payload);
        yield put({type: 'FETCH_LOVES', payload: action.payload})

    } catch (error) {
        console.log('Loves delete request failed', error);
    }
}

function* lovesSaga() {
    yield takeLatest('FETCH_LOVES', fetchLoves);
    yield takeLatest('ADD_LOVE', addLove);
    yield takeLatest('REMOVE_LOVE', removeLove);

}
export default lovesSaga;