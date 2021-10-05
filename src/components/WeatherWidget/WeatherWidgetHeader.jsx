import React, {memo, useEffect, useState} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux"
import moment from "moment"
import 'moment/locale/ru';
import {getIconPath} from "./index"

function capitalizeFirstLetter(string) {
  if(string) return string.charAt(0).toUpperCase() + string.slice(1);
}

function identifyLetter(deg) {
  let letter = ''
  if(deg > 0) {
    letter = '+'
  }
  if(deg < 0) {
    letter = '-'
  }
  return letter
}

const WeatherWidgetHeader = ({citySelectHandler}) => {

  const currentCity = useSelector(store => store.weatherWidget.currentCity)
  const getWeatherStatus = useSelector(store => store.weatherWidget.getWeatherStatus)
  const weather = useSelector(store => store.weatherWidget.weather)

  const dateNow = capitalizeFirstLetter(moment(new Date()).format('dddd DD'))
  const weatherState = capitalizeFirstLetter(weather?.weather && weather.weather[0].description)
  const celsiusDeg = weather?.main && weather.main.temp.toFixed()
  const iconPath = weather?.weather ? getIconPath(weather.weather[0].icon) : ''
  const humidity = weather?.main ? weather.main.humidity.toFixed() : ''
  const windSpeed = weather?.wind ? weather.wind.speed.toFixed(1) : ''

  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    if(getWeatherStatus === 'resolved') {
      setIsLoad(true)
    } else {
      setIsLoad(false)
    }
  }, [getWeatherStatus]);


  return (
    <Wrapper>
      <TopPart>
        <CurrentCityName>
          {isLoad ? currentCity.ru : '...'}
        </CurrentCityName>
        <CitySelector>
          <p>Выбрать город</p>
        </CitySelector>
      </TopPart>
      <MiddlePart className='lightGrayTextModifier'>
        <DateNow>
          {isLoad ? dateNow : 'Уточняем'}
        </DateNow>
        <WeatherStatus>
          {isLoad && weatherState}
        </WeatherStatus>
      </MiddlePart>
      {
        isLoad && (
          <BottomPart>
            <CelsiusDegrees>
              <span>{ identifyLetter(celsiusDeg) }</span>
              {celsiusDeg}
            </CelsiusDegrees>
            {
              iconPath && <WeatherIcon src={iconPath} alt='weather icon'/>
            }
            <WeatherMeta className='lightGrayTextModifier'>
              <p>
                Вероятность осадков: <span>{humidity}%</span>
              </p>
              <p>
                Влажность: <span>{humidity + '%'}</span>
              </p>
              <p>
                Ветер: <span>{windSpeed + 'м/с'}</span>
              </p>
            </WeatherMeta>
          </BottomPart>
        )
      }
    </Wrapper>
  )
}

export default memo(WeatherWidgetHeader);

const Wrapper = styled.div`
  height: 280px;
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 36px 41px;
  background: linear-gradient(180deg, #15143D 0%, #3F3D7D 100%);
`

const TopPart = styled.div`
  display: flex;
  justify-content: space-between;
`
const CurrentCityName = styled.div`
  font-size: 30px;
`
const CitySelector = styled.div`

`

const MiddlePart = styled.div`
  margin-top: 10px;
`
const DateNow = styled.div`

`
const WeatherStatus = styled.div`

`

const BottomPart = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 10px;
`
const CelsiusDegrees = styled.p`
  font-size: 70px;
  line-height: 80px;
`
const WeatherIcon = styled.img`
  width: 50px;
`
const WeatherMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  
  >p>span{
    color: #fff;
  }
`
