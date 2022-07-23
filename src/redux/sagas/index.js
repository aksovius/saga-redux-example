import {takeEvery, put, call, fork,spawn} from 'redux-saga/effects'

async function swapiGet(pattern) {
    const request = await fetch(`http://swapi.dev/api/${pattern}`)
    const data = await request.json();
    return data;
}

export function* loadPeople() {
    const people = yield call(swapiGet, 'people');
    yield put({type: 'SET_PEOPLE', payload:people.results})
    console.log('load people')
}

export function* loadPlanets() {
    const planets = yield  call(swapiGet, 'planets')
    yield put({type: 'SET_PLANETS', payload: planets.results})
    console.log('load planets')
}
export function* workerSaga(){
    console.log('run parallel tasks')
    yield spawn(loadPeople)
    yield spawn(loadPlanets)
    console.log('finish parallel tasks')
}

export function* watchLoadData() {
    yield takeEvery('LOAD_DATA', workerSaga)
}

export default function*  rootSaga(){
    yield fork(watchLoadData)

}