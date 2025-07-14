export type Crew = {
    name: string;
    archetype: string;
    skin: string;
    level: number;
    xp: number;
    currentHealth: number;
    maxHealth: number;
    currentShields: number;
    maxShields: number;
    isCaptain: boolean;
    isOfficer: boolean;
    roles: Role[];
    isLocalPlayer: boolean;
    playerId: string;
}

export type Role = {
    Index: { Value: number };
    Name: string;
    Code: string;
    GrantedMessage: string;
    RevokedMessage: string;
};

export const emptyCrew: Crew = {
    name: "Unknown",
    archetype: "offline",
    skin: "",
    level: 0,
    xp: 0,
    currentHealth: 0,
    maxHealth: 0,
    currentShields: 0,
    maxShields: 0,
    isCaptain: false,
    isOfficer: false,
    roles: [],
    isLocalPlayer: false,
    playerId: ""
};

export const spectatorCrew: Crew = {
    name: "Spectator",
    archetype: "spectator",
    skin: "",
    level: 0,
    xp: 0,
    currentHealth: 0,
    maxHealth: 0,
    currentShields: 0,
    maxShields: 0,
    isCaptain: false,
    isOfficer: false,
    roles: [],
    isLocalPlayer: false,
    playerId: "spectator"
};