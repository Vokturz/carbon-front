import { distance } from 'fastest-levenshtein'
import type { Product } from './types'

const DISTANCE_THRESHOLD = 5


interface Similarity {
    product: Product
    score: number
  }

export function topNSimilar(
    targetName: string,
    products: Product[],
    n: number = 10,
  ): Product[] {
    const similarities: Similarity[] = products.map((product) => ({
        product,
        score: distance(targetName, product.name),
    }))

    const topN = similarities.sort((a, b) => a.score - b.score).slice(0, n)

    return topN.filter((item) => item.score <= DISTANCE_THRESHOLD)
        .map((item) => item.product)
    }

export function highlightMatch(text: string, query: string) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}