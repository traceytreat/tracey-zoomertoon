import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPosts() {
    try{
        const response = yield axios.get('/api/post')
        yield put({ type: 'SET_POSTS', payload: response.data });
    } catch (error) {
        console.log('Posts get request failed', error);
    }
}

function* postSaga() {
    yield takeLatest('FETCH_POSTS', fetchPosts);

}
export default postSaga;