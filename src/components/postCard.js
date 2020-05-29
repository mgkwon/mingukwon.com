import React from "react"
import { Link } from "gatsby"

export default props => (
  <article
    className={`post-card ${props.count % 3 === 0 && `post-card-large`} ${
      props.postClass
    } ${props.node.thumbnail ? `with-image` : `no-image`}`}
    style={
      props.node.thumbnail && {
        backgroundImage: `url(${
          props.node.thumbnail.fluid.src
        })`,
      }
    }
  >
    <Link to={props.node.slug} className="post-card-link">
      <div className="post-card-content">
        <h2 className="post-card-title">
          {props.node.title || props.node.slug}
        </h2>
      </div>
    </Link>
  </article>
)
