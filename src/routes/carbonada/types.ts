export interface Item {
    product: string
    industry?: string
    carbon_footprint: number
    carbon_footprint_per_USD?: number
    country: string
    cost?: number
    cost_reasoning?: string
    confidence: string
    source: string
    model: string
}


export interface GameState {
    started: boolean
    over: boolean
    currentPlayerTurn: number,
    playerScores: number[],
    maxCO2e: number
    currentCO2e: number
}