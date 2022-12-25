## mvplaylist

<iframe
    width="533"
    height="300"
    src={`https://www.youtube.com/embed/70tjwO3O_Q4`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen>
</iframe>

mvplaylist is a web app that allows a user to login to their existing Spotify account, view and play any song on any existing playlist, and add music videos from Youtube to any song. When the user logs in, they are redirected to a Spotify log in page. If successful, the user is redirected to the playlists page of mvplaylist. This page shows the user all their playlists from their Spotify account and allows them to select a playlist. When they select a playlist, they are redirected to the mvplaylist/${playlistId} page. This page displays all songs for the chosen playlist and lets the user play any song in the browser. It also queries the mvplaylist database for any videos associated with the playlist. When the page loads, any song with a music video is rendered with a YouTube icon next to it. Each song is rendered with a search icon next to it. When the button is clicked, a search query is formed out of the song title and artist name and sent to the YouTube api. The first five results are displayed to the user with radio buttons next to them. The user can select a video and click the add video button or click cancel. If the user clicks add video, a record is created in the database that stores an object with the song id and the video id. When the user clicks the YouTube icon next to a song, a YouTube video player is embedded in the page with the song the user chose. This way, a user can take any song in their existing Spotify playlist and add a YouTube music video and make a music video playlist.

Languages: Javascript, Html, Sass

Libraries and Frameworks: Next, React, Redux, NextAuth, Mongoose, Axios

Apis: Spotify, Youtube