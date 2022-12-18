import { GetServerSideProps } from "next";
import { getProviders, ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";
import spotifyLogo from "/public/assets/spotify-logo.png";

interface ILoginProps {
    providers: Awaited<ReturnType<typeof getProviders>>;
}

const Login = ({ providers }: ILoginProps) => {
    const { name: providerName, id: providerId } =
        providers?.spotify as ClientSafeProvider;

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="mb-6">
                <Image
                    src={spotifyLogo}
                    alt={"Spotify Logo"}
                    height={200}
                    width={200}
                />
            </div>

            <button
                className="btn"
                onClick={() => {
                    signIn(providerId, { callbackUrl: "/" });
                }}
            >
                Login with {providerName}
            </button>
        </div>
    );
};
export default Login;

export const getServerSideProps: GetServerSideProps<ILoginProps> = async (
    context
) => {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
};
