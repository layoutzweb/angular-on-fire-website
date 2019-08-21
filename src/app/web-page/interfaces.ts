export interface AofScrollEvent {
    percentage: number
    height: number
    top: number
    left: number
    client: {
        height: number
        width: number
    }
    target: Element
}
