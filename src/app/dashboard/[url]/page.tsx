import Link from "next/link";
import SelfInfo from "../components/selfInfo";
import Version from "../components/version";
import ShipInfo from "../components/shipInfo";



// Testing data base url: https://raw.githubusercontent.com/MoSadie/SlipInfo/refs/heads/main/docs/examples
const testBaseUrl = "https://raw.githubusercontent.com/MoSadie/SlipInfo/refs/heads/main/docs/examples";

export default async function Page({
    params,
}: {
    params: Promise<{ url: string }>
}) {
    const { url } = await params;
    return (
        <div>
            <h1>Dashboard</h1>
            <p>URL: {url}</p>
            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-rows-4 gap-4 p-5">
                <ShipInfo baseUrl={testBaseUrl} />
                <SelfInfo baseUrl={testBaseUrl} />
            </div>
            <footer className="absolute bottom-0 w-full p-4 text-center bg-gray-800 text-white flex flex-row items-center gap-5 justify-center">
                <p>SlipDash v0.1</p>
                <Version baseUrl={testBaseUrl} />
                <p>Made by <Link href="https://hello.mosadie.com">MoSadie</Link></p>
            </footer>
        </div>
    );
}