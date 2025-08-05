import type { RequestOptions } from "../../common/types/RequestOptions"
import { RequestType } from "../../common/data/Enums"
import { Environment } from "../../common/config/Environment"
import { RequestSender } from "../../common/api/RequestSender"
import { BooksRequests } from "../data/requests/books/BooksRequests"

const DEFAULT_HEADERS = {
    "content-type": "application/json",
    "accept": "text/plain"
}

export class BooksApi {
    public static async getAllBooks(validateStatus: boolean = true) {
        console.info(`Books API: Getting all available books.`)
        const options: RequestOptions = {
            method: RequestType.GET,
            url: `${Environment.API_ENDPOINTS.base}${Environment.API_ENDPOINTS.books}`,
            headers: DEFAULT_HEADERS,
            failOnStatusCode: validateStatus
        }

        const response = await RequestSender.sendRequest(options)
        console.info(`Books API: Get all books request has been sent. Response: ${JSON.stringify(await response?.json()).slice(0, 2000)}.`)
        return response
    }

    public static async createNewBook(bookData: object = BooksRequests.NEW_BOOK, validateStatus: boolean = true) {
        console.info(`Books API: Creating a new book with the following data: ${JSON.stringify(bookData)}.`)
        const options: RequestOptions = {
            method: RequestType.POST,
            url: `${Environment.API_ENDPOINTS.base}${Environment.API_ENDPOINTS.books}`,
            data: bookData,
            headers: DEFAULT_HEADERS,
            failOnStatusCode: validateStatus,
        }

        const response = await RequestSender.sendRequest(options)
        console.info(`Books API: Create new book request has been sent. Response: ${JSON.stringify(await response?.json())}.`)
        return response
    }

    public static async updateBook(id: number, updateData: object, validateStatus: boolean = true) {
        console.info(`Books API: Updating the book with ID: ${id} with the following data: ${JSON.stringify(updateData)}.`)
        const options: RequestOptions = {
            method: RequestType.PUT,
            url: `${Environment.API_ENDPOINTS.base}${Environment.API_ENDPOINTS.books}/${id}`,
            data: updateData,
            headers: DEFAULT_HEADERS,
            failOnStatusCode: validateStatus,
        }

        const response = await RequestSender.sendRequest(options)
        console.info(`Books API: Update book request has been sent. Response: ${JSON.stringify(await response?.json())}.`)
        return response
    }
    
    public static async getBookWithId(bookId: number, validateStatus: boolean = true) {
        console.info(`Books API: Getting the book with ID: ${bookId}.`)
        const options: RequestOptions = {
            method: RequestType.GET,
            url: `${Environment.API_ENDPOINTS.base}${Environment.API_ENDPOINTS.books}/${bookId}`,
            headers: DEFAULT_HEADERS,
            failOnStatusCode: validateStatus
        }

        const response = await RequestSender.sendRequest(options)
        console.info(`Books API: Get book with ID: ${bookId} request has been sent. Response: ${JSON.stringify(await response?.json()).slice(0, 2000)}.`)
        return response
    }

    public static async deleteBookWithId(bookId: number, validateStatus: boolean = true) {
        console.info(`Books API: Deleting the book with ID: ${bookId}.`)
        const options: RequestOptions = {
            method: RequestType.DELETE,
            url: `${Environment.API_ENDPOINTS.base}${Environment.API_ENDPOINTS.books}/${bookId}`,
            headers: DEFAULT_HEADERS,
            failOnStatusCode: validateStatus
        }

        const response = await RequestSender.sendRequest(options)
        console.info(`Books API: Delete book with ID: ${bookId} request has been sent. Status: ${await response?.status()}`)
        return response
    }
}