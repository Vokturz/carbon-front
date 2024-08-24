import { distance } from 'fastest-levenshtein'
import type { Card } from './types'

const DISTANCE_THRESHOLD = 5


interface Similarity {
    card: Card
    score: number
  }

export function topNSimilar(
    targetName: string,
    cards: Card[],
    n: number = 10,
  ): Card[] {
    const similarities: Similarity[] = cards.map((card) => ({
        card,
        score: distance(targetName, card.name),
    }))

    const topN = similarities.sort((a, b) => a.score - b.score).slice(0, n)

    return topN.filter((item) => item.score <= DISTANCE_THRESHOLD)
        .map((item) => item.card)
    }

export function highlightMatch(text: string, query: string) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}