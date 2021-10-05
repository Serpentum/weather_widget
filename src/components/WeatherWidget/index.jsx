import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import styled from "styled-components";
import {getForecast, getGeocode, getWeather, setCity} from "../../redux/weatherWidgetReducer"
import WeatherWidgetHeader from "./WeatherWidgetHeader"
import WeatherWidgetContent from "./WeatherWidgetContent"
import ForecastList from "./ForecastList"

const defaultCity = 'Togliatti'

export const getIconPath = id => `http://openweathermap.org/img/wn/${id}.png`

const WeatherWidget = () => {

  const dispatch = useDispatch()
  const currentCity = useSelector(store => store.weatherWidget.currentCity)

  const geoSuccess = location => {
    const {coords} = location
    const {latitude, longitude} = coords
    dispatch(getGeocode({latitude, longitude}))
  }

  const geoError = () => {
    dispatch(setCity(defaultCity))
  }

  // try get user position, if not, set default city
  useEffect(() => {
    if(!currentCity) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
    }
  }, []);

  useEffect(() => {
    if(currentCity) {
      dispatch(getWeather(currentCity.en))
      dispatch(getForecast(currentCity.en))
    }
  }, [currentCity])


  return (
    <WidgetWrapper>
      <WeatherWidgetHeader />
      {/*component composition demonstrating below*/}
      <WeatherWidgetContent>
        <ForecastList />
      </WeatherWidgetContent>
    </WidgetWrapper>
  );
};

export default WeatherWidget;

const WidgetWrapper = styled.div`
  width: 800px;
  border-radius: 16px;
  overflow: hidden;
`
