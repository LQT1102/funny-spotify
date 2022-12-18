import { NextPage } from "next";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export interface LayoutProps{
    children: ReactNode;
}

export type NextPageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement;
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export interface ExtendedToken extends JWT{
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: number;
    user: User;
    errror?: TokenError
}

export enum TokenError{
    RefreshTokenError = "RefreshTokenError"
}

export interface SessionWithToken extends Session{
    accessToken: string;
    error?: TokenError;
}