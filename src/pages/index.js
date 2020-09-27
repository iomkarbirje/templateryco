import React, { useState } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { RichText } from "prismic-reactjs"
import { graphql, Link, navigate } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Button from "components/_ui/Button"
import About from "components/About"
import Layout from "components/Layout"
import ProjectCard from "components/ProjectCard"
import thumbnail from "images/thumbnail.png"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const Hero = styled("div")`
  padding-top: 2.5em;
  padding-bottom: 3em;
  margin-bottom: 6em;
  max-width: 1020px;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    margin-bottom: 3em;
  }

  h1 {
    margin-bottom: 1em;

    a {
      text-decoration: none;
      transition: all 100ms ease-in-out;

      &:nth-of-type(1) {
        color: ${colors.blue500};
      }
      &:nth-of-type(2) {
        color: ${colors.orange500};
      }
      &:nth-of-type(3) {
        color: ${colors.purple500};
      }
      &:nth-of-type(4) {
        color: ${colors.green500};
      }
      &:nth-of-type(5) {
        color: ${colors.teal500};
      }

      &:hover {
        cursor: pointer;
        transition: all 100ms ease-in-out;

        &:nth-of-type(1) {
          color: ${colors.blue600};
          background-color: ${colors.blue200};
        }
        &:nth-of-type(2) {
          color: ${colors.orange600};
          background-color: ${colors.orange200};
        }
        &:nth-of-type(3) {
          color: ${colors.purple600};
          background-color: ${colors.purple200};
        }
        &:nth-of-type(4) {
          color: ${colors.green600};
          background-color: ${colors.green200};
        }
        &:nth-of-type(5) {
          color: ${colors.teal600};
          background-color: ${colors.teal200};
        }
      }
    }
  }
`

export const Section = styled("div")`
  margin-bottom: 10em;
  display: flex;
  flex-direction: column;

  ${props =>
    props.grid &&
    `
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0em 2em;  
  `}

  @media (max-width: ${dimensions.maxwidthDesktop}px) {
    display: block;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const WorkAction = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;
  margin-left: auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin: 0 auto;
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  &:hover {
    color: ${colors.blue500};
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
    }
  }
`

const EmptyCard = styled("div")``

const MoreFakeCard = styled("div")`
  float: right;

  a {
    float: right;
  }
`

const EmailForm = styled("form")`
  margin-bottom: 30px;

  h3 {
    margin: 0 0 20px 0;

    span {
      font-weight: 500;
      font-size: 1em;
    }
  }

  button {
    margin-left: 20px;
  }

  @media (max-width: 480px) {
    input {
      display: block;
      width: 100%;
    }

    button {
      margin: 10px 0 0 0;
    }
  }
`

const EmailInput = styled("input")`
  border: 1px solid ${colors.grey300};
  background-color: white;
  padding 18px;
  width: 250px;
  font-size: 0.9em;

  &:hover {
    background-color: ${colors.grey100};
  }
`

const CenteredContainer = styled("div")`
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    display: block;
  }
`

const RenderBody = ({ home, projects, meta, handleSubmit, setEmail }) => (
  <>
    <Helmet
      title={meta.title}
      titleTemplate={`%s | ${meta.title}`}
      meta={[
        {
          name: `description`,
          content: meta.description,
        },
        {
          property: `og:title`,
          content: meta.title,
        },
        {
          property: `og:description`,
          content: meta.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: thumbnail,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: meta.author,
        },
        {
          name: `twitter:title`,
          content: meta.title,
        },
        {
          name: `twitter:description`,
          content: meta.description,
        },
      ].concat(meta)}
    />
    <Hero>
      <>{RichText.render(home.hero_title)}</>
      <a href={"/templates"}>
        <Button>{RichText.render(home.hero_button_text)}</Button>
      </a>
    </Hero>
    <Section grid>
      {projects.map((project, i) => (
        <ProjectCard
          key={i}
          category={project.node.project_category}
          title={project.node.project_title}
          description={project.node.project_preview_description}
          thumbnail={project.node.project_preview_thumbnail}
          uid={project.node._meta.uid}
        />
      ))}
      <EmptyCard></EmptyCard>
      <MoreFakeCard>
        <WorkAction to={"/templates"}>
          More templates <span>&#8594;</span>
        </WorkAction>
      </MoreFakeCard>
    </Section>
    <Section>
      <EmailForm
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <h3>
          Subscribe to updates <span>(e.g. new templates)</span>
        </h3>
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>
        <CenteredContainer>
          <EmailInput
            type="email"
            name="email"
            placeholder="Your email"
            onChange={e => setEmail(e.target.value)}
          />
          <Button className="Button--secondary" type="submit">
            Subscribe <span role="img">👋</span>
          </Button>
        </CenteredContainer>
      </EmailForm>
      {RichText.render(home.about_title)}
      <About bio={home.about_bio} socialLinks={home.about_links} />
    </Section>
  </>
)

const projectShowcaseUrls = [
  "grady",
  "poche",
  "bundle-pupa-shapito-valerie",
  "una",
]

export default ({ data }) => {
  //Required check for no data being returned
  const doc = data.prismic.allHomepages.edges.slice(0, 1).pop()
  // Something died inside of me when I did this
  const projects = data.prismic.allProjects.edges.filter(project =>
    projectShowcaseUrls.includes(project.node._meta.uid)
  )
  const meta = data.site.siteMetadata
  const [email, setEmail] = useState("")

  if (!doc || !projects) return null

  const handleSubmit = e => {
    if (!email) {
      return
    }
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        email: email,
      }),
    })
      .then(() => navigate("/thanks/"))
      .catch(error => alert(error))
  }

  return (
    <Layout>
      <RenderBody
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        home={doc.node}
        projects={projects}
        meta={meta}
      />
    </Layout>
  )
}

RenderBody.propTypes = {
  home: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
  {
    prismic {
      allHomepages {
        edges {
          node {
            hero_title
            hero_button_text
            hero_button_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            content
            about_title
            about_bio
            about_links {
              about_link
            }
          }
        }
      }
      allProjects {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            _meta {
              uid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
