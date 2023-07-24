# mvplaylist

[![IMAGE_ALT](mvplaylist.png)](https://www.youtube.com/watch?v=70tjwO3O_Q4)

Mvplaylist is a web app that allows a user to login to their existing Spotify account, view and play any song on any existing playlist, and add music videos from Youtube to any song. When a user clicks the login button, they are taken to a Spotify log in page. If successful, the user is redirected to the playlists page of the site. This page shows the user all their playlists from their Spotify account and allows them to select a playlist. When they click on a playlist, they are redirected to the playlist details page.

This page displays all songs for the chosen playlist and lets the user play any song in the browser. It also queries the mvplaylist database for any videos associated with the playlist. When the page renders, any song with an associated music video will have a YouTube icon displayed next to it. Each song is rendered with a search icon next to it. When clicked, a search query is sent to the YouTube api. The first five results are displayed to the user. If the user selects a video and clicks the 'add video' button, a record is created in the database that stores the association between the song searched for and the video selected. When the user clicks the YouTube icon next to a song, a YouTube video player is embedded in the page with the song the user chose. This way, a user can take any song in their existing Spotify playlist and add a YouTube music video and make a music video playlist.

The site also features a dark theme and a light theme the user can toggle with a sun/moon icon in the top header. If the screen goes below a certain width, the video window is stacked on top of the playlist window and the video window is collapsed if there is no video data to display. It only expands when the user searches or plays a video. When using the app on mobile, screen real estate is limited so this feature prevents wasted screen space. The user can also switch from one playlist to another using a pull out sidenav bar.

Languages: Javascript, HTML, SASS

Libraries and Frameworks: Next, React, Redux, NextAuth, Mongoose

Apis: Spotify, Youtube
