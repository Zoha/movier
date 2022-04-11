![movier npm package image](https://github.com/Zoha/files/raw/master/movier/images/movier%20image%20v1.jpg)

# Movier

with movier package you can get movie titles information from IMDB like name, dates, casts, images and all other details that you will need in your node app

> note : we suggest to don't use this package directly on production, because we are getting information from IMDB pages content, so this requests are a little bit slow and will get couple of seconds to complete, instead use this package to save the information in your local/db

## Installation

simply install this package using yarn or npm

    $ npm install movier --save

or using yarn

    yarn add movier

## Usage

### Title information

all movie details method finally return a title result that you can see an example on this file

example usage, finding a movie with its name, we also include movie name for better match

    // find a title by name,
    movier("interstellar 2014") // gets details of first match title

    // returns full title information  { name, worldWideName, titleYear, genres .... }

other usable methods that exported from package, note that all this methods will return a title details result object

    // find a title and returns the first matched title data
    movier.getTitleDetailsByName("interstellar 2014")
    // get title info by its url
    movier.getTitleDetailsByUrl("https://www.imdb.com/title/tt0816692")
    // get title details by its IMDB id
    movier.getTitleDetailsByIMDBId("tt0816692")
    // find title by returned object from searchTitleByName function
    movier.getTitleDetailsByFoundedTitleDetails(foundedDetails)

### Search for titles

you can search for a title by its name using this method

    // search for title
    movier.searchTitleByName("interstellar 2014")
    return [{name, titleYear, aka, url, titleType, ....}]

this method returns an array of founded items details

## Test

execute tests via `yarn test` command after installing packages

## license

this package is published under MIT license
