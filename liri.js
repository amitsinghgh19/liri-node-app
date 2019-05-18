//code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Create a variable to access the keys.js file (which is in the same root directory) to access the api keys that are required
var keys = require("./keys.js");
//Creating variables for the required packages (node-spotify-api, axios, fs for read/write, and moment to convert to event date for bandsInTown API)
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// Variables for the arguments to be entered by the user in Liri
var appCommand = process.argv[2];
console.log("appCommand: " + appCommand);

// Use the slice method to account for user's search starting with index 3 position forth because search could have spaces
var userSearch = process.argv.slice(3).join(" ");
console.log("userSearch: " + userSearch);

//Using switch statement to execute the code appropriate to the appCommand that is inputed from the user
function liriRun(appCommand, userSearch) {
    switch (appCommand) {
        case "spotify-this-song":
            getSpotify(userSearch);
            break;

        case "concert-this":
            getBandsInTown(userSearch);
            break;

        case "movie-this":
            getOMDB(userSearch);
            break;

        case "do-what-it-says":
            getRandom();
            break;
        // If appCommand is left blank, return a default message to user
        default:
            console.log("Invalid Option. Please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says' in order to continue");
    }
};

//Function to search Music Info from Spotify API
function getSpotify(songName) {
    // Variables for the secret ids for spotify
    var spotify = new Spotify(keys.spotify);

    if (!songName) {
        songName = "The Sign";//default Song
    };
   
    spotify.search({ type: 'track', query: songName }, 

        function (err, data) {
        if (err) {
            console.log("Error occurred: " + err);
            return;
        }

        //console.log("Data for searched song: " + data.tracks.items[0]);
        // adding a line break for clarity of when search results begin
        console.log("=======================================================================================================");
        fs.appendFileSync("log.txt", "=======================================================================================================\n");
        
        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("**********SPOTIFY SONG INFO BEGIN*********");
            fs.appendFileSync("log.txt", i +"\n");
            fs.appendFileSync("log.txt", "**********SPOTIFY SONG INFO BEGIN*********\n");
            console.log("Song name: " + songs[i].name);
            fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
            console.log("Song Preview Link:: " + songs[i].preview_url);
            fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
            console.log("Album: " + songs[i].album.name);
            fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
            console.log("Artist(s): " + songs[i].artists[0].name);
            fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
            console.log("**********SPOTIFY SONG INFO END*********");  
            fs.appendFileSync("log.txt", "**********SPOTIFY SONG INFO END*********\n");
         }
    });
    
};

//Function to search Concert Info using Bands In Town API
function getBandsInTown(artist) {
            var artist = userSearch;
            var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

            axios.get(bandQueryURL).then(
            function (response, error) {
            // adding a line break for clarity of when search results begin
            console.log("=======================================================================================================");
            fs.appendFileSync("log.txt", "=======================================================================================================\n");
            //console.log("response is");
            //console.log(response);

            if(!error && response.status === 200){
                console.log("response status is "+response.status);
                var concerts = response.data;
                for (var i = 0; i < concerts.length; i++) {  
                console.log(i);
    
                console.log("**********BANDS IN TOWN EVENT INFO BEGIN*********");
                fs.appendFileSync("log.txt", i +"\n");
                fs.appendFileSync("log.txt", "**********BANDS IN TOWN EVENT INFO BEGIN*********\n");
                
                console.log("Name of the venue: " + response.data[i].venue.name);
                fs.appendFileSync("log.txt", "Name of the venue: " + response.data[i].venue.name +"\n");

                console.log("Venue Location: " + response.data[i].venue.city);
                fs.appendFileSync("log.txt", "Venue Location: " + response.data[i].venue.city +"\n");

                console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM-DD-YYYY"));
                fs.appendFileSync("log.txt", "Date of the Event: " + moment(response.data[i].datetime).format("MM-DD-YYYY") +"\n");

                console.log("Event URL: " + response.data[i].url);
                fs.appendFileSync("log.txt", "Event URL: " + response.data[i].url +"\n");
            
                console.log("**********BANDS IN TOWN EVENT INFO END*********");  
                fs.appendFileSync("log.txt", "**********BANDS IN TOWN EVENT INFO END*********\n");

            }
            }
            // else{
            //     console.log('Error occurred.');
            //     console.log("response status is "+response.status);
            // }
                
            }).catch(function(error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log("---------------Data---------------");
                  console.log(error.response.data);
                  console.log("---------------Status---------------");
                  console.log(error.response.status);
                  console.log("---------------Status---------------");
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an object that comes back with details pertaining to the error that occurred.
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message);
                }
                console.log(error.config);
              });
        };

//Function to search Movie Info using OMDB API
function getOMDB(movie) {
            //console.log("Movie: " + movie);
            //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
            if (!movie) {
                movie = "Mr. Nobody";
                console.log("=======================================================================================================");
                fs.appendFileSync("log.txt", "=======================================================================================================\n");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +"\n");
                console.log("It's on Netflix!");
                fs.appendFileSync("log.txt", "It's on Netflix!\n");
            }
            var movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
            console.log("movie query url is- " +movieQueryUrl);

            axios.request(movieQueryUrl).then(
                function (response, error) {
                // adding a line break for clarity of when search results begin
                console.log("=======================================================================================================");
                fs.appendFileSync("log.txt", "=======================================================================================================\n");
                //console.log("response is");
                //console.log(response);
                if(!error && response.status === 200){
                    console.log("response status is "+response.status);

                    console.log("**********OMDB MOVIE INFO BEGIN*********");
                    fs.appendFileSync("log.txt", "**********OMDB MOVIE INFO BEGIN*********\n");
                    
                    console.log("Movie Title: " + response.data.Title);
                    fs.appendFileSync("log.txt", "Movie Title: " + response.data.Title +"\n");
    
                    console.log("Release Year: " + response.data.Year);
                    fs.appendFileSync("log.txt", "Release Year: " + response.data.Year +"\n");

                    console.log("IMDB Rating: " + response.data.imdbRating);
                    fs.appendFileSync("log.txt", "IMDB Rating: " + response.data.imdbRating +"\n");

                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                    fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value +"\n");
    
                    console.log("Country of Production: " + response.data.Country);
                    fs.appendFileSync("log.txt", "Country of Production: " + response.data.Country +"\n");

                    console.log("Language: " + response.data.Language);
                    fs.appendFileSync("log.txt", "Language: " + response.data.Language +"\n");

                    console.log("Plot: " + response.data.Plot);
                    fs.appendFileSync("log.txt", "Plot: " + response.data.Plot +"\n");

                    console.log("Actors: " + response.data.Actors);
                    fs.appendFileSync("log.txt", "Actors: " + response.data.Actors +"\n");

                    console.log("Awards: " + response.data.Awards);
                    fs.appendFileSync("log.txt", "Awards: " + response.data.Awards +"\n");

                    console.log("Poster URL: " + response.data.Poster);
                    fs.appendFileSync("log.txt", "Poster URL: " + response.data.Poster +"\n");
                   
                    console.log("**********OMDB MOVIE INFO END*********");  
                    fs.appendFileSync("log.txt", "**********OMDB MOVIE INFO END*********\n");

                }
                // else{
                //     console.log('Error occurred.');
                //     console.log("response status is "+response.status);
                // }
                
            }).catch(function(error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log("---------------Data---------------");
                  console.log(error.response.data);
                  console.log("---------------Status---------------");
                  console.log(error.response.status);
                  console.log("---------------Status---------------");
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an object that comes back with details pertaining to the error that occurred.
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error:", error.message);
                }
                console.log(error.config);
              });
        };

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// function for reading out of random.txt file  
function getRandom() {
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    return console.log(error);

                } else {
                    console.log(data);

                    var randomData = data.split(",");
                    liriRun(randomData[0], randomData[1]);
                }
                //console.log("\r\n" + "testing: " + randomData[0] + randomData[1]);

            })
            ;
        };

//Execute function
liriRun(appCommand, userSearch);