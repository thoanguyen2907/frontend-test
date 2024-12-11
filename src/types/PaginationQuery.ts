export interface PaginationQuery {
    limit: number
    offset: number, 
    signal: AbortSignal
}
