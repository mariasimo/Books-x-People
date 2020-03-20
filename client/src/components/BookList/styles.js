import styled from 'styled-components';
import Theme from '../../Theme'

export const StyledBookList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    align-items: flex-end;
    padding: 0;
`; 

export const StyledBookItem = styled.li`
    border: 1px solid ${({theme}) => theme.colors.black};
    background-color: ${({theme}) => theme.colors.yellow};
    color: ${({theme}) => theme.colors.black};

    height: ${props => props.bookHeight};
    width: ${props => props.bookWidth};
    margin-top: 4rem;

    font-family: ${({theme}) => theme.fonts.title};
    text-transform: uppercase;
    writing-mode: tb-rl;
    transform: rotate(-180deg);
    position: relative;

    span {
        font-size:  ${props => props.bookWidth}
    }
`;