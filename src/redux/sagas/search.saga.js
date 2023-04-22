import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* search(action) {
    try {
        console.log(action.payload);
        yield axios.get('')

    }
}