import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { IPlaylistContext, PlaylistContextState } from "../commons/types";
import useSessionWithToken from "../hooks/useSessionWithToken";
import useSpotify from "../hooks/useSpotify";

const defaultPlaylistContextState: PlaylistContextState = {
    playlists: [],
    selectedPlaylistId: undefined,
    selectedPlaylist: undefined,
};

export const PlaylistContext = createContext<IPlaylistContext>({
    playlistContextState: defaultPlaylistContextState,
    updatePlaylistContextState: () => {},
});

export const usePlaylistContext = () => useContext(PlaylistContext);

const PlaylistContextProvider = ({ children }: { children: ReactNode }) => {
    const spotifyApi = useSpotify();
    const { data: session } = useSessionWithToken();

    const [playlistContextState, setPlaylistContextState] = useState(
        defaultPlaylistContextState
    );

    const updatePlaylistContextState = (
        updatedObj: Partial<PlaylistContextState>
    ) => {
        setPlaylistContextState((previousPlaylistContextState) => ({
            ...previousPlaylistContextState,
            ...updatedObj,
        }));
    };

    useEffect(() => {
        const getUserPlaylists = async () => {
            const userPlaylistResponse = await spotifyApi.getUserPlaylists();
            updatePlaylistContextState({
                playlists: userPlaylistResponse.body.items,
            });
        };

        if (spotifyApi.getAccessToken()) {
            getUserPlaylists();
        }
    }, [session, spotifyApi]);

    const playlistContextProviderData = {
        playlistContextState,
        updatePlaylistContextState,
    };

    return (
        <PlaylistContext.Provider value={playlistContextProviderData}>
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistContextProvider;
