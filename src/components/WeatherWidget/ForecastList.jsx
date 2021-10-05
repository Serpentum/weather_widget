import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux"
import ForecastListItem from "./ForecastListItem"
import {nanoid} from "@reduxjs/toolkit"

const ForecastList = () => {
  const forecastList = useSelector(store => store.weatherWidget.forecast)
  return forecastList.length > 0 && (
    <ListWrapper>
      {forecastList.map(el => <ForecastListItem key={nanoid()} data={el}/>)}
    </ListWrapper>
  )
}

export default ForecastList;

const ListWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
`
