import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulBlogPost
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.title}
          description={post.description || post.excerpt}
        />
        <article className={`post-content ${post.thumbnail || `no-image`}`}>
          <header className="post-content-header">
            <h1 className="post-content-title">{post.title}</h1>
          </header>

          {post.description && (
            <p class="post-content-excerpt">{post.description}</p>
          )}

          {post.thumbnail && (
            <div className="post-content-image">
              <Img
                className="kg-image"
                fluid={post.thumbnail.fluid}
                alt={post.title}
              />
              <figcaption
                dangerouslySetInnerHTML={{ __html: post.thumbnail.description }}
              ></figcaption>
            </div>
          )}

          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{
              __html: post.content.childMarkdownRemark.html,
            }}
          ></div>

          <footer className="post-content-footer">
            {/* There are two options for how we display the byline/author-info.
        If the post has more than one author, we load a specific template
        from includes/byline-multiple.hbs, otherwise, we just use the
        default byline. */}
          </footer>
        </article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      description
      date(formatString: "MMMM Do, YYYY")
      thumbnail {
        description
        fluid(quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
