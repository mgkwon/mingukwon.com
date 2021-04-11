import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

export default props => (
  <div
    className={`post-card ${props.node.thumbnail ? `with-image` : `no-image`}`}
    style={
      props.node.thumbnail && {
        backgroundImage: `url(${props.node.thumbnail.fluid.src})`,
      }
    }
  >
    <Link to={props.node.slug} className="post-card-link">
      <Img fluid={props.node.thumbnail.fluid} />
      <div className="post-card-content">
        <h2 className="post-card-title">
          {props.node.title || props.node.slug}
        </h2>
      </div>
    </Link>
  </div>
)
