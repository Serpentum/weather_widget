import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux"


const WeatherWidgetHeader = ({children}) => {

  const getForecastStatus = useSelector(store => store.weatherWidget.getForecastStatus)
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    if(getForecastStatus === 'resolved') {
      setIsLoad(true)
    } else {
      setIsLoad(false)
    }
  }, [getForecastStatus]);


  return (
    <Wrapper>
      <h3>{isLoad ? 'Прогноз на 3 дня' : 'Загружаем прогноз...'}</h3>
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
    </Wrapper>
  )
}

export default WeatherWidgetHeader;

const Wrapper = styled.div`
  padding: 36px 41px;
  background: #fff;
  height: 271px;
`
const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
