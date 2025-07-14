'use client';

import { fetchVersion } from "../../util";

// Props in: Base URL to make request to
export default function Version({ baseUrl }: { baseUrl: string }) {
    const { versionData, error, isLoading } = fetchVersion(baseUrl);

    if (error) return <div>SlipInfo Version: Disconnected</div>;
    if (isLoading) return <div>SlipInfo Version: Loading</div>;

    if (!versionData) return <div>SlipInfo Version: Unknown</div>;

    return (
        <div>
            <p>SlipInfo Version: {versionData.version}</p>
        </div>
    )
}