'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FetchCrewList } from "../util";
import { Crew, spectatorCrew } from "../crew";

export default function Page() {
    let crewList: Crew[] = [];
    const [crewmate, setCrewmate] = useState<Crew | null>(null);
    const searchParams = useSearchParams();

    const url = searchParams.has("url") ? searchParams.get("url") : null;


    // Fetch crew list when URL is set
    if (url) {
        const { crewList: list, error, isLoading } = FetchCrewList(url);

        if (error) {
            console.error("Error fetching crew list:", error);
            crewList = [];
        } else if (!isLoading && list) {
            crewList = list;
        }
    }

    if (!url || url === "") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
                <div className="bg-gray-500 p-4 rounded-md shadow-md">
                    <h1 className="text-2xl font-bold">SlipDash</h1>
                    <div>Failed to get URL, please try again.</div>
                    <Link href="/">
                        <button className="bg-blue-500 text-white p-2 rounded-md mt-4">
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    //validate URL format
    const urlPattern = /^(https?:\/\/)?([\w.-]+)(:\d+)?(\/.*)?$/;
    if (!urlPattern.test(url)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
                <div className="bg-gray-500 p-4 rounded-md shadow-md">
                    <h1 className="text-2xl font-bold">SlipDash</h1>
                    <div>Invalid URL format. Please ensure it is correct and try again.</div>
                    <Link href="/">
                        <button className="bg-blue-500 text-white p-2 rounded-md mt-4">
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    // Separate protocol and address from the URL
    // Split between the ://
    const urlParts = url.split("://");
    if (urlParts.length < 2) {
        return (
            <div>
                <h2 className="text-lg font-bold">Step 2: Select Crew Member</h2>
                <p>Invalid URL format. Please ensure it is correct and try again</p>
            </div>
        );
    }

    const protocol = urlParts[0];
    // The rest of the URL is the address
    const address = urlParts.slice(1).join("://");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <div className="bg-gray-500 p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold">SlipDash</h1>
                <h2 className="text-lg font-bold mt-4">Step 2: Select Crewmate</h2>
                <div className="mt-2">
                    <select
                        id="crewmate"
                        className="bg-gray-700 text-white p-2 rounded-md w-full"
                        value={crewmate ? crewmate.playerId : ""}
                        onChange={(e) => {
                            if (e.target.value === "spectator") {
                                setCrewmate(spectatorCrew); // Reset to spectator mode
                                return;
                            }
                            const selectedCrewmate = crewList.find((c) => c.playerId === e.target.value);
                            setCrewmate(selectedCrewmate || null);
                        }}
                    >
                        <option value="">Select a crewmate...</option>
                        <option key="spectator" value="spectator">Spectator</option>
                        {crewList.map((c) => (
                            <option key={c.playerId} value={c.playerId}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="p-5">
                    {crewmate ? (
                        <Link href={`/dashboard/${crewmate.playerId}/${protocol}/${address}`}>
                            <button className="bg-blue-500 text-white p-2 rounded-md mt-4">
                                Go to Dashboard
                            </button>
                        </Link>
                    ) : (
                        <button disabled className="bg-blue-950 text-white p-2 rounded-md mt-4">
                            Go to Dashboard
                        </button>
                    )}
                    <Link href="/">
                        <button className="bg-blue-500 text-white p-2 rounded-md mt-4 ml-2">
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}