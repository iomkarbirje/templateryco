import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import { Section } from "./index"
import Layout from "components/Layout"
import ProjectCard from "components/ProjectCard"

const WorkTitle = styled("h1")`
  margin-bottom: 1em;
`

// const WorkSubtitle = styled("h4")`
//   margin-top: 1em;
//   margin-bottom: 2em;
//   font-weight: 400;
// `

const Work = ({ projects, meta }) => (
  <>
    <Helmet
      title={`Templatery | Figma Presentation Templates`}
      titleTemplate={`%s | Templatery | Figma Presentation Templates`}
      meta={[
        {
          name: `description`,
          content: meta.description,
        },
        {
          property: `og:title`,
          content: `Templatery | Figma Presentation Templates`,
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
    <Layout>
      <WorkTitle>Premium Templates</WorkTitle>
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
      </Section>
    </Layout>
  </>
)

export default ({ data }) => {
  const projects = data.prismic.allProjects.edges
  const meta = data.site.siteMetadata

  if (!projects) return null

  const premiumProjects = projects.filter(
    project =>
      project.node.project_category &&
      project.node.project_category[0].text === "Premium Figma Template"
  )

  if (!premiumProjects) return null

  return <Work projects={premiumProjects} meta={meta} />
}

Work.propTypes = {
  projects: PropTypes.array.isRequired,
}

export const query = graphql`
  {
    prismic {
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
