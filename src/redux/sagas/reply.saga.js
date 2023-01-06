import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchReplies(action) {
    try{
        console.log('in fetchreplies reply saga')
        const response = yield axios.get('/api/reply/' + action.payload.posts_id);
        yield put({ type: 'SET_REPLIES', payload: response.data });
    } catch (error) {
        console.log('Replies get request failed', error);
    }
}
function* replySaga() {
    yield takeLatest('FETCH_REPLIES', fetchReplies);

}
export default replySaga;