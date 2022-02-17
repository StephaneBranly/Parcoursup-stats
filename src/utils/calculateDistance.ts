import { toRad } from 'utils'

export const calculateDistance = (
    coordA: number[] | undefined,
    coordB: number[] | undefined
) => {
    if (!coordA || !coordB) return Infinity
    const R = 6371 // km
    const dLat = toRad(coordB[0] - coordA[0])
    const dLon = toRad(coordB[1] - coordA[1])
    const lat1 = toRad(coordA[0])
    const lat2 = toRad(coordB[0])

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return d
}
