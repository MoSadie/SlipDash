'use client';

import { archetypeToAvatar, FetchCrewById } from '../../util';
import { Crew, Role } from '@/app/crew';

const className = "shadow-lg/25 rounded-md ring p-1 grid grid-cols-2 grid-rows-3 item-center justify-center text-left bg-gray-500";

// Props in: Base URL to make request to
export default function PlayerInfo({ baseUrl, playerId }: { baseUrl: string, playerId: string }) {
    const { character, error, isLoading } = FetchCrewById(baseUrl, playerId);

    if (error) return <div className={className}>Error loading data</div>;
    if (isLoading) return <div className={className}>Loading...</div>;

    if (!character) {
        console.log("No character data found for playerId:", playerId);
        return component(null); // Return a default component if no character data is found
    }

    return component(character);
}

export function component(crewmate : Crew | null) {
    if (!crewmate || crewmate == null) {
        crewmate = {
            currentHealth: 0,
            maxHealth: 0,
            currentShields: 0,
            maxShields: 0,
            archetype: 'offline',
            name: 'Unknown',
            level: 0,
            roles: [],
            playerId: '',
            isCaptain: false,
            isOfficer: false,
            isLocalPlayer: false,
            xp: 0,
            skin: '',
        }
    }
    const healthPercentage = crewmate.maxHealth > 0 ? Math.round((crewmate.currentHealth / crewmate.maxHealth) * 100) : 0;
    const shieldPercentage = crewmate.maxShields > 0 ? Math.round((crewmate.currentShields / crewmate.maxShields) * 100) : 0;

    const archetypeName = crewmate.archetype.charAt(0).toUpperCase() + crewmate.archetype.slice(1).toLowerCase();

    let prefix = "";
    crewmate.roles.forEach((role: Role) => {
        prefix += role.Name + " ";
    });

    const healthColor = crewmate.maxHealth == 0 ? "from-gray-500" : healthPercentage < 25 ? "from-red-500" : healthPercentage < 100 ? "from-yellow-500" : "from-green-500";
    const shieldColor = shieldPercentage > 0 ? "to-blue-500" : "to-gray-500";


    return (
        <div className={className + " bg-linear-to-r "  + healthColor + " " + shieldColor}>
            {archetypeToAvatar(crewmate.archetype)}
            <p className="text-lg">{prefix}{crewmate.name} (Level {crewmate.level} {archetypeName})</p>
            <p>Health: {Math.round(crewmate.currentHealth)}/{Math.round(crewmate.maxHealth)} ({healthPercentage}%)</p>
            <p>Shields: {Math.round(crewmate.currentShields)}/{Math.round(crewmate.maxShields)} ({shieldPercentage}%)</p>
        </div>
    )
}