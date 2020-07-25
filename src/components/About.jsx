import React from "react"
import Button from "components/_ui/Button"
import styled from "@emotion/styled"
import dimensions from "styles/dimensions"
import { RichText } from "prismic-reactjs"
import PropTypes from "prop-types"

const AboutContainer = styled("div")`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 3em;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    grid-template-columns: 3fr 1fr;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    grid-template-columns: 1fr;
    grid-gap: 1em;
  }
`

const AboutBio = styled("div")`
  padding-bottom: 3em;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    grid-row: 2;
  }
`

const AboutActions = styled("div")`
  padding-top: 1em;
  padding-bottom: 3em;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    padding: 0;
    grid-column: 1 / -1;
    grid-row: 1;
  }
`

const About = ({ bio, socialLinks }) => (
  <AboutContainer>
    <AboutBio>{RichText.render(bio)}</AboutBio>
    <AboutActions>
      <a
        href="mailto:hey@templatery.co"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="Button--secondary">Email us</Button>
      </a>
    </AboutActions>
  </AboutContainer>
)

export default About

About.propTypes = {
  bio: PropTypes.array.isRequired,
  socialLinks: PropTypes.array.isRequired,
}
