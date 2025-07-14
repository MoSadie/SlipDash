'use client';

import Image from "next/image";

import AvatarBear from "./avatars/Bear.png";
import AvatarCat from "./avatars/Cat.png";
import AvatarCroc from "./avatars/Croc.png";
import AvatarHamster from "./avatars/Hamster.png";
import AvatarKoala from "./avatars/Koala.png";
import AvatarOctopus from "./avatars/Octo.png";
import AvatarTurtle from "./avatars/Turtle.png";
import AvatarDefault from "./avatars/Default.png";
import useSWR from "swr";
import { Crew } from "./crew";

const requestRefreshInterval = 1000;

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchVersion = (url: string) => {
    const { data, error, isLoading } = useSWR(url + "/version", fetcher, {
        refreshInterval: requestRefreshInterval,
    });

    return { versionData: data, error, isLoading };
};

export const fetchShipInfo = (url: string) => {
    const { data, error, isLoading } = useSWR(url + "/getShipInfo", fetcher, {
        refreshInterval: requestRefreshInterval,
    });

    return { shipData: data, error, isLoading };
};

export const fetchCrewList = (url: string) => {
    const { data, error, isLoading } = useSWR(url + "/getCrew", fetcher, {
        refreshInterval: requestRefreshInterval,
    });

    return { crewList: (data?.crewList as Crew[]), error, isLoading };
};

export const fetchCrewById = (url: string, playerId: string) => {
    const { crewList, error, isLoading } = fetchCrewList(url);

    let character = null;

    if (crewList && !isLoading && !error)
        character = crewList?.find((c: Crew) => c.playerId === playerId);

    return { character, error, isLoading };
};

export const fetchSelf = (url: string) => {
    const { crewList, error, isLoading } = fetchCrewList(url);

    let self = null;
    
    if (crewList && !isLoading && !error)
        self = crewList?.find((c: Crew) => c.isLocalPlayer);

    return { self, error, isLoading };
}

export const fetchEnemyInfo = (url: string) => {
    const { data, error, isLoading } = useSWR(url + "/getEnemyShipInfo", fetcher, {
        refreshInterval: requestRefreshInterval,
    });

    return { enemyData: data?.enemyShip, error, isLoading };
}

const avatarClassName = "object-cover rounded-md w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 2xl:w-56 2xl:h-56 row-span-3";

export function archetypeToAvatar(archetype: string) {
    switch (archetype) {
        case "bear":
            return <Image className={avatarClassName} src={AvatarBear} alt="Bear character with a space background" />;

        case "cat":
            return <Image className={avatarClassName} src={AvatarCat} alt="Cat character with a space background" />;

        case "croc":
            return <Image className={avatarClassName} src={AvatarCroc} alt="Croc character with a space background" />;

        case "hamster":
            return <Image className={avatarClassName} src={AvatarHamster} alt="Hamster character with a space background" />;

        case "koala":
            return <Image className={avatarClassName} src={AvatarKoala} alt="Koala character with a space background" />;

        case "octopus":
            return <Image className={avatarClassName} src={AvatarOctopus} alt="Octopus character with a space background" />;

        case "turtle":
            return <Image className={avatarClassName} src={AvatarTurtle} alt="Turtle character with a space background" />;

        default:
            return <Image className={avatarClassName} src={AvatarDefault} alt="A space background" />;
    }
}