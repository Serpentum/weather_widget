import {put} from 'redux-saga/effects'
import {setForecast} from "../redux/weatherWidgetReducer"

export function* fetchForecast(action) {
  const city = action.payload || 'Togliatti'
  const url = `https://api.weatherapi.com/v1/forecast.json?key=6736408151a5483aaca145316210410&q=${city}&days=7`

  try {
    const req = yield fetch(url)
    //we can handle here any status code, it's just for example
    if(req.status !== 200) { throw new Error('Something go wrong...') }

    const res = yield req.json()

    yield put(setForecast({data: res, status: 'resolved'}))
  } catch (e) {
    yield put(setForecast({err: e.message, status: 'rejected'}))
  }

}
