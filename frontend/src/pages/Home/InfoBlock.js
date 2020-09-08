import React from 'react';
import styled from 'styled-components';
import Info1 from 'resource/info1.png';
import Info2 from 'resource/info2.png';
import Info3 from 'resource/info3.png';

const Container = styled.div`
    padding: 50px 0;
    text-align: center;
    background-color: ${props => props.theme.grey};
`;

const Wrapper = styled.div`
    display: inline-block;
    width: 100vw;
    max-width: 1000px;
`;

const InfoWrapper = styled.div`
    display: inline-block;
    width: 33%;

    @media (max-width: 900px) {
        width: 50%;
    }
    @media (max-width: 600px) {
        width: 100%;
    }
`;

const Info = styled.div`
    margin: 10px 0;
    display: inline-block;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
    vertical-align: middle;
`;

const Image = styled.img`
    display: block;
    width: 300px;
    height: 300px;
    object-fit: cover;
`;

const Content = styled.div`
    width: 300px;
    min-height: 200px;
    background-color: ${props => props.theme.dark};
    color: white;
`;

const Title = styled.div`
    display: inline-block;
    font-size: 25px;
    padding: 30px 23px 0 23px;
`;

const ContentText = styled.div`
    color: ${props => props.theme.red};
    font-size: 15px;
    padding: 20px;
`;

const InfoBlock = () => {
    return (
        <Container>
            <Wrapper>
                <InfoWrapper>
                    <Info>
                        <Image src={Info1} />
                        <Content>
                            <Title>Lieferservice in Mülheim und Umgebung</Title>
                            <ContentText>Wir liefern in Mülheim/Ruhr angrenzend Duisburg, Oberhausen und Essen</ContentText>
                        </Content>
                    </Info>
                </InfoWrapper>
                <InfoWrapper>
                    <Info>
                        <Content>
                            <Title>Sushi-Spezialitäten – frisch für Sie zubereitet</Title>
                            <ContentText>Besuchen Sie uns und erleben  hausgemachte Sushi und andere Speisen</ContentText>
                        </Content>
                        <Image src={Info2} />
                    </Info>
                </InfoWrapper>
                <InfoWrapper>
                    <Info>
                        <Image src={Info3} />
                        <Content>
                            <Title>Partys und Feste – bei uns kein Problem</Title>
                            <ContentText>Catering Service und koreanische, japanische Kochkurse buchbar</ContentText>
                        </Content>
                    </Info>
                </InfoWrapper>
            </Wrapper>
        </Container>
    );
};

export default InfoBlock;
