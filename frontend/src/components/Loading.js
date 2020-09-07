import styled from 'styled-components';

const Loading = styled.div`
    &, :after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
    }

    display: inline-block;
    font-size: 5px;
    position: relative;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid white;
    animation: loader 0.7s infinite linear;

    @keyframes loader {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

export default Loading;
