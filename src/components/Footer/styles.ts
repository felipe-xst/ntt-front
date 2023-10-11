import styled from 'styled-components'
import color from '../../styles/defaultColors'

export const FooterStyle = styled.div`
  bottom: 0px;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: #595a5b;
  color: ${color.transparentWhite};
  height: 50px;
  padding-top: 8px;
  position: sticky;
  z-index: 999;
`