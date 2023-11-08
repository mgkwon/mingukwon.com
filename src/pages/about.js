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
      <div className="row">
        <div className="col-7">
          <figure>
            <Img fluid={data.contentfulAsset.fluid} className="kg-image" />
            <figcaption>
              With Biscuit <span>&#128054;</span> in Girona, Spain
            </figcaption>
          </figure>
        </div>
        <div className="col-5">
          <section class="about-section right">
            <h1>Work Experience</h1>

            <div class="item">
              <h2>Senior Robotics Software Engineer</h2>
              <p>Remy Robotics</p>
              <p>Jul 2019 - Present &#x1F1EA;&#x1F1F8;</p>
            </div>

            <div class="item">
              <h2>Lead Robotics Software Engineer</h2>
              <p>Dorabot</p>
              <p>Jul 2018 – Jun 2019 &#x1F1E8;&#x1F1F3;</p>
            </div>

            <div class="item">
              <h2>Robotics Software Engineer</h2>
              <p>Dorabot</p>
              <p>May 2016 – Jun 2018 &#x1F1E8;&#x1F1F3;</p>
            </div>

            <div class="item">
              <h2>Co-Founder</h2>
              <p>YunLab</p>
              <p>May 2015 – Apr 2016 &#x1F1E8;&#x1F1E6;</p>
            </div>

            <div class="item">
              <h2>Mechanical Designer Intern</h2>
              <p>Blackberry</p>
              <p>May 2014 – Aug 2014, Sep 2013 – Dec 2013 &#x1F1E8;&#x1F1E6;</p>
            </div>

            <div class="item">
              <h2>Controls Engineer Intern</h2>
              <p>General Motors</p>
              <p>Jan 2013 – Apr 2013 &#x1F1E8;&#x1F1E6;</p>
            </div>

            <div class="item">
              <h2>Software Verification Intern</h2>
              <p>Honeywell Aerospacea</p>
              <p>May 2012 – Aug 2012, Sep 2011 – Dec 2011 &#x1F1E8;&#x1F1E6;</p>
            </div>
          </section>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-4">
          <section class="about-section">
            <h1>Education</h1>

            <div class="item">
              <h2>B.AS. Honours Mechatronics Engineering Co-op</h2>
              <p>University of Waterloo, 2015</p>
            </div>
          </section>
        </div>
        <div className="col-8">
          <section class="about-section right">
            <h1>Publications</h1>

            <div class="item">
              <h2 class="publication-title">
                Grasp quality evaluation and planning for objects with negative
                curvature
              </h2>
              <p class="publication-details">Liu S., [et al, Kwon M.] (2017)</p>
            </div>
            <div class="item">
              <h2 class="publication-title">
                A Robotic System for Autonomous Grasping and Manipulation
              </h2>
              <p class="publication-details">
                Kwon M., [et al] (2018) In: Sun Y., Falco J. (eds) Robotic
                Grasping and Manipulation 2016.
              </p>
            </div>
          </section>
        </div>
      </div>
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
