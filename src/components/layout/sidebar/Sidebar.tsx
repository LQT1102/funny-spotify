import { usePlaylistContext } from "@/src/contexts/PlaylistContext";
import useSpotify from "@/src/hooks/useSpotify";
import {
    ArrowLeftOnRectangleIcon,
    FolderIcon,
    HeartIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    MusicalNoteIcon,
    PlusCircleIcon,
    RssIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { ReactNode, useMemo } from "react";

export interface ISidebarProps {
    children: ReactNode;
}

export default function Sidebar({ children }: ISidebarProps) {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();

    const {
        playlistContextState: { playlists },
        updatePlaylistContextState,
    } = usePlaylistContext();

    const MENU_ITEMS = useMemo(() => {
        return [
            { icon: <HomeIcon className="w-5 h-5" />, title: "Home" },
            {
                icon: <MagnifyingGlassIcon className="w-5 h-5" />,
                title: "Search",
            },
            { icon: <FolderIcon className="w-5 h-5" />, title: "Your library" },
            {
                icon: <PlusCircleIcon className="w-5 h-5" />,
                title: "Create Playlist",
            },
            { icon: <HeartIcon className="w-5 h-5" />, title: "Liked Songs" },
            { icon: <RssIcon className="w-5 h-5" />, title: "Your episodes" },
        ];
    }, []);

    const setSelectedPlaylist = async (playListId: string) => {
        const playlistResponse = await spotifyApi.getPlaylist(playListId);
        updatePlaylistContextState({
            selectedPlaylistId: playListId,
            selectedPlaylist: playlistResponse.body,
        });
    };
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {children}
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden"
                >
                    Open drawer
                </label>
            </div>
            <div className="drawer-side scollbar-hidden border-r border-neutral border-opacity-20">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="flex flex-col gap-4 p-4 w-60 bg-base-100 text-base-content">
                    {session?.user && (
                        <div className="truncate">{session.user.name}</div>
                    )}
                    {MENU_ITEMS.map((item) => {
                        return (
                            <SidebarItem
                                key={item.title}
                                icon={item.icon}
                                title={item.title}
                            />
                        );
                    })}

                    <SidebarItem
                        icon={<ArrowLeftOnRectangleIcon className="w-5 h-5" />}
                        title={"Logout"}
                        onClick={() => {
                            signOut();
                        }}
                    />

                    <div className="divider m-0" />

                    {playlists.map(({ id, name }) => (
                        <SidebarItem
                            key={id}
                            icon={<MusicalNoteIcon className="w-5 h-5" />}
                            title={name}
                            onClick={async () => {
                                await setSelectedPlaylist(id);
                            }}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export interface ISidebarItemProps {
    title: string;
    icon: ReactNode;
    onClick?: () => void;
}

export function SidebarItem({ icon, title, onClick }: ISidebarItemProps) {
    return (
        <li
            onClick={() => onClick && onClick()}
            className="flex gap-1 items-center text-neutral  hover:text-accent cursor-pointer space-x-2"
        >
            <span>{icon}</span> <span>{title}</span>
        </li>
    );
}
