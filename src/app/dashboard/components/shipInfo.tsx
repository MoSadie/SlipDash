'use client';

import { FetchCrewList, FetchSelf, FetchShipInfo, ShipTechUnitToSymbol } from "@/app/util";

const className = "shadow-lg/25 rounded-md ring p-1 item-center justify-center text-left bg-gray-500";

// Props in: Base URL to make request to
export default function ShipInfo({ baseUrl }: { baseUrl: string }) {
    const { shipData, error, isLoading } = FetchShipInfo(baseUrl);
    const { self, error: selfError, isLoading: selfIsLoading} = FetchSelf(baseUrl);
    const { crewList, error: crewError, isLoading: crewIsLoading } = FetchCrewList(baseUrl);

    if (error) return <div className={className}>Error loading data</div>;
    if (isLoading) return <div className={className}>Loading...</div>;

    if (!shipData) return <div className={className}>No data</div>;

    const currentMaxHealth = shipData.maxHealth - shipData.minHealth;
    const currentHealth = shipData.currentHealth - shipData.minHealth;

    const healthPercentage = Math.round((currentHealth / currentMaxHealth) * 100);

    const shipTech = shipData.shipTech || [];
    const activeShipTech = shipTech.filter((tech: { IsActive: boolean; }) => tech.IsActive);


    if (selfError) return <div className={className}>Error loading self data</div>;
    if (selfIsLoading) return <div className={className}>Loading self data...</div>;

    if (!self) return <div className={className}>Not currently on a ship!</div>;

    const showCaptainInfo = self.isCaptain || self.isOfficer;

    
    if (crewError) return <div className={className}>Error loading crew data</div>;
    if (crewIsLoading) return <div className={className}>Loading crew data...</div>;
    
    if (!crewList) return <div className={className}>No crew members found</div>;

    const fullyHealedCrewMembers = crewList.filter(crewmate => crewmate.currentHealth >= crewmate.maxHealth).length;
    const fullyHealedCrewMembersPercentage = Math.round((fullyHealedCrewMembers / crewList.length) * 100);

    const backgroundColor = healthPercentage < 25 ? "from-red-500" : (fullyHealedCrewMembers < crewList.length || healthPercentage < 100) ? "from-yellow-500" : "from-green-500";

    return (
        <div className={className + " bg-linear-to-r " + backgroundColor + " flex justify-between items-start"}>
            <div id="left" className="flex-1 mr-4">
            <p>Ship Status:</p>
            <p>Health: {Math.round(currentHealth)}/{Math.round(currentMaxHealth)} ({healthPercentage}%)</p>
            {showCaptainInfo ? <p>Fuel: {shipData.currentFuel}/{shipData.maxFuel}</p> : ""}
            {showCaptainInfo ? <p>Salvage: {shipData.currentSalvage}</p> : ""}
            <p>Gems: {shipData.currentGems}</p>
            <p>Fully Healed Crew Members: {fullyHealedCrewMembers}/{crewList.length} ({fullyHealedCrewMembersPercentage}%)</p>
            </div>
            <div id="right" className="flex-1 ml-4">
            <p>Active Ship Tech:</p>
            {activeShipTech.length > 0 ? (
                <ul>
                {activeShipTech.map((tech: { Name: string; ShortDescription: string; Level: number; MaxLevel: number; Unit: string, Levels: { [key: number]: { Level: number, Value: number, Cost: number; } } }, index: number) => (
                    <li key={index} title={tech.ShortDescription + (tech.Levels && (tech.Level - 1) in tech.Levels ? ` (Current Value: ${tech.Levels[tech.Level - 1].Value}${ShipTechUnitToSymbol(tech.Unit)})` : "")}>
                    {tech.Name}:  (Level {tech.Level}/{tech.MaxLevel})
                    </li>
                ))}
                </ul>
            ) : (
                <p>No active ship tech</p>
            )}
            </div>
        </div>
    )
}