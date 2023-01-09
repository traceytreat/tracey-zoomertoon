import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserDetails(action) {
    try{
        console.log('in fetchuserdetails userdetails saga')
        const response = yield axios.get('/api/userdetails/' + action.payload.user_id);
        yield put({ type: 'SET_USER_DETAILS', payload: response.data });
    } catch (error) {
        console.log('User Details get request failed', error);
    }
}
function* userDetailsSaga() {
    yield takeLatest('FETCH_USER_DETAILS', fetchUserDetails);

}
export default userDetailsSaga;