import styled from 'styled-components'
import color from '../../styles/defaultColors'

export const HeaderStyle = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  height: 50px;
  background-color: #595a5b;
  color: ${color.transparentWhite};
  font-size: 20px;
  font-weight: 600;
  padding-top: 8px;
  position: sticky;
  z-index: 999;
`