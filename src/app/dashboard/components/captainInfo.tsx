'use client';

import { archetypeToAvatar, fetchCrewById, fetchCrewList } from '../../util';
import { component } from './playerInfo';

const className = "shadow-lg/25 rounded-md ring p-1 flex item-center justify-center text-center";

// Props in: Base URL to make request to
export default function CaptainInfo({ baseUrl }: { baseUrl: string }) {
    const { crewList, error, isLoading } = fetchCrewList(baseUrl); 

    if (error) return <div className={className}>Error loading data</div>;
    if (isLoading) return <div className={className}>Loading...</div>;

    if (!crewList) return <div className={className}>Error: No data</div>;

    let captain = crewList.find(crewmate => crewmate.isCaptain);
    if (!captain) return <div className={className}>No captain found</div>;

    return component(captain); // See playerInfo.tsx
}