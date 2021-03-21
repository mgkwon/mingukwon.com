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
        keywords={[`blog`, `personal website`, `mingu`, `mingu kwon`, 'robotics engineer', 'roboticist']} />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2 id="travelling-around-the-world-and-building-autonomous-things">
            Travelling around the world and building autonomous things.
          </h2>
          <figure className="kg-card kg-image-card kg-width-full">
            <Img
              fluid={data.contentfulAsset.fluid}
              className="kg-image"
            />
            <figcaption>With Biscuit &#128054; in Girona, Spain</figcaption>
          </figure>
          {/* <h2>About Me</h2>
          <h3 id="dynamic-styles">I am</h3>
          <p>
            a robotics engineer and I want to make our everyday lives a little more convenient with my skills, knowledge, and passion.
            My goal is to become an entrepreneur; I want to find and work with people who share the same vision to add value to the world.
            Until then, I will continue learning and exploring with fun people around me.
          </p>
          <h3 id="dynamic-styles">I lived</h3>
          <p>
            in a few different places. It's been a while now since I've moved to Barcelona. Before then, I lived in China, Canada, and Korea.
            When I was young, I didn't expect to move around different places around the world but I am certainly enjoying it.
            I love immersing myself in a new culture; it is a great way to learn new perspectives on our lives. Everything is so similar yet so different.
          </p>
          <h2>About Work</h2>
          <h3 id="dynamic-styles">My main area of expertise lies</h3>
          <p>
            in robot manipulation. This includes topics such as motion planning, control, computer vision, etc.
            Also, I have practical knowledge of system design and integration. 
            Other than the technical skills, I've developed team management and product management skills throughout the work experience.
          </p>
          <h3 id="dynamic-styles">I am interested</h3>
          <p>
            in applying robotics in different fields. So far, I've worked in a few different industries: logistics, food, manufacturing, and mobile.
            It is fascinating to see that the robotics solutions and automation can bring benefits in different forms for each industry 
            despite the different value propositions they want to bring to their customers. 
            I am always excited to see all the new robotics applications developed around the world. What would be the next for me? 
          </p> */}
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
    contentfulAsset(title: {eq: "profile_2"}) {
      title
      fluid(quality: 90){
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
