import type { RequestOptions } from "../../common/types/RequestOptions"
import { RequestType } from "../../common/data/Enums"
import { Environment } from "../../common/config/Environment"
import { RequestSender } from "../../common/api/RequestSender"
import { AuthorsRequests } from "../data/requests/authors/AuthorsRequests"

const DEFAULT_HEADERS = {
    "content-type": "application/json",
    "accept": "text/plain"
}

export class AuthorsApi {
    public static async getAllAuthors(validateStatus: boolean = true) {
        console.info(`Authors API: Getting all available authors.`)
        const options: RequestOptions = {
            method: RequestType.GET,
            url: `${Environment.API_ENDPOINTS.base}${Environment.API_ENDPOINTS.authors}`,
            headers: DEFAULT_HEADERS,
            failOnStatusCode: validateStatus
        }

        const response = await RequestSender.sendRequest(options)
        console.info(`Authors API: Get all authors request has been sent. Response: ${JSON.stringify(await response?.json()).slice(0, 2000)}.`)
        return response
    }

    public static async createNewAuthor(authorData: object = AuthorsRequests.NEW_AUTHOR, validateStatus: boolean = true) {
        console.info(`Authors API: Creating a new author with the following data: ${JSON.stringify(authorData)}.`)
        const options: RequestOptions = {
            method: RequestType.POST,
            url: `${Environment.API_ENDPOINTS.base}${Environment.API_ENDPOINTS.authors}`,
            data: authorData,
            headers: DEFAULT_HEADERS,
            failOnStatusCode: validateStatus,
        }

        const response = await RequestSender.sendRequest(options)
        console.info(`Authors API: Create new author request has been sent. Response: ${JSON.stringify(await response?.json())}.`)
        return response
    }

    public static async updateAuthor(id: number, updateData: object, validateStatus: boolean = true) {
        console.info(`Authors API: Updating the author with ID: ${id} with the following data: ${JSON.stringify(updateData)}.`)
        const options: RequestOptions = {
            method: RequestType.PUT,
            url: `${Environment.API_ENDPOINTS.base}${Environment.API_ENDPOINTS.authors}/${id}`,
            data: updateData,
            headers: DEFAULT_HEADERS,
            failOnStatusCode: validateStatus,
        }

        const response = await RequestSender.sendRequest(options)
        console.info(`Authors API: Update author request has been sent. Response: ${JSON.stringify(await response?.json())}.`)
        return response
    }
    
    public static async getAuthorWithId(authorId: number, validateStatus: boolean = true) {
        console.info(`Authors API: Getting the author with ID: ${authorId}.`)
        const options: RequestOptions = {
            method: RequestType.GET,
            url: `${Environment.API_ENDPOINTS.base}${Environment.API_ENDPOINTS.authors}/${authorId}`,
            headers: DEFAULT_HEADERS,
            failOnStatusCode: validateStatus
        }

        const response = await RequestSender.sendRequest(options)
        console.info(`Authors API: Get author with ID: ${authorId} request has been sent. Response: ${JSON.stringify(await response?.json()).slice(0, 2000)}.`)
        return response
    }

    public static async getAuthorOfBookWithId(bookId: number, validateStatus: boolean = true) {
        console.info(`Authors API: Getting the authors of the book with ID: ${bookId}.`)
        const options: RequestOptions = {
            method: RequestType.GET,
            url: `${Environment.API_ENDPOINTS.base}${Environment.API_ENDPOINTS.authors}/authors/books/${bookId}`,
            headers: DEFAULT_HEADERS,
            failOnStatusCode: validateStatus
        }

        const response = await RequestSender.sendRequest(options)
        console.info(`Authors API: Get authors of the book with ID: ${bookId} request has been sent. Response: ${JSON.stringify(await response?.json()).slice(0, 2000)}.`)
        return response
    }

    public static async deleteAuthorWithId(authorId: number, validateStatus: boolean = true) {
        console.info(`Authors API: Deleting the author with ID: ${authorId}.`)
        const options: RequestOptions = {
            method: RequestType.DELETE,
            url: `${Environment.API_ENDPOINTS.base}${Environment.API_ENDPOINTS.authors}/${authorId}`,
            headers: DEFAULT_HEADERS,
            failOnStatusCode: validateStatus
        }

        const response = await RequestSender.sendRequest(options)
        console.info(`Authors API: Delete author with ID: ${authorId} request has been sent. Status: ${await response?.status()}`)
        return response
    }
}