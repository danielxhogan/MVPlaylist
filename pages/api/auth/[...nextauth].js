import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export const authOptions = {
  providers: [
    SpotifyProvider({
      authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-read-currently-playing,user-read-playback-state,user-modify-playback-state,streaming,playlist-modify-public,playlist-read-private,playlist-modify-private,user-library-read,user-library-modify',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;

      return session
    }
  }
};

export default NextAuth(authOptions);