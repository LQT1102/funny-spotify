import { ReactNode } from "react";
import PlaylistContextProvider from "./PlaylistContext";

export default function ContextProviderWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return <PlaylistContextProvider>{children}</PlaylistContextProvider>;
}
