import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchStats(action) {
    try{
        //console.log('in fetchpoints points saga')
        const response = yield axios.get('/api/stats/' + action.payload.user_id);
        yield put({ type: 'SET_STATS', payload: response.data });
    } catch (error) {
        console.log('Stats get request failed', error);
    }
}

function* pointsSaga() {
    yield takeLatest('FETCH_STATS', fetchStats);

}
export default pointsSaga;