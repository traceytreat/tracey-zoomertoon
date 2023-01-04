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

function* addPost(action) {
    try {
        yield axios.post('/api/post', action.payload);
        console.log('Add post', action.payload);
        yield put({
            type: 'FETCH_POSTS'
        })

    } catch (error) {
        console.log('Posts post request failed', error);
    }
}

function* postSaga() {
    yield takeLatest('FETCH_POSTS', fetchPosts);
    yield takeLatest('ADD_POST', addPost);

}
export default postSaga;