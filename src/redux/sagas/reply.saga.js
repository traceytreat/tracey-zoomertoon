import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* addReply(action){
    try {
        yield axios.post('/api/reply', action.payload);
        console.log('Add reply', action.payload);
        yield put({type: 'FETCH_REPLIES', payload: action.payload})

    } catch (error) {
        console.log('Replies post request failed', error);
    }
}

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
    yield takeLatest('ADD_REPLY', addReply);

}
export default replySaga;