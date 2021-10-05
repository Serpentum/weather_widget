import React, {useState} from "react";
import styled from "styled-components";


const Select = ({label, optArr = [], handler = () => {}}) => {

  const [showSelect, setShowSelect] = useState(false)

  return (
    <Wrapper>
      <p onClick={() => setShowSelect(prevState => !prevState)}>{label}</p>
      {
        showSelect && (
          <SelectBlock>
            {
              optArr.length > 0 && optArr.map((el, id) => <p onClick={() => {
                setShowSelect(false)
                handler(id)
              }}>{el}</p>)
            }
          </SelectBlock>
        )
      }
    </Wrapper>
  )
}

export default Select;

const Wrapper = styled.div`
  position: relative;
  
  >p:hover{
    text-decoration: underline;
    cursor: pointer;
  }
`

const SelectBlock = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 100%;
  background: #fff;
  color: #000;
  border-radius: 8px;
  overflow: hidden;

  > p {
    padding: 5px;
    cursor: pointer;
  }

  > p:hover {
    background: #6cbff5;
  }
`
