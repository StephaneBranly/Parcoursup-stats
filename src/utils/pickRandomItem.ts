const { floor, random } = Math

export const pickRandomItem = <T = any>(items: T[]) => {
    return items[floor(random() * items.length)]
}
