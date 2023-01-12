import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAwards() {
    try{
        const response = yield axios.get('/api/awards/');
        yield put({ type: 'SET_AWARDS', payload: response.data });
    } catch (error) {
        console.log('Awards get request failed', error);
    }
}

function* fetchUserAwards(action) {
    try{
        const response = yield axios.get('/api/awards/' + action.payload.user_id);
        yield put({ type: 'SET_USER_AWARDS', payload: response.data });
    } catch (error) {
        console.log('User Awards get request failed', error);
    }
}

function* addAward(action) {
    try {
        yield axios.post('/api/awards/' + action.payload.user_id, action.payload);
        yield put({ type: 'FETCH_USER_AWARDS', payload: action.payload.user_id });
    } catch (error) {
        console.log('Awards post request failed', error);
    }

}

function* awardsSaga() {
    yield takeLatest('FETCH_AWARDS', fetchAwards);
    yield takeLatest('FETCH_USER_AWARDS', fetchUserAwards);
    yield takeLatest('ADD_AWARD', addAward);

}
export default awardsSaga;