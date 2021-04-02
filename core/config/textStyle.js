import styled from 'styled-components'

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: black;
`

export const SubTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
`

export const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
`

export const SubHeader = styled.div`
  font-size: 16px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  color: black;
`

export const RegularText = styled.div`
  font-size: 14px;
  color: black;
`

export const NormalText = styled.div`
  font-size: 12px;
  color: black;
`

export const SmallText = styled.div`
  font-size: 10px;
  color: black;
`

export const TinyText = styled.div`
  font-size: 9px;
  color: black;
`

