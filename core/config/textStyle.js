import styled from 'styled-components'

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${ props => props.white ? 'white' : 'black'};

  &:hover{
    color: ${ props => 'black'};
  }
  
  &:active{
    color: ${props => 'black' };
  }
`

export const SubTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${ props => props.white ? 'white' : 'black'};

  &:hover{
    color: ${ props => 'black'};
  }
  
  &:active{
    color: ${props => 'black' };
  }
`

export const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${ props => props.white ? 'white' : 'black'};

  &:hover{
    color: ${ props => 'black'};
  }
  
  &:active{
    color: ${props => 'black' };
  }
`

export const SubHeader = styled.span`
  font-size: 16px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  color: ${ props => props.white ? 'white' : 'black'};

  &:hover{
    color: ${ props => 'black'};
  }
  
  &:active{
    color: ${props => 'black' };
  }
`

export const RegularText = styled.span`
  font-size: 14px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  color: ${ props => props.white ? 'white' : 'black'};

  &:hover{
    color: ${ props => 'black'};
  }
  
  &:active{
    color: ${props => 'black' };
  }
`

export const NormalText = styled.span`
  font-size: 12px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  color: ${ props => props.white ? 'white' : 'black'};

  &:hover{
    color: ${ props => 'black' };
  }
  
  &:active{
    color: ${ props => 'black' };
  }
`

export const SmallText = styled.span`
  font-size: 10px;
  color: ${ props => props.white ? 'white' : 'black'};

  &:hover{
    color: ${ props => 'black'};
  }
  
  &:active{
    color: ${props => 'black' };
  }
`

export const TinyText = styled.span`
  font-size: 9px;
  color: ${ props => props.white ? 'white' : 'black'};

  &:hover{
    color: ${ props => 'black'};
  }
  
  &:active{
    color: ${props => 'black' };
  }
`

