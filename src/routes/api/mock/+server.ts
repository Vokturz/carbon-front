import { json, type RequestEvent } from '@sveltejs/kit';

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
}

export async function POST({ request }: RequestEvent) {
    const { product, country = undefined, model = undefined } = await request.json();

    const item: Item = {
        product,
        industry: 'Example Industry',
        carbon_footprint: Math.random() * 100, // Random carbon footprint for mock
        carbon_footprint_per_USD: Math.random(), // Random carbon footprint per USD for mock
        country,
        cost: Math.random() * 1000, // Random cost for mock
        cost_reasoning: 'Example reasoning for cost',
        confidence: 'High',
        source: 'Mock Source',
        model
    };

    return json(item);
}
