# liri-node-app

**Creator**: `Amit Singh`

**Created on**: `May 16 2019`

- - -

## ABOUT THE APP
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives back data. The user has the option of using four commands (listed below) in conjuntion with specific parameters associated with the commands. The  `Commands` are:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

- - -
## HOW TO USE LIRI
### **Step by Step instructions**

1. Open your terminal such as Bash.
2. Navigate to the folder that contains the `liri.js` file. 
3. Depending on the command you run, the output will vary. 

    **Example 1**: Run the `concert-this` command
    
        node liri.js concert-this <name of artist or band>
    
    Output: The system will display a list of all events and locations where the artist or band will perform. It can result in multiple records. The system will also log all the results in the log.txt file. See screen-shot below:

    ![Results](/screenshots/concert_this_results.PNG)

    **Example 2**: Run the `spotify-this-song` command
    
        node liri.js spotify-this-song <name of song>
    
    Output: The system will display a list of information associated with the song. It can result in multiple records. The system will also log all the results in the log.txt file. See screen-shots below:

    ![Results](/screenshots/spotify_this_results.PNG)

    ![Results](/screenshots/spotify_this_user_serach_null_results.png)

    ![Results](/screenshots/spotify_this_user_serach_invalid_results.png)
   

    **Example 3**: Run the `movie-this` command
    
        node liri.js movie-this <name of movie>
    
    Output: The system will display information associated with the movie. The system will also log all the results in the log.txt file. See screen-shots below:

    ![Results](/screenshots/movie_this_results.PNG)

    ![Results](/screenshots/movie_this_user_search_null_results.png)


    **Example 4**: Run the `do-what-it-says` command
        
        node liri.js do-what-it-says
        
    Output: The system will read the text in the random.txt file, and perform the comman listed in the random.txt file. 
    
    See screen-shots below:

    ![Results](/screenshots/do_what_it_says_results_spotify_this_song.png)
    
    ![Results](/screenshots/do_what_it_says_results_movie_this.png)

- - -

## TECHNOLOGIES USED
* Javascript
* Nodejs
* Node packages:
    * Node-Spotify-API
    * Axios
    * Moment
    * DotEnv
* APIs used:
    * Spotify
    * Bands in Town
    * OMDB
* Git
* GitHub
* Heroku