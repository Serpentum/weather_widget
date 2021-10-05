import {put} from 'redux-saga/effects'
import {getGeocodeError, setCity, setForecast, setWeather} from "../redux/weatherWidgetReducer"

const API_KEY = '30718abb34495185d866192f4860a29c'
const LANG = 'ru'

export function* fetchGeocode(action) {
  const {latitude, longitude} = action.payload
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`

  try {
    const req = yield fetch(url)
    // const res = yield req.json()
    const res = yield req.json()
    //we can handle here any status code, it's just for example
    if(req.status !== 200) { throw new Error('Something go wrong...') }

    const city = res[0].local_names

    yield put(setCity(city))
  } catch (e) {
    yield put(getGeocodeError({err: e.message, status: 'rejected'}))
  }
}

export function* fetchWeather(action) {
  const city = action.payload
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${LANG}&appid=${API_KEY}`

  try {
    const req = yield fetch(url)
    //we can handle here any status code, it's just for example
    if(req.status !== 200) { throw new Error('Something go wrong...') }
    const res = yield req.json()

    yield put(setWeather({data: res, status: 'resolved'}))
  } catch (e) {
    yield put(setWeather({err: e.message, status: 'rejected'}))
  }
}

export function* fetchForecast(action) {
  const city = action.payload
  // возникли проблемы с первым API немогу получить прогноз хоть убейся. Так что решил тянуть со второго, там всего 3 дня максимуму
  // но что поделать. Для примела days параметр оставил на 7.
  const url = `http://api.weatherapi.com/v1/forecast.json?key=6736408151a5483aaca145316210410&q=${city}&lang=ru&days=7&aqi=no&alerts=no`

  try {
    const req = yield fetch(url)
    //we can handle here any status code, it's just for example
    if(req.status !== 200) { throw new Error('Something go wrong...') }
    const res = yield req.json()

    yield put(setForecast({data: res.forecast.forecastday, status: 'resolved'}))
  } catch (e) {
    yield put(setForecast({err: e.message, status: 'rejected'}))
  }
}
