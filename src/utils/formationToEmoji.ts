import { pickRandomItem } from 'utils'

export const formationToEmoji = (name: string) => {
    switch (name) {
        case 'informatique':
            return pickRandomItem(['👩‍💻', '🧑‍💻', '👨‍💻', '👩🏻‍💻', ' 🧑🏻‍💻', '👨🏻‍💻'])
        default:
            return '⚠️'
    }
}
