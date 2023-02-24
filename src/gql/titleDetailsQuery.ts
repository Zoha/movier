import { gql } from "graphql-request";

export const titleDetailsQuery = gql`
  query GetTitleDetails($titleId: ID!) {
    title(id: $titleId) {
      id
      titleText {
        text
      }
      originalTitleText {
        text
      }
      akas(last: 200) {
        edges {
          node {
            country {
              text
            }
            text
          }
        }
      }
      releaseDate {
        month
        year
        day
        country {
          text
        }
      }
      genres {
        genres {
          text
        }
      }
      directors: credits(first: 200, filter: { categories: ["director"] }) {
        edges {
          node {
            category {
              text
            }
            name {
              id
              nameText {
                text
              }
            }
          }
        }
      }
      writers: credits(first: 200, filter: { categories: ["writer"] }) {
        edges {
          node {
            category {
              text
            }
            name {
              id
              nameText {
                text
              }
            }
          }
        }
      }
      meta {
        publicationStatus
      }
      titleType {
        categories {
          text
        }
        id
        canHaveEpisodes
        isEpisode
        isSeries
        text
      }
      plot {
        plotText {
          plainText
        }
      }
      casts: credits(first: 200, filter: { categories: ["actor", "actress"] }) {
        edges {
          node {
            category {
              text
            }
            name {
              id
              nameText {
                text
              }
            }
            ... on Cast {
              characters {
                name
              }
              name {
                akas(first: 100) {
                  edges {
                    node {
                      text
                    }
                  }
                }
              }
              episodeCredits(first: 200) {
                total
                yearRange {
                  year
                  endYear
                }
              }
            }
          }
        }
      }
      producers: credits(first: 200, filter: { categories: ["producer"] }) {
        edges {
          node {
            category {
              text
            }
            name {
              id
              nameText {
                text
              }
            }
          }
        }
      }
      ratingsSummary {
        aggregateRating
        voteCount
      }
      releaseYear {
        year
        endYear
      }
      releaseDates(first: 200) {
        edges {
          node {
            day
            month
            year
            country {
              text
            }
          }
        }
      }
      certificate {
        rating
      }
      spokenLanguages {
        spokenLanguages {
          text
        }
      }
      countriesOfOrigin {
        countries {
          text
        }
      }
      primaryImage {
        caption {
          plainText
        }
        height
        width
        id
        type
        url
        names {
          nameText {
            text
          }
          id
        }
      }
      stillFrameImages: images(first: 200, filter: { types: ["still_frame"] }) {
        edges {
          node {
            caption {
              plainText
            }
            height
            width
            id
            type
            url
            names {
              nameText {
                text
              }
              id
            }
          }
        }
      }
      posterImages: images(first: 200, filter: { types: ["poster"] }) {
        edges {
          node {
            caption {
              plainText
            }
            height
            width
            id
            type
            url
            names {
              nameText {
                text
              }
              id
            }
          }
        }
      }
      taglines(first: 200) {
        edges {
          node {
            text
          }
        }
      }
      keywords(first: 200) {
        edges {
          node {
            text
          }
        }
      }
      quotes(first: 200) {
        edges {
          node {
            isSpoiler
            lines {
              characters {
                character
                name {
                  id
                  nameText {
                    text
                  }
                }
              }
              stageDirection
              text
            }
          }
        }
      }
      goofs(first: 200) {
        edges {
          node {
            text {
              plainText
            }
            category {
              text
            }
          }
        }
      }
      prestigiousAwardSummary {
        award {
          category {
            text
          }
          event {
            text
          }
          eventEditionId
          text
          year
        }
        nominations
        wins
      }
      awardNominations(first: 300) {
        edges {
          node {
            award {
              category {
                text
              }
              event {
                text
              }
              eventEditionId
              text
              year
            }
            id
            forEpisodes {
              titleText {
                text
              }
            }
            forSongTitles
            isWinner
          }
        }
      }
      runtime {
        seconds
        displayableProperty {
          value {
            plainText
          }
        }
      }
      companyCredits(first: 200) {
        edges {
          node {
            category {
              text
            }
            company {
              id
              companyText {
                text
              }
            }
          }
        }
      }
      lifetimeGross(boxOfficeArea: WORLDWIDE) {
        total {
          currency
          amount
        }
      }
      openingWeekendGross(boxOfficeArea: WORLDWIDE) {
        gross {
          total {
            currency
            amount
          }
        }
        theaterCount
        weekendEndDate
        weekendStartDate
      }
      rankedLifetimeGross(boxOfficeArea: DOMESTIC) {
        boxOfficeAreaType {
          text
        }
        total {
          currency
          amount
        }
      }
      productionBudget {
        budget {
          currency
          amount
        }
      }
      metacritic {
        metascore {
          score
          reviewCount
        }
        url
      }
    }
  }
`;
