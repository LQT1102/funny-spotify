import { NextPage } from "next";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export interface LayoutProps {
    children: ReactNode;
}

export type NextPageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export interface ExtendedToken extends JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    user: User;
    error?: TokenError;
}

export enum TokenError {
    RefreshTokenError = "RefreshTokenError",
}

export interface SessionWithToken extends Session {
    accessToken: ExtendedToken["accessToken"];
    error?: ExtendedToken["error"];
}

export interface PlaylistContextState {
    playlists: any[];
    selectedPlaylistId?: string;
    selectedPlaylist?: SpotifyApi.SinglePlaylistResponse;
}

export interface IPlaylistContext {
    playlistContextState: PlaylistContextState;
    updatePlaylistContextState: (
        updatedObj: Partial<PlaylistContextState>
    ) => void;
}
