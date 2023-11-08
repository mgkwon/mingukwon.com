import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Masonry from "react-masonry-css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const PostsPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulBlogPost.edges
  let postCounter = 0

  const breakpointColumnsObj = {
    default: 4,
    1824: 3,
    1224: 2,
    768: 1,
  }

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Posts"
        keywords={[
          `blog`,
          `personal website`,
          `mingu`,
          `mingu kwon`,
          "robotics engineer",
          "roboticist",
        ]}
      />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {posts.map(({ node }) => {
          postCounter++
          return <PostCard count={postCounter} node={node} />
        })}
      </Masonry>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allContentfulBlogPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          slug
          date(formatString: "MMMM DD, YYYY")
          title
          thumbnail {
            fluid(quality: 100) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <PostsPage location={props.location} props data={data} {...props} />
    )}
  />
)
