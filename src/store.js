import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import weatherWidgetReducer from "./redux/weatherWidgetReducer"
import createSagaMiddleware from 'redux-saga'
import {weatherWidgetWatcher} from "./sagas/weatherWidgetWatcher"

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    weatherWidget: weatherWidgetReducer
  },
  middleware: [...getDefaultMiddleware({thunk: false}), ...middlewares],
})

sagaMiddleware.run(weatherWidgetWatcher);

