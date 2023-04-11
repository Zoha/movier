import { gql } from "graphql-request";

export const personDetailsQuery = gql`
  query PersonDetails($id: ID!) {
    name(id: $id) {
      credits(
        first: 5000
        filter: { excludeCategories: ["self", "archive_footage"] }
      ) {
        total
        edges {
          node {
            title {
              id
              originalTitleText {
                text
              }
              primaryImage {
                url
                width
                height
                caption {
                  plainText
                }
              }
              releaseYear {
                year
                endYear
              }
              genres {
                genres {
                  text
                }
              }
              productionStatus {
                currentProductionStage {
                  id
                }
              }
            }
            category {
              text
            }
            ... on Cast {
              characters {
                name
              }
              episodeCredits(last: 1000) {
                total
                yearRange {
                  endYear
                  year
                }
                edges {
                  node {
                    title {
                      id
                      originalTitleText {
                        text
                      }
                      releaseYear {
                        year
                      }
                      series {
                        displayableEpisodeNumber {
                          displayableSeason {
                            text
                          }
                          episodeNumber {
                            text
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            attributes {
              text
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
      primaryImage {
        url
        caption {
          plainText
        }
      }
      bio {
        text {
          plainText
        }
      }
      age {
        text
      }
      deathCause {
        text
      }
      height {
        measurement {
          value
        }
      }
      nickNames {
        text
      }
    }
  }
`;
