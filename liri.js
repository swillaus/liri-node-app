require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);


// // // concert-this
var axios = require("axios");
var artist = "Led%20Zeppelin";
var movieName = "Jumanji"


const command = process.argv[2];
const searchFor = process.argv.splice(3).join(" ");

RunCommand(command, searchFor);

function RunCommand(c, t) {
  switch (c) {
    case 'spotify-this-song':
      return SpotifySong(t)
    case 'movie-this':
      return OMDBMovie(t);
  }
}

// // Run the axios.get function...
// axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy")
//   .then(function (response) {
//     console.log(response.data)
//   });



// spotify-this-song

function n(song) {
  spotify.search({ type: 'track', query: song ? song : "The Sign" }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var songs = data.tracks.items;
    console.log(songs[0].album.artists);
  });
}


// movie-this
function OMDBMovie(movie) {

  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy")
    .then(function (response) {
      console.log(response.data)
    });
}


// do-what-it-says
