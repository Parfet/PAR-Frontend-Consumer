import styled from 'styled-components'

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${ props => props.white ? 'white' : 'black'};
  text-overflow: ${ props => props.isCut ? 'ellipsis' : ''};;

  /* Required for text-overflow to do anything */
  white-space: ${ props => props.isCut ? 'nowrap' : ''};
  overflow: ${props => props.isCut ? 'hidden' : ''};
`

export const SubTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${ props => props.white ? 'white' : 'black'};
  text-overflow: ${ props => props.isCut ? 'ellipsis' : ''};

  /* Required for text-overflow to do anything */
  white-space: ${ props => props.isCut ? 'nowrap' : ''};
  overflow: ${ props => props.isCut ? 'hidden' : ''};
`

export const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${ props => props.white ? 'white' : 'black'};
  text-overflow: ${ props => props.isCut ? 'ellipsis' : ''};

  /* Required for text-overflow to do anything */
  white-space: ${ props => props.isCut ? 'nowrap' : ''};
  overflow: ${ props => props.isCut ? 'hidden' : ''};
`

export const SubHeader = styled.span`
  font-size: 16px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  color: ${ props => props.white ? 'white' : 'black'};
  text-overflow: ${ props => props.isCut ? 'ellipsis' : ''};

  /* Required for text-overflow to do anything */
  white-space: ${ props => props.isCut ? 'nowrap' : ''};
  overflow: ${ props => props.isCut ? 'hidden' : ''};
`

export const RegularText = styled.span`
  font-size: 14px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  color: ${ props => props.white ? 'white' : 'black'};
  text-overflow: ${ props => props.isCut ? 'ellipsis' : ''};

  /* Required for text-overflow to do anything */
  white-space: ${ props => props.isCut ? 'nowrap' : ''};
  overflow: ${ props => props.isCut ? 'hidden' : ''};
`

export const NormalText = styled.span`
  font-size: 12px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  color: ${ props => props.white ? 'white' : 'black'};
  text-overflow: ${ props => props.isCut ? 'ellipsis' : ''};

  /* Required for text-overflow to do anything */
  white-space: ${ props => props.isCut ? 'nowrap' : ''};
  overflow: ${ props => props.isCut ? 'hidden' : ''};
`

export const SmallText = styled.span`
  font-size: 10px;
  color: ${ props => props.white ? 'white' : 'black'};
  text-overflow: ${ props => props.isCut ? 'ellipsis' : ''};

  /* Required for text-overflow to do anything */
  white-space: ${ props => props.isCut ? 'nowrap' : ''};
  overflow: ${ props => props.isCut ? 'hidden' : ''};
`

export const TinyText = styled.span`
  font-size: 9px;
  color: ${ props => props.white ? 'white' : 'black'};
  text-overflow: ${ props => props.isCut ? 'ellipsis' : ''};

  /* Required for text-overflow to do anything */
  white-space: ${ props => props.isCut ? 'nowrap' : ''};
  overflow: ${ props => props.isCut ? 'hidden' : ''};
`

