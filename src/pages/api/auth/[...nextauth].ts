import { ExtendedToken, SessionWithToken, TokenError } from "@/src/commons/types";
import { scopes, spotifyApi } from "@/src/configs/spotify";
import NextAuth, { CallbacksOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const refreshAccessToken = async(token: ExtendedToken): Promise<ExtendedToken> => {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        // Call refresh token by spotifyApi
        const {body: {refresh_token, access_token, expires_in}} = await spotifyApi.refreshAccessToken();

        return {
            ...token, 
            accessToken: access_token, 
            refreshToken: refresh_token || token.refreshToken,
            accessTokenExpiresAt: Date.now() + expires_in * 1000
        }
    } catch (error) {
        console.error(error);
        return {...token, errror: TokenError.RefreshTokenError}
    }
}


const jwtCallback: CallbacksOptions['jwt'] = async({token, account, user}) => {
    let extendedToken: ExtendedToken;

    // User logs in for the first time;
    if(account && user){
        extendedToken = {
            ...token,
            user,
            accessToken: account.access_token as string,
            refreshToken: account.refresh_token as string,
            accessTokenExpiresAt: (account.expires_at as number) * 1000
        }
        console.log("First time login, Extended token ", extendedToken);
        return extendedToken;
    }

    // Subsequent requests to check auth sessions
    if(Date.now() + 10000 < (token as ExtendedToken).accessTokenExpiresAt){
        console.log("Access token still valid, returning extended token: ", token)

        return token;
    }
    // Access token has expired
    console.log("Access token has expired, refreshing...");
    return await refreshAccessToken(token as ExtendedToken);
} 

const sessionCallback: CallbacksOptions['session'] = async({session, token}) => {
    (session as SessionWithToken).accessToken = (token as ExtendedToken).accessToken;
    (session as SessionWithToken).error = (token as ExtendedToken).errror;
    return session;
}

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            authorization: {
                url: 'https://accounts.spotify.com/authorize',
                params: {
                    scope: scopes
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt: jwtCallback,
        session: sessionCallback
    }
})