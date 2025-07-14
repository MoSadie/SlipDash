import Link from "next/link";
import Version from "../../../../components/version";
import ShipInfo from "../../../../components/shipInfo";
import CaptainInfo from "../../../../components/captainInfo";
import EnemyInfo from "../../../../components/enemyInfo";
import CrewList from "../../../../components/crewList";
import PlayerInfo from "@/app/dashboard/components/playerInfo";

export default async function Page({
    params,
}: {
    params: Promise<{  playerId: string, protocol: string, address: string, path: string[] }>;
}) {
    const { protocol, address, playerId, path } = await params;

    const baseUrl = `${protocol}://${address}/${path.join("/")}`;

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
            <div className="grid grid-cols-3 grid-rows-1 gap-4 p-5">
                <ShipInfo baseUrl={baseUrl} />
                {(playerId && playerId != null && playerId != "spectator") ? <PlayerInfo baseUrl={baseUrl} playerId={playerId} /> : <CaptainInfo baseUrl={baseUrl} />}
                <EnemyInfo baseUrl={baseUrl} />
            </div>
            <CrewList baseUrl={baseUrl} />
            </main>
            <footer className="w-full p-4 text-center bg-gray-800 text-white flex flex-row items-center gap-5 justify-center">
                <Link href="/">Return to Setup</Link>
                <p>SlipDash v0.1</p>
                <Version baseUrl={baseUrl} />
                <p>Made by <Link target="_blank" href="https://hello.mosadie.com">MoSadie</Link></p>
            </footer>
        </div>
    );
}