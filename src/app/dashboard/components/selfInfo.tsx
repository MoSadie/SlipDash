'use client';

import useSWR from 'swr';
import { archetypeToAvatar, fetcher } from '../../util';

const className = "shadow-lg/25 rounded-md ring p-1 flex item-center justify-center text-center";

// Props in: Base URL to make request to
export default function SelfInfo({ baseUrl }: { baseUrl: string }) {
    const { data, error, isLoading } = useSWR(baseUrl + "/getSelf", fetcher, {
        refreshInterval: 100000, //TODO lower back to 1000
    });

    if (error) return <div className={className}>Error loading data</div>;
    if (isLoading) return <div className={className}>Loading...</div>;

    if (!data) return <div className={className}>No data</div>;

    return component(data.crewmate);
}

function component(crewmate : any) {
    var healthPercentage = Math.round((crewmate.currentHealth / crewmate.maxHealth) * 100);
    var shieldPercentage = Math.round((crewmate.currentShields / crewmate.maxShields) * 100);

    var archetypeName = crewmate.archetype.charAt(0).toUpperCase() + crewmate.archetype.slice(1).toLowerCase();

    return (
        <div className={className}>
            {archetypeToAvatar(crewmate.archetype)}
            <p>Hello {crewmate.isCaptain ? "Captain " : ""}{crewmate.name} (Level {crewmate.level} {archetypeName})</p>
            <p>Health: {crewmate.currentHealth}/{crewmate.maxHealth} ({healthPercentage}%)</p>
            <p>Shields: {crewmate.currentShields}/{crewmate.maxShields} ({shieldPercentage}%)</p>
        </div>
    )
}