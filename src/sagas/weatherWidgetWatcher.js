import {takeEvery} from 'redux-saga/effects'
import {getForecast, getGeocode, getWeather} from "../redux/weatherWidgetReducer"
import {fetchForecast, fetchGeocode, fetchWeather} from "./weatherWidgetWorkes"


export function* weatherWidgetWatcher() {
  yield takeEvery(getWeather, fetchWeather)
  yield takeEvery(getForecast, fetchForecast)
  yield takeEvery(getGeocode, fetchGeocode)
}
