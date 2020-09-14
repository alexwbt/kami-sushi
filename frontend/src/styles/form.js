import styled from 'styled-components';

export const Input = styled.input`
    ${props => props.noPadding ? '' : 'padding: 5px 10px;'}
    font-size: 20px;
    margin: 5px 0;

    @media (max-width: 700px) {
        font-size: 12px;
    }
`;

export const Area = styled.textarea.attrs({
    cols: 30,
    rows: 5
})`
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
    background-color: #333  ;
    padding: 10px;
    cursor: pointer;
    :hover {
        background-color: black;
    }
`;
