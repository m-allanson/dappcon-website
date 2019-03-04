import React from 'react'
import styled from 'styled-components'
import { colors } from 'theme'
import Button from 'components/Button'
import ContentWrapper from 'components/ContentWrapper'
import BerlinLandscapeSvg from 'img/berlin_cityscape.svg'

const Wrapper = styled.section`
  height: 100vh;
  position: relative;
  background-color: ${colors.reddishPink};
`

const StyledContentWrapper = styled(ContentWrapper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MainHeading = styled.h1`
  font-size: 49px;
  color: ${colors.white};
  line-height: normal;
  font-weight: 800;
  max-width: 505px;

  @media screen and (max-width: 767px) {
    font-size: 30px;
    max-width: 279px;
  }
`

const BerlinImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 220%;

  @media screen and (max-width: 767px) {
    display: none;
  }
`

const ButtonDateContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`

const StyledDate = styled.span`
  margin-left: 25px;
  color: ${colors.white};
  font-size: 20px;
  font-weight: 800;
  line-height: normal;

  @media screen and (max-width: 767px) {
    margin: 31px 0;
    order: -1;
  }
`

const StyledButton = styled(Button)`
  @media screen and (max-width: 767px) {
    font-size: 12px;
    padding: 14px;
  }
`

const MainSection = ({ mainTitle, buttonText, buyTicketsLink }) => (
  <Wrapper id="main">
    <StyledContentWrapper>
      <MainHeading>{mainTitle}</MainHeading>
      <ButtonDateContainer>
        <a href={buyTicketsLink} target="_blank" rel="noopener noreferrer" style={{ zIndex: 2 }}>
          <StyledButton text={buttonText} />
        </a>
        <StyledDate>
          21. - 23. August 2019
          <br />
          in Berlin, Kreuzberg
        </StyledDate>
      </ButtonDateContainer>
    </StyledContentWrapper>
    <BerlinImg src={BerlinLandscapeSvg} alt="cityscape" />
  </Wrapper>
)

export default MainSection
