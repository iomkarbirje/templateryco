import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import Logo from "components/_ui/Logo"
import spooch from "images/oscar-icon.png"

const FooterContainer = styled("div")`
  padding-top: 3.75em;
  padding-bottom: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    max-width: 80px;
  }
`

const FooterAuthor = styled("div")`
  font-size: 0.8em;
  color: ${colors.grey700};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  margin-top: 1.5em;

  a {
    color: ${colors.blue500};

    &:hover {
      color: ${colors.blue700};
    }
  }

  &:hover {
    .FooterSpooch {
      animation-name: rotate;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const FooterSpooch = styled("img")`
  max-width: 33px;
  margin-top: 0.25em;
`

const FooterSection = styled("span")`
  padding: 0.2em 0;
`

const Footer = () => (
  <FooterContainer>
    <Link to="/">
      <Logo />
    </Link>
    <FooterAuthor>
      <FooterSection>
        Templatery is made with ❤️ by{" "}
        <a
          href="https://www.filipstollar.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Filip Stollar
        </a>
      </FooterSection>
      <FooterSection>
        Website template{" "}
        <a
          href="https://github.com/margueriteroth/gatsby-prismic-starter-prist"
          target="_blank"
          rel="noreferrer noopener"
        >
          Prist
        </a>
      </FooterSection>
      <FooterSection>
        The dog came with the website template but I love him
      </FooterSection>
      <FooterSpooch className="FooterSpooch" src={spooch} />
    </FooterAuthor>
  </FooterContainer>
)

export default Footer
