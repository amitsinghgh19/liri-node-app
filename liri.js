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
   
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
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
                    console.log("response is");
                    console.log(response);

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
                    else{
                        console.log('Error occurred.');
                        console.log("response status is "+response.status);
                    }
                    
                    
                });
        };




//Execute function
liriRun(appCommand, userSearch);