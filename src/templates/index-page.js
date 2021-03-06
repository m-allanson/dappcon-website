import React from 'react'
import { graphql } from 'gatsby'
import MainSection from 'components/IndexPage/MainSection'
import StatsSection from 'components/IndexPage/StatsSection'
import PhotoSection from 'components/IndexPage/PhotoSection'
import SpeakersSection from 'components/IndexPage/SpeakersSection'
import GnosisSection from 'components/IndexPage/GnosisSection'
import SponsorsSection from 'components/IndexPage/SponsorsSection'

export const IndexPageTemplate = ({
  mainTitle,
  aboutDappcon,
  aboutGnosis,
  buttonText,
  buyTicketsLink,
  speakers,
  stats,
  programPhotoText,
  locationAndDate,
  sponsors,
}) => (
  <>
    <MainSection
      mainTitle={mainTitle}
      buttonText={buttonText}
      buyTicketsLink={buyTicketsLink}
      locationAndDate={locationAndDate}
    />
    <StatsSection dappconText={aboutDappcon} stats={stats} />
    <PhotoSection text={programPhotoText} />
    {speakers && <SpeakersSection speakers={speakers.edges} />}
    <GnosisSection text={aboutGnosis} />
    <SponsorsSection sponsors={sponsors} />
  </>
)

const IndexPage = props => {
  const {
    data: {
      speakers,
      pageData: { frontmatter: pageData },
      sponsors,
    },
  } = props
  const {
    mainTitle,
    aboutDappcon,
    aboutGnosis,
    buttonText,
    speakers: indexPageSpeakers,
    stats,
    programPhotoText,
    buyTicketsLink,
    locationAndDate,
  } = pageData

  const displayedSpeakers = Object.values(indexPageSpeakers)
  speakers.edges = speakers.edges.filter(({ node }) =>
    displayedSpeakers.includes(node.frontmatter.name),
  )
  const sortedSponsors = sponsors.edges
    .map(sponsor => sponsor.node.frontmatter)
    .sort((a, b) => b.type - a.type)

  return (
    <IndexPageTemplate
      mainTitle={mainTitle}
      aboutDappcon={aboutDappcon}
      aboutGnosis={aboutGnosis}
      buyTicketsLink={buyTicketsLink}
      buttonText={buttonText}
      stats={stats}
      programPhotoText={programPhotoText}
      speakers={speakers}
      locationAndDate={locationAndDate}
      sponsors={sortedSponsors}
    />
  )
}

IndexPage.propTypes = {}

export default IndexPage

export const pageQuery = graphql`
  query {
    pageData: markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        mainTitle
        buttonText
        buyTicketsLink
        aboutDappcon
        locationAndDate
        stats {
          firstStat {
            description
            number
          }
          secondStat {
            description
            number
          }
          thirdStat {
            description
            number
          }
        }
        programPhotoText {
          isLink
          label
          linkURL
        }
        speakers {
          speaker1
          speaker2
          speaker3
          speaker4
        }
        aboutGnosis
      }
    }
    speakers: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "speaker" } } }) {
      edges {
        node {
          frontmatter {
            name
            company
            position
            image {
              childImageSharp {
                # Specify the image processing specifications right in the query.
                # Makes it trivial to update as your page's design changes.
                fluid(maxWidth: 134) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    sponsors: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "sponsor" } } }) {
      edges {
        node {
          frontmatter {
            name
            type
            url
            image {
              publicURL
            }
          }
        }
      }
    }
  }
`
