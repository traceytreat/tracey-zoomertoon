import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPoints(action) {
    try{
        //console.log('in fetchpoints points saga')
        const response = yield axios.get('/api/points/' + action.payload.user_id);
        yield put({ type: 'SET_POINTS', payload: response.data });
    } catch (error) {
        console.log('Points get request failed', error);
    }
}

function* pointsSaga() {
    yield takeLatest('FETCH_POINTS', fetchPoints);

}
export default pointsSaga;