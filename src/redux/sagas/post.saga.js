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

function* fetchUserPosts(action) {
    try{
        console.log('in fetchUserPosts');
        const response = yield axios.get('/api/post/user/' + action.payload.user_id)
        yield put({type: 'SET_POSTS', payload: response.data})
    } catch (error) {
        console.log('User posts get request failed', error);
    }
}

function* fetchAdminPosts() {
    try{
        const response = yield axios.get('/api/post/admin')
        yield put({ type: 'SET_POSTS', payload: response.data });
    } catch (error) {
        console.log('Admin Posts get request failed', error);
    }
}

function* addPost(action) {
    try {
        yield axios.post('/api/post', action.payload);
        console.log('Add post', action.payload);
        yield put({type: 'FETCH_POSTS'})

    } catch (error) {
        console.log('Posts post request failed', error);
    }
}

function* deletePost(action) {
    console.log('action payload is', action.payload)
    try {
        yield axios.delete('/api/post/' + action.payload.posts_id);
        console.log('Delete post', action.payload.posts_id);
        //yield put({type: 'FETCH_POSTS'})
    } catch (error) {
        console.log('Posts delete request failed', error);
    }
}

function* deletePost_Admin(action) {
    console.log('action payload is', action.payload)
    try {
        yield axios.delete('/api/post/' + action.payload.posts_id);
        console.log('Delete post', action.payload.posts_id);
        yield put({type: 'FETCH_ADMIN_POSTS'})
    } catch (error) {
        console.log('Posts admin delete request failed', error);
    }
}

function* addFlag(action) {
    console.log('action payload is', action.payload)
    try {
        yield axios.put('/api/post/flag/' + action.payload.posts_id, action.payload);
    } catch (error) {
        console.log('Add flag put request failed', error);
    }
}

function* removeFlag(action) {
    console.log('action payload is', action.payload)
    try {
        yield axios.put('/api/post/flag/' + action.payload.posts_id, action.payload);
        yield put({
            type: 'FETCH_ADMIN_POSTS'
        })
    } catch (error) {
        console.log('Remove flag put request failed', error);
    }
}

function* fetchPostDetails(action) {
    try{
        const response = yield axios.get('/api/post/' + action.payload.posts_id);
        yield put({ type: 'SET_POSTS', payload: response.data });
    } catch (error) {
        console.log('Post details get request failed', error);
    }
}
function* postSaga() {
    yield takeLatest('FETCH_POSTS', fetchPosts);
    yield takeLatest('FETCH_USER_POSTS', fetchUserPosts);
    yield takeLatest('FETCH_ADMIN_POSTS', fetchAdminPosts);
    yield takeLatest('ADD_POST', addPost);
    yield takeLatest('DELETE_POST', deletePost);
    yield takeLatest('DELETE_POST_ADMIN', deletePost_Admin);
    yield takeLatest('ADD_FLAG', addFlag);
    yield takeLatest('REMOVE_FLAG', removeFlag);
    yield takeLatest('FETCH_POST_DETAILS', fetchPostDetails);

}
export default postSaga;