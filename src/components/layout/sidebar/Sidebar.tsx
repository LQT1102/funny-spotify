import React, { ReactNode } from "react";
import {
    HomeIcon,
    MagnifyingGlassIcon,
    FolderIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { SessionWithToken } from "@/src/commons/types";

export interface ISidebarProps {
    children: ReactNode;
}

export default function Sidebar({ children }: ISidebarProps) {
    const { data: session } = useSession();
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

                    <SidebarItem
                        icon={<HomeIcon className="w-5 h-5" />}
                        title={"Home"}
                    />
                    <SidebarItem
                        icon={<MagnifyingGlassIcon className="w-5 h-5" />}
                        title={"Search"}
                    />
                    <SidebarItem
                        icon={<FolderIcon className="w-5 h-5" />}
                        title={"Your library"}
                    />
                    <SidebarItem
                        icon={<PlusCircleIcon className="w-5 h-5" />}
                        title={"Create Playlist"}
                    />
                    <SidebarItem
                        icon={<HeartIcon className="w-5 h-5" />}
                        title={"Liked Songs"}
                    />
                    <SidebarItem
                        icon={<RssIcon className="w-5 h-5" />}
                        title={"Your episodes"}
                    />
                    <SidebarItem
                        icon={<ArrowLeftOnRectangleIcon className="w-5 h-5" />}
                        title={"Logout"}
                        onClick={() => {
                            signOut();
                        }}
                    />
                </ul>
            </div>
        </div>
        // <div className="text-gray-500 px-5 pt-5 pb-36 text-xs lg:text-sm border-r border-gray-900 h-screen overflow-y-auto sm:max-w-[15rem] lg:max-w-[24rem] hidden md:block">
        //     <button className="btn">
        //         <HomeIcon className="h-7 w-7" /> Home
        //     </button>
        // </div>
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
            {icon} <span>{title}</span>
        </li>
    );
}
