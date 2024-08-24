export interface Card {
    id: number;
    name: string;
    carbonFootprint: number;
    description: string;
    source: string;
}


export interface GameState {
    started: boolean
    over: boolean
    currentPlayerTurn: number,
    playerScores: number[],
    maxCO2e: number
    currentCO2e: number
}