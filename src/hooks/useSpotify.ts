import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { TokenError } from "../commons/types";
import { spotifyApi } from "../configs/spotify";
import useSessionWithToken from "./useSessionWithToken";

const useSpotify = () => {
    const { data: session } = useSessionWithToken();
    useEffect(() => {
        if (!session) return;

        // If refresh token fails, redirect to login
        if (session.error === TokenError.RefreshTokenError) {
            signIn();
        }

        spotifyApi.setAccessToken(session.accessToken);
    }, [JSON.stringify(session)]);

    return spotifyApi;
};

export default useSpotify;
