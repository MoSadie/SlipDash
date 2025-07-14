'use client'

import { FetchCrewList } from "@/app/util";
import { useState } from "react";
import PlayerInfo from "./playerInfo";

export default function CrewList({ baseUrl }: { baseUrl: string }) {
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("level-high-low");

    const { crewList, error, isLoading } = FetchCrewList(baseUrl);

    if (isLoading) return (<div>Loading crew list...</div>);

    if (error) return (<div>Error loading crew list</div>);

    if (!crewList || crewList.length == 0) return (<div>No crew members found</div>);
    
    // Filter crewList based on display name and filter, where empty filter text allows all
    const filteredList = crewList?.filter((crew) => crew.name.includes(filter));
    const sortedList = filteredList?.sort((a, b) => {
        if (sort === "level-high-low") {
            return b.level - a.level;
        } else if (sort === "level-low-high") {
            return a.level - b.level;
        } else if (sort === "health-high-low-value") {
            return b.currentHealth - a.currentHealth;
        } else if (sort === "health-low-high-value") {
            return a.currentHealth - b.currentHealth;
        } else if (sort === "health-high-low-percentage") {
            return Math.round((b.currentHealth / b.maxHealth) * 100) - Math.round((a.currentHealth / a.maxHealth) * 100);
        } else if (sort === "health-low-high-percentage") {
            return Math.round((a.currentHealth / a.maxHealth) * 100) - Math.round((b.currentHealth / b.maxHealth) * 100);
        }
        return 0; // Default case, no sorting
    });

    const mappedList = sortedList?.map((crewmate) => {
        return (
            <PlayerInfo key={crewmate.playerId} baseUrl={baseUrl} playerId={crewmate.playerId} />
        );
    });

    return (
        <div>
            <div className="flex flex-col bg-gray-900 text-white p-4">
                <div className="flex flex-row p-1">
                <h2 className="m-1 text-lg font-bold">Crew List:</h2>
                <input id="filter" className="bg-gray-500 m-1" type="text" placeholder="Filter crew..." onChange={(e) => setFilter(e.target.value)} />
                </div>
                <div className="flex flex-row p-1">
                <p className="m-1">Sort by:</p>
                <select id="sort" className="bg-gray-500 m-1" onChange={(e) => setSort(e.target.value)}>
                    <option value="level-high-low">Level (High to Low)</option>
                    <option value="level-low-high">Level (Low to High)</option>
                    <option value="health-high-low-value">Health (High to Low - Total)</option>
                    <option value="health-low-high-value">Health (Low to High - Total)</option>
                    <option value="health-high-low-percentage">Health (High to Low - Percentage)</option>
                    <option value="health-low-high-percentage">Health (Low to High - Percentage)</option>
                </select>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-3 shrink gap-4 p-5">
                {mappedList}
            </div>
        </div>
    );
}
