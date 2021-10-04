import {takeEvery} from 'redux-saga/effects'
import {getForecast} from "../redux/weatherWidgetReducer"
import {fetchForecast} from "./weatherWidgetWorkes"


export function* weatherWidgetWatcher() {
  yield takeEvery(getForecast, fetchForecast)
}
