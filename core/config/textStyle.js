import styled from 'styled-components'

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`

export const SubTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`

export const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
`

export const SubHeader = styled.div`
  font-size: 16px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`

export const RegularText = styled.div`
  font-size: 14px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`

export const NormalText = styled.div`
  font-size: 12px;
`

export const SmallText = styled.div`
  font-size: 10px;
`

export const TinyText = styled.div`
  font-size: 9px;
`

