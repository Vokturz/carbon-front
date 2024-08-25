import { json, type RequestEvent } from '@sveltejs/kit';
import type { Category, Item } from '../../carbonada/types';



const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function POST({ request }: RequestEvent) {
    const { product, country = undefined, model = undefined } = await request.json();

    await delay(1000)

    const randomCategory: Category = ["otros", "comida", "vida cotidiana", "tecnología", "servicios"][Math.floor(Math.random() * 5)] as Category

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
        model,
        explanation: 'Explanation',
        category: randomCategory
    };

    return json(item);
}
