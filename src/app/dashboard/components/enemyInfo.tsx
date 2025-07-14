'use client';

import { FetchEnemyInfo } from '../../util';

const className = "shadow-lg/25 rounded-md ring p-1 item-center justify-center text-left bg-gray-500";

// Props in: Base URL to make request to
export default function EnemyInfo({ baseUrl }: { baseUrl: string }) {
    const { enemyData, error, isLoading } = FetchEnemyInfo(baseUrl);

    if (error) return <div className={className}>Error loading data</div>;
    if (isLoading) return <div className={className}>Loading...</div>;

    if (!enemyData || enemyData.maxHealth == 0) return <div className={className}>No enemy ship!</div>;

    const currentMaxHealth = enemyData.maxHealth - enemyData.minHealth;
    const currentHealth = enemyData.currentHealth - enemyData.minHealth;

    const healthPercentage = Math.round((currentHealth / currentMaxHealth) * 100);

    const backgroundColor = healthPercentage < 34 ? "to-red-500" : healthPercentage < 67 ? "to-yellow-500" : "to-green-500";

    return (
        <div className={`${className} bg-gradient-to-r ${backgroundColor}`}>
            <p>Enemy Ship: {enemyData.name}</p>
            <p>Health: {Math.round(currentHealth)}/{Math.round(currentMaxHealth)} ({healthPercentage}%)</p>
            <p>Intel: {enemyData.intel}</p>
            <p>Invaders: {enemyData.invaders}</p>
            <p>Threat Level: {enemyData.threatLevel}</p>
            <p>Cargo Level: {enemyData.cargoLevel}</p>
            <p>Speed Level: {enemyData.speedLevel}</p>
        </div>
    )
}