require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
const command = process.argv[2];
const searchFor = process.argv.splice(3).join(" ");

RunCommand(command, searchFor);

function RunCommand(c, t) {
  switch (c) {
    case 'concert-this':
      return ConcertBand(t)
    case 'spotify-this-song':
      return SpotifySong(t)
    case 'movie-this':
      return OMDBMovie(t);
    case 'do-what-it-says':
      return Search2();
  }
}


// concert-this

function ConcertBand(band) {
  axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp")
    .then(function (response) {

      var BandDisplay = [
        "Venue Name: " + response.data[0].venue.name,
        "Location: " + response.data[0].venue.city,
        "Date: " + response.data[0].datetime
      ].join("\n");

      console.log(BandDisplay);
    });
}


// spotify-this-song

function SpotifySong(song) {
  spotify.search({ type: 'track', query: song ? song : "The Sign" },
    function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      var songsData = data.tracks.items;
      var songs = [
        "Artist: " + songsData[0].album.artists[0].name,
        "Song Name: " + songsData[0].name,
        "Preview Link: " + songsData[0].preview_url,
        "Album Name: " + songsData[0].album.name
      ].join("\n");

      console.log(songs);
    });
}


// movie-this

function OMDBMovie(movieName) {
  axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy")
    .then(function (response) {
      var movieData = response.data;
      var movie = [
        "Title: " + movieData.Title,
        "Year: " + movieData.Year,
        "IMDB Rating: " + movieData.Ratings[0].Value,
        "Rotten Tomoatoes Rating: " + movieData.Ratings[1].Value,
        "Country: " + movieData.Country,
        "Language: " + movieData.Language,
        "Plot: " + movieData.Plot,
        "Actors: " + movieData.Actors
      ].join("\n");

      console.log(movie);
    });
}


// do-what-it-says

function Search2(){
fs.readFile('random.txt', 'utf8', (err, data) => {
  if (err) throw err;

  var dataArr = data.split(',');

  if( dataArr.length == 2) {
    RunCommand(dataArr[0], dataArr[1]);
  } else if (dataArr.length ==1) {
    RunCommand(dataArr[0]);
  }
  console.log(data);
});
}