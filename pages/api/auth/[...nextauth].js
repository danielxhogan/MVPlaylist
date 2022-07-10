import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-read-currently-playing,user-read-playback-state,user-modify-playback-state,streaming,playlist-modify-public,playlist-read-private,playlist-modify-private,user-library-read,user-library-modify',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({token, account, user, profile}) {
      if (account) {
        console.log(`account: ${account}`);

        if (account.access_token) {
          console.log(`access_token: ${account.access_token}`);
          token.accessToken = account.access_token
        }

        if (account.refresh_token) {
          console.log(`refresh_token: ${account.refresh_token}`);
          token.refreshToken = account.refresh_token;
        }
      }

      if (user) {
        console.log(`token user: ${user}`);
        token.user = user;

        if (user.name) {
          console.log(`token user.name: ${user.name}`);
        }

        if (user.email) {
          console.log(`token user.email: ${user.email}`);
        }

        if (user.id) {
          console.log(`token user.id: ${user.id}`);
        }

        if (user.image) {
          console.log(`token user.image: ${user.image}`);
        }
      }

      if (profile) {
        console.log(`token profile: ${profile}`);
        token.profile = profile;

        if (profile.name) {
          console.log(`token profile.name: ${profile.name}`);
        }
      }

      return token;
    },
    async session(session, user, token) {
      if (token) {
        console.log(`token: ${token}`);

        if (token.user) {
          console.log(`user: ${token.user}`);
          session.tokenUser = token.user;
        }

        if (token.accessToken) {
          console.log(`accessToken: ${token.accessToken}`);
          session.accessToken = token.accessToken;
        }

        if (token.refreshToken) {
          console.log(`refreshToken: ${token.refreshToken}`);
          session.refreshToken = token.refreshToken;
        }

        if (token.profile) {
          console.log(`token.profile: ${token.profile}`);
          session.profile = profile;
        }
      }

      if (user) {
        console.log(`user: ${user}`);
        session.user = user;
      }


      return session;
    },
  },
});