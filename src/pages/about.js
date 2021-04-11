import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO
        title="About"
        keywords={[
          `blog`,
          `personal website`,
          `mingu`,
          `mingu kwon`,
          "robotics engineer",
          "roboticist",
        ]}
      />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2 id="travelling-around-the-world-and-building-autonomous-things">
            Travelling around the world and building autonomous things.
          </h2>
          <figure className="kg-card kg-image-card kg-width-full">
            <Img fluid={data.contentfulAsset.fluid} className="kg-image" />
            <figcaption>With Biscuit &#128054; in Girona, Spain</figcaption>
          </figure>
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    contentfulAsset(title: { eq: "profile_2" }) {
      title
      fluid(quality: 90) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
