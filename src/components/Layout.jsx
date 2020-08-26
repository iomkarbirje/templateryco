import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { Global } from "@emotion/core"
import globalStyles from "styles/global"
import colors from "styles/colors"
import typeStyles from "styles/typography"
import dimensions from "styles/dimensions"
import Footer from "components/Footer"
import Header from "components/Header"
import "styles/fonts.scss"

const LayoutContainer = styled.div`
  max-width: 1300px;
  padding-left: ${dimensions.paddingHorizontalDesktop}em;
  padding-right: ${dimensions.paddingHorizontalDesktop}em;
  margin: 0 auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    padding-left: ${dimensions.paddingHorizontalTablet}em;
    padding-right: ${dimensions.paddingHorizontalTablet}em;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    padding-left: ${dimensions.paddingHorizontalMobile}em;
    padding-right: ${dimensions.paddingHorizontalMobile}em;
  }

  .Layout__content {
    padding-bottom: 5em;
  }
`

const Announcement = styled.div`
  padding: 10px 20px;
  text-align: center;
  font-weight: 500;
  margin: 15px;
  font-size: 14px;
  border-radius: 5px;
  text-decoration: none;
  border: 1px solid #fff1bd;
  background-color: #fff8dc;
  color: ${colors.grey900};

  a {
    color: ${colors.blue500};
    margin-left: 5px;

    &:hover {
      color: ${colors.blue700};
    }
  }
`

const Layout = ({ children }) => (
  <>
    <Announcement>
      Templatery is #1 Product of the Day on Product Hunt. Thank you for the
      support!
      <a
        href="https://www.producthunt.com/posts/templatery"
        target="_blank"
        rel="noopener noreferrer"
      >
        View launch post ->
      </a>
    </Announcement>
    <LayoutContainer className="div">
      <Global styles={[globalStyles, typeStyles]} />
      <div className="Layout">
        <Header />
        <main className="Layout__content">{children}</main>
        <Footer />
      </div>
    </LayoutContainer>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
