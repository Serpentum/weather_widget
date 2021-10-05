import {createSlice} from "@reduxjs/toolkit"

const name = 'weatherWidget'
const initialState = {
  currentCity: '',
  geocodeStatus: '',
  geocodeError: null,

  getForecastStatus: '',
  getForecastErrorMessage: null,
  forecast: {},

  getWeatherStatus: '',
  getWeatherErrorMessage: null,
  weather: {},
}

const weatherWidgetReducer = createSlice({
  name,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.currentCity = action.payload
    },
    // API processing
    getGeocode: state => {
      state.geocodeStatus = 'pending'
    },
    getGeocodeError: (state, action) => {
      state.geocodeStatus = 'rejected'
      state.geocodeError = action.payload
    },
    getWeather: state => {
      state.getWeatherStatus = 'pending'
    },
    setWeather: (state, action) => {
      if (action.payload.status === 'resolved') {
        state.weather = action.payload.data
        state.getWeatherStatus = action.payload.status
      } else {
        state.weather = initialState.weather
        state.getWeatherStatus = action.payload.status
        state.getWeatherErrorMessage = action.payload.err
      }
    },
    getForecast: state => {
      state.getForecastData = initialState.getForecastData
      state.getForecastStatus = 'pending'
    },
    setForecast: (state, action) => {
      if (action.payload.status === 'resolved') {
        state.forecast = action.payload.data
        state.getForecastStatus = action.payload.status
      } else {
        state.forecast = initialState.forecast
        state.getForecastStatus = action.payload.status
        state.getForecastErrorMessage = action.payload.err
      }
    },
  },
})

export const {
  setCity,
  getGeocode,
  getGeocodeError,
  getWeather,
  setWeather,
  getForecast,
  setForecast,
} = weatherWidgetReducer.actions
export default weatherWidgetReducer.reducer
