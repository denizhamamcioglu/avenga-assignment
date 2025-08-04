import { RequestType } from "../data/Enums"

export interface RequestOptions {
    method?: RequestType.GET | RequestType.POST | RequestType.PUT | RequestType.DELETE | RequestType.PATCH | RequestType.HEAD
    url: string
    params?: Record<string, any>
    data?: any
    headers?: Record<string, string>
    cookies?: Array<{ name: string; value: string; domain?: string; path?: string }>
    timeout?: number
    failOnStatusCode?: boolean
    baseURL?: string
}