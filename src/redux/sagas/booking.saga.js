import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// receives action.payload form saveTenant in EditTenantModal and send it to booking router
function* updateTenant(action) {
    try {
        console.log(action.payload);

    } catch (err) {
        console.log('error with updateTenant saga');
    }
}

function* bookingSaga() {
    yield takeEvery('UPDATE_TENANT', updateTenant);
}

export default bookingSaga;