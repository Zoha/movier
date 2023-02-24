export interface IMDBTitleApiRawData {
  id: string;
  titleText: {
    text: string;
  };
  originalTitleText?: {
    text: string;
  };
  akas: {
    edges: {
      node: {
        country?: {
          text: string;
        };
        text: string;
      };
    }[];
  };
  releaseDate?: {
    month: number;
    year: number;
    day: number;
    country?: {
      text: string;
    };
  };
  genres?: {
    genres: {
      text: string;
    }[];
  };
  directors: {
    edges: {
      node: {
        category?: {
          text: string;
        };
        name?: {
          id: string;
          nameText: {
            text: string;
          };
        };
      };
    }[];
  };
  writers: {
    edges: {
      node: {
        category?: {
          text: string;
        };
        name?: {
          id: string;
          nameText: {
            text: string;
          };
        };
      };
    }[];
  };
  meta?: {
    publicationStatus?: string;
  };
  certificate?: {
    rating?: string;
  };
  titleType?: {
    categories?: {
      text: string;
    }[];
    id?: string;
    canHaveEpisodes?: boolean;
    isEpisode?: boolean;
    isSeries?: boolean;
    text?: string;
  };
  plot?: {
    plotText?: {
      plainText: string;
    };
  };
  casts: {
    edges: {
      node: {
        category?: {
          text: string;
        };
        name?: {
          id: string;
          nameText: {
            text: string;
          };
          akas: {
            edges: {
              node: {
                text: string;
              };
            }[];
          };
        };

        characters?: {
          name?: string;
        }[];
        episodeCredits?: {
          total?: number;
          yearRange?: {
            year?: number;
            endYear?: number;
          };
        };
      };
    }[];
  };
  producers: {
    edges: {
      node: {
        category?: {
          text: string;
        };
        name?: {
          id: string;
          nameText: {
            text: string;
          };
        };
      };
    }[];
  };
  ratingsSummary?: {
    aggregateRating?: number;
    voteCount?: number;
  };
  releaseYear?: {
    year?: number;
    endYear?: number;
  };
  releaseDates: {
    edges: {
      node: {
        day?: number;
        month?: number;
        year?: number;
        country?: {
          text: string;
        };
      };
    }[];
  };
  spokenLanguages?: {
    spokenLanguages?: {
      text: string;
    }[];
  };
  countriesOfOrigin?: {
    countries?: {
      text: string;
    }[];
  };
  primaryImage?: {
    caption?: {
      plainText: string;
    };
    height?: number;
    width?: number;
    id: string;
    type?: string;
    url?: string;
    names?: {
      nameText: {
        text: string;
      };
      id: string;
    }[];
  };
  posterImages?: {
    edges: {
      node: {
        caption?: {
          plainText: string;
        };
        height?: number;
        width?: number;
        id: string;
        type?: string;
        url?: string;
        names?: {
          nameText: {
            text: string;
          };
          id: string;
        }[];
      };
    }[];
  };
  stillFrameImages?: {
    edges: {
      node: {
        caption?: {
          plainText: string;
        };
        height?: number;
        width?: number;
        id: string;
        type?: string;
        url?: string;
        names?: {
          nameText: {
            text: string;
          };
          id: string;
        }[];
      };
    }[];
  };
  taglines?: {
    edges: {
      node: {
        text: string;
      };
    }[];
  };
  keywords: {
    edges: {
      node: {
        text: string;
      };
    }[];
  };
  quotes: {
    edges: {
      node: {
        isSpoiler?: boolean;
        lines: {
          characters?: {
            character?: string;
            name?: {
              id: string;
              nameText: {
                text: string;
              };
            };
          }[];
          stageDirection?: string;
          text?: string;
        }[];
      };
    }[];
  };
  goofs?: {
    edges: {
      node: {
        text?: {
          plainText: string;
        };
        category?: {
          text: string;
        };
        isSpoiler?: boolean;
      };
    }[];
  };
  prestigiousAwardSummary?: {
    award?: {
      category?: {
        text: string;
      };
      event?: {
        text: string;
      };
      eventEditionId?: string;
      text?: string;
      year?: number;
    };
    nominations?: number;
    wins?: number;
  };
  awardNominations?: {
    edges: {
      node: {
        award?: {
          category?: {
            text: string;
          };
          event?: {
            text: string;
          };
          eventEditionId?: string;
          text?: string;
          year?: number;
        };
        id: string;
        forEpisodes?: {
          titleText: {
            text: string;
          };
        }[];
        forSongTitles?: string[];
        isWinner?: boolean;
      };
    }[];
  };
  runtime?: {
    seconds?: number;
    displayableProperty?: {
      value: {
        plainText: string;
      };
    };
  };
  companyCredits?: {
    edges: {
      node: {
        category?: {
          text: string;
        };
        company?: {
          id: string;
          companyText?: {
            text: string;
          };
        };
      };
    }[];
  };
  lifetimeGross?: {
    total?: {
      currency?: string;
      amount?: number;
    };
  };
  openingWeekendGross?: {
    gross?: {
      total?: {
        currency?: string;
        amount?: number;
      };
    };
    theaterCount?: number;
    weekendEndDate?: string;
    weekendStartDate?: string;
  };
  rankedLifetimeGross?: {
    boxOfficeAreaType?: {
      text: string;
    };
    total?: {
      currency?: string;
      amount?: number;
    };
  };
  productionBudget?: {
    budget?: {
      currency?: string;
      amount?: number;
    };
  };
  metacritic?: {
    metascore?: {
      score?: number;
      reviewCount?: number;
    };
    url?: string;
  };
}
