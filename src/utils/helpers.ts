export function formatAddress(value: string, start: number = 4, end: number = 5) {
    return `${value?.substring(0, start)}...${value?.substring(value.length - end)}`
}