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
              With Biscuit <span role="img">&#128054;</span> in Girona, Spain
            </figcaption>
          </figure>
        </div>
        <div className="col-5">
          <section class="about-section right">
            <h1>Work Experience</h1>

            <div class="item">
              <h2>Senior Robotics Software Engineer</h2>
              <a href="https://remyrobotics.com/">Remy Robotics</a>
              <p>
                Jul 2019 - Present <span role="img">&#x1F1EA;&#x1F1F8;</span>
              </p>
            </div>

            <div class="item">
              <h2>Lead Robotics Software Engineer</h2>
              <a href="https://www.dorabot.com/">Dorabot</a>
              <p>
                Jul 2018 – Jun 2019 <span role="img">&#x1F1E8;&#x1F1F3;</span>
              </p>
            </div>

            <div class="item">
              <h2>Robotics Software Engineer</h2>
              <a href="https://www.dorabot.com/">Dorabot</a>
              <p>
                May 2016 – Jun 2018 <span role="img">&#x1F1E8;&#x1F1F3;</span>
              </p>
            </div>

            <div class="item">
              <h2>Co-Founder</h2>
              <p>YunLab</p>
              <p>
                May 2015 – Apr 2016 <span role="img">&#x1F1E8;&#x1F1E6;</span>
              </p>
            </div>

            <div class="item">
              <h2>Mechanical Designer Intern</h2>
              <a href="https://www.blackberry.com/us/en/products/devices">
                Blackberry
              </a>
              <p>
                May 2014 – Aug 2014, Sep 2013 – Dec 2013{" "}
                <span role="img">&#x1F1E8;&#x1F1E6;</span>
              </p>
            </div>

            <div class="item">
              <h2>Controls Engineer Intern</h2>
              <a href="https://www.gm.ca/en/home/company/canada/stcatharines.html">
                General Motors
              </a>
              <p>
                Jan 2013 – Apr 2013 <span role="img">&#x1F1E8;&#x1F1E6;</span>
              </p>
            </div>

            <div class="item">
              <h2>Software Verification Intern</h2>
              <a href="https://aerospace.honeywell.com/us/en/products-and-services/product/hardware-and-systems/satellite-communications">
                Honeywell Aerospace
              </a>
              <p>
                May 2012 – Aug 2012, Sep 2011 – Dec 2011{" "}
                <span role="img">&#x1F1E8;&#x1F1E6;</span>
              </p>
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
              <p class="publication-details">
                Liu S., [et al, Kwon M.] (2017) &nbsp;
                <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiGnezHwrWCAxXsTaQEHXQ5D34QFnoECBEQAQ&url=https%3A%2F%2Frobotics.ucmerced.edu%2Fsites%2Frobotics.ucmerced.edu%2Ffiles%2Fpage%2Fdocuments%2Fgraspwnc.pdf&usg=AOvVaw1ElNnWv2zqfhhoBfsl_I3P&opi=89978449">
                  PDF
                </a>
              </p>
            </div>
            <div class="item">
              <h2 class="publication-title">
                A Robotic System for Autonomous Grasping and Manipulation
              </h2>
              <p class="publication-details">
                Kwon M., [et al] (2018) In: Sun Y., Falco J. (eds) Robotic
                Grasping and Manipulation 2016. &nbsp;
                <a href="https://www.youtube.com/watch?v=WeFoS1-oGVE">Video</a>
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
