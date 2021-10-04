import React, {useEffect} from 'react';
import {useDispatch} from "react-redux"
import {getForecast} from "../../redux/weatherWidgetReducer"

const WeatherWidget = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getForecast())
  }, []);


  return (
    <div>

    </div>
  );
};

export default WeatherWidget;
