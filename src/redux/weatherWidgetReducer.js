import {createSlice} from "@reduxjs/toolkit"

const name = 'weatherWidget'
const initialState = {
  getForecastStatus: null,
  getForecastErrorMessage: null,
  getForecastData: {},
}

const weatherWidgetReducer = createSlice({
  name,
  initialState,
  reducers: {
    getForecast: state => {
      state.getForecastData = initialState.getForecastData
      state.getForecastStatus = 'pending'
    },
    setForecast: (state, action) => {
      if (action.payload.status === 'resolved') {
        state.getForecastData = action.payload.data
        state.getForecastStatus = action.payload.status
      } else {
        state.getForecastData = initialState.getForecastData
        state.getForecastStatus = action.payload.status
        state.getForecastErrorMessage = action.payload.err
      }
    }
  },
})

export const {
  getForecast,
  setForecast,
} = weatherWidgetReducer.actions
export default weatherWidgetReducer.reducer
