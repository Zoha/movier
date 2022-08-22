![movier npm package image](https://raw.githubusercontent.com/Zoha/files/master/movier/images/movier%20image%20v1.jpg)

[![Zoha - movier](https://img.shields.io/static/v1?label=Zoha&message=movier&color=green&logo=github)](https://github.com/Zoha/movier "Go to GitHub repo")
[![stars - movier](https://img.shields.io/github/stars/Zoha/movier?style=social)](https://github.com/Zoha/movier)
[![forks - movier](https://img.shields.io/github/forks/Zoha/movier?style=social)](https://github.com/Zoha/movier)

[![GitHub tag](https://img.shields.io/github/tag/Zoha/movier?include_prereleases=&sort=semver&color=green)](https://github.com/Zoha/movier/releases/)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)
[![issues - movier](https://img.shields.io/github/issues/Zoha/movier)](https://github.com/Zoha/movier/issues)

# Movier

with movier package, you can get movie titles information from IMDB like name, dates, casts, images, and all other details that you will need in your Nodejs app

> note: we suggest to don't use this package directly on production, because we are getting information from IMDB pages content, so these requests are a little bit slow and will get a couple of seconds to complete, instead use this package to save the information in your local/DB

## Installation

simply install this package using yarn or npm

    $ npm install movier --save

or using yarn

    $ yarn add movier

## Usage

### Title information (movies/series)
get title complete details

note that all these methods will return a [title details result object](https://raw.githubusercontent.com/Zoha/movier/main/examples/results/interstellarTitleResults.json)
```JAVASCRIPT
    // find a title and returns the first matched title data
    movier.getTitleDetailsByName("interstellar 2014")
    // get title info by its url
    movier.getTitleDetailsByUrl("https://www.imdb.com/title/tt0816692")
    // get title details by its IMDB id
    movier.getTitleDetailsByIMDBId("tt0816692")
    // find title by returned object from searchTitleByName function
    movier.getTitleDetailsByFoundedTitleDetails(foundedDetails)
```

all these methods will return an object like the below or will throw an error if the title is not found, you can see a complete example of the result object [here](https://raw.githubusercontent.com/Zoha/movier/main/examples/results/interstellarTitleResults.json)


```JAVASCRIPT
{
    detailsLang : "...", 
    mainSource : {...}, 
    allSources : [...], 
    name : "...", 
    worldWideName : "...",
    otherNames : [...],
    titleYear : ...,
    genres : [...],
    directors : [...],
    writers : [...], 
    mainType : "...",
    plot : "...",
    casts : [...],
    producers : [...],
    mainRate : {...},
    allRates : [...],
    allReleaseDates : [...],
    dates : {...},
    ageCategoryTitle : "...",
    languages : [...],
    countriesOfOrigin : [...],
    posterImage : {...},
    allImages : [...],
    boxOffice : {...},
    productionCompanies : [...],
    taglines : [...],
    runtime : {...},
    keywords : [...],
    awards : [...],
    awardsSummary : {...},
    otherLangs : [...]
}
```

### Search for titles (movies/series)

you can search for a title by its name using this method
```JAVASCRIPT
    // search for title
    movier.searchTitleByName("interstellar 2014")
```

this method returns an [array of found items details](https://raw.githubusercontent.com/Zoha/movier/main/examples/results/interstellarTitleSearchResults.json), that its structure would be like this 

```JAVASCRIPT
[ 
    {
        source: {...},
        name: "...",
        aka: "...",
        titleYear: ...,
        url: "...",
        titleType: "...",
        matchScore: ...,
        thumbnailImageUrl: "..."
   },
   ...
]
```

### get person details (celebs)

```JAVASCRIPT
    // find a person and returns the first matched data
    movier.getPersonDetailsByName("jennifer lawrence")
    // get person details by url
    movier.getPersonDetailsByUrl("https://www.imdb.com/name/nm2225369")
    // get person details by IMDB id
    movier.getPersonDetailsByIMDBId("nm2225369")
    // get name details by returned object from searchPersonByName function
    movier.getPersonDetailsByFoundedPersonDetails(foundedDetails)
```

all these methods will return an object like the below or will throw an error if the person is not found, you can see a complete example of the result object [here](https://raw.githubusercontent.com/Zoha/movier/main/examples/results/jenniferLawrencePersonResults.json)

```JAVASCRIPT
{
  detailsLang: "...",
  mainSource: {...},
  name: "...",
  birthDate: DATE,
  birthPlace: "...",
  miniBio: [...],
  knownFor: [...],
  filmography: [...],
  personalDetails: [...],
  profileImage: {...},
  allImages: [...]
}
```

### search for people (celebs)

you can search for people by their name using this method
```JAVASCRIPT
    // search for title
    movier.searchPersonByName("jennifer lawrence")
```

this method returns an [array of found items details](https://raw.githubusercontent.com/Zoha/movier/main/examples/results/jenniferLawrencePersonSerachResults.json), that its structure would be like this 

```JAVASCRIPT
[ 
    {
        source: {...},
        name: "...",
        url: "...",
        matchScore: ...,
        thumbnailImageUrl: "..."
   },
   ...
]
```



## Test

execute tests via `yarn test` command after installing packages

## Support

for supporting this package just buy me a coffee :)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/zoha)

## contributing

please read [this](https://github.com/Zoha/movier/blob/main/CONTRIBUTING.md) for more information

## license

this package is published under MIT license
