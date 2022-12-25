import { useSession } from "next-auth/react";
import { SessionWithToken } from "../commons/types";

const useSessionWithToken = () => {
    const { data: session, status } = useSession();

    return {
        data: session as SessionWithToken,
        status,
    };
};

export default useSessionWithToken;
