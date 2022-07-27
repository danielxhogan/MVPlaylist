import mongoose, { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  spotifyUserId: {
    type: String,
    required: true
  },
  playlists: [
    {
      playlistId: {
        type: String,
        required: true
      },
      songs: [
        {
          songId: {
            type:String,
            required: true
          },
          videoId: {
            type: string,
            required: true
          }
        }
      ]
    }
  ]
})

export default models.User || model('User', userSchema);
