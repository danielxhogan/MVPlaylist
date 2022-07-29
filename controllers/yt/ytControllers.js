import User from '../../models/user';

export const addVideo = async (req, res) => {
  const { userId, playlistId, songId, videoId } = req.body;

  console.log(`inside addVideo: ${typeof userId}, ${playlistId}, ${songId}, ${videoId}`);

  const user = await User.findOne({ spotifyUserId: userId }).exec();
  console.log(`User.findOne: ${user}`);

//  const user = await User.where({ spotifyUserId: userId });
//  console.log(`user: ${typeof user}`);
//  const count = await user.countDocuments();
//  console.log(`user count: ${count}`);

  if (user) {
    console.log(`user exists: ${user}`);
    const playlist = user.playlists.find(
      p => p.playlistId === playlistId
    );

    if (playlist) {
      console.log(`playlist: ${playlist}`);
      const song = playlist.songs.find(
        s => s.songId === songId
      )

      if (song) {
        console.log(`song: ${song}`);
        song.videoId = videoId

      } else {
        console.log(`song doesnt exist`);
        playlist.songs.push(
          {
            songId,
            videoId
          }
        )
      }

    } else {
      console.log(`playlist doesnt exist`);
      user.playlists.push(
        {
          playlistId,
          songs: [
            {
              songId,
              videoId
            }
          ]
        }
      )
    }

  } else {
    console.log('user doesnt exist');
    User.create({
      spotifyUserId: userId,
      playlists: [
        {
          playlistId,
          songs: [
            {
              songId: songId,
              videoId: videoId
            }
          ]
        }
      ]
    })
  }

  const response = await user.save({ validateBeforeSave: false })
  console.log(`addVideo user.save: ${response}`)

  res.status(200).json({
    success: true
  })
}
