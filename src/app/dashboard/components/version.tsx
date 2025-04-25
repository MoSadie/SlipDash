'use client';
import useSWR from "swr";

import { fetcher } from "../../util";

// Props in: Base URL to make request to
export default function Version({ baseUrl }: { baseUrl: string }) {
    const { data, error, isLoading } = useSWR(baseUrl + "/version", fetcher, {
        refreshInterval: 100000, //TODO lower back to 1000
    });

    if (error) return <div>SlipInfo Version: Disconnected</div>;
    if (isLoading) return <div>SlipInfo Version: Loading</div>;

    if (!data) return <div>SlipInfo Version: Unknown</div>;

    return (
        <div>
            <p>SlipInfo Version: {data.version}</p>
        </div>
    )
}