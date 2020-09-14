import styled from 'styled-components';

export const Background = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
`;

export const Model = styled.div`
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.75);
    transform: translate(-50%, -50%);
    background-color: #333;
    display: inline-block;
    text-align: center;
    position: fixed;
    font-size: 20px;
    padding: 20px;
    color: white;
    left: 50%;
    top: 50%;

    @media (max-width: 700px) {
        font-size: 12px;
    }
`;

export const Title = styled.div`
    border-bottom: 1px solid grey;
    padding-bottom: 10px;
`;

export const Input = styled.input`
    ${props => props.noPadding ? '' : 'padding: 5px 10px;'}
    font-size: 20px;
    margin: 5px 0;

    @media (max-width: 700px) {
        font-size: 12px;
    }
`;

export const Label = styled.label`
    margin-top: 10px;
    text-align: left;
    display: block;
`;

export const Button = styled.div`
    ${props => props.margin ? 'margin-top: 20px;' : 'margin: 5px 0;'}
    background-color: grey;
    padding: 5px;
    cursor: pointer;
    :hover {
        background-color: black;
    }
`;

export const Error = styled.div`
    color: ${props => props.theme.red};
    margin-top: 10px;
`;

export const CloseButton = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
    height: 30px;
    opacity: 0.3;
    cursor: pointer;

    :hover {
        opacity: 1;
    }
    :before, :after {
        position: absolute;
        left: 13px;
        content: '';
        height: 30px;
        width: 2px;
        background-color: white;
    }
    :before {
        transform: rotate(45deg);
    }
    :after {
        transform: rotate(-45deg);
    }
`;