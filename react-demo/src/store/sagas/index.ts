import { put, takeEvery, delay } from 'redux-saga/effects';
// import { getDataTest } from '@/services/index';

interface Action {
  type: string,
  payload?: any
}

const effects = {
  //延迟执行number监听
  *fetchIncrement({ payload }: Action){
    yield delay(2000)
    yield put({ type: 'INCREMENT' })
  }
}

export function* watcher() {
  //number监听
  yield takeEvery('fetchIncrement', effects.fetchIncrement)
}