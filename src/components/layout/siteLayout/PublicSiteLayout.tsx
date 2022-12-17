import { LayoutProps } from "@/src/commons/types";
import { Sidebar } from "@/src/components/layout/sidebar";

export default function PublicSiteLayout({ children }: LayoutProps) {
    return (
        <main className="w-full min-h-[100vh] flex flex-col">
            {/* <PublicHeader /> */}
            <Sidebar>
                <div className="flex-1 min-h-0">{children}</div>
            </Sidebar>

            {/* <PublicFooter /> */}
        </main>
    );
}
