import comida from '$lib/assets/comida.png';
import otros from '$lib/assets/otros.gif';
import servicios from '$lib/assets/servicios.png';
import tecnologia from '$lib/assets/tecnologia.png';
import vidaCotidiana from '$lib/assets/vida-cotidiana.png';
import transporte from '$lib/assets/transporte.png';


export type Category = "otros" | "comida" | "vida cotidiana" | "tecnología" | "servicios"  | "transporte"

export const categoryMap: Record<Category, string> = {
    'comida': comida,
    'vida cotidiana': vidaCotidiana,
    'servicios': servicios,
    'tecnología': tecnologia,
    'otros': otros,
    'transporte': transporte
};

export interface Item {
    product: string;
    industry?: string;
    carbon_footprint: number;
    carbon_footprint_per_USD?: number;
    country: string;
    cost?: number;
    cost_reasoning?: string;
    confidence: string;
    source: string;
    model: string;
    explanation: string;
    category: Category;
}

export interface GameState {
    started: boolean
    over: boolean
    currentPlayerTurn: number,
    playerScores: number[],
    maxCO2e: number
    currentCO2e: number
}