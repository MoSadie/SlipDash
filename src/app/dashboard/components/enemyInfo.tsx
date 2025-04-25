'use client';

import useSWR from 'swr';
import { fetcher } from '../../util';

// Props in: Base URL to make request to
export default function EnemyInfo({ baseUrl }: { baseUrl: string }) {
    const { data, error, isLoading } = useSWR(baseUrl + "/getEnemyShipInfo", fetcher, {
        refreshInterval: 100000, //TODO lower back to 1000
    });

    const { data: selfData, error: selfError, isLoading: selfIsLoading } = useSWR(baseUrl + "/getSelf", fetcher, {
        refreshInterval: 100000, //TODO lower back to 1000
    });

    if (error || selfError) return <div>Error loading data</div>;
    if (isLoading || selfIsLoading) return <div>Loading...</div>;

    if (!data || !selfData) return <div>No data</div>;

    var currentMaxHealth = data.maxHealth - data.minHealth;
    var currentHealth = data.currentHealth - data.minHealth;

    var healthPercentage = Math.round((currentHealth / currentMaxHealth) * 100);

    var showCaptainInfo = selfData.crewmate.isCaptain;

    return (
        <div>
            <p>Ship Status:</p>
            <p>Health: {Math.round(currentHealth)}/{Math.round(currentMaxHealth)} ({healthPercentage}%)</p>
            {showCaptainInfo ? <p>Fuel: {data.currentFuel}/{data.maxFuel}</p> : ""}
            {showCaptainInfo ? <p>Salvage: {data.currentSalvage}</p> : ""}
            <p>Gems: {data.currentGems}</p>
        </div>
    )
}