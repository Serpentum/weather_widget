import React, {memo, useEffect, useMemo, useState} from "react";
import styled from "styled-components";
import moment from "moment"
import 'moment/locale/ru';
import {identifyLetter} from "./WeatherWidgetHeader"

function isToday(date) {
  const dateNow = moment(new Date()).format('YYYY-MM-DD')
  return dateNow === date
}

const ForecastListItem = ({data}) => {
  const {date, day} = data
  const {condition, maxtemp_c, mintemp_c} = day

  console.log(data)

  const [weekDay, setWeekDay] = useState('')
  const [formatDate, setFormatDate] = useState('')

  useEffect(() => {
    if(isToday(date)) {
      setWeekDay('Сегодня')
    } else {
      setWeekDay(moment(date).format('ddd').toUpperCase())
    }
    setFormatDate(moment(date).format('D MMMM'))
  }, [date]);


  return (
    <Wrapper>
      <WeekDay>{weekDay}</WeekDay>
      <DateField className='darkGrayTextModifier'>{formatDate}</DateField>
      <Icon src={condition.icon} alt='weather icon'/>
      <Degs>
        <p>
          <span>{ identifyLetter(maxtemp_c) }</span>
          {maxtemp_c.toFixed(0)}°
        </p>
        <p className='darkGrayTextModifier'>
          <span>{ identifyLetter(mintemp_c) }</span>
          {mintemp_c.toFixed(0)}°
        </p>
      </Degs>
      <WeatherState className='darkGrayTextModifier'>
        {condition.text}
      </WeatherState>
    </Wrapper>
  )
}

export default memo(ForecastListItem);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 14.285%;
  gap: 3px;
`

const WeekDay = styled.p`

`
const DateField = styled.p`
  font-size: 12px;
`
const Icon = styled.img`
  align-self: center;
`
const Degs = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  
  >p{
    font-weight: 600;
  }
`
const WeatherState = styled.p`
  font-size: 12px;
`
