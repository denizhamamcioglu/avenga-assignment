import test, { expect } from "@playwright/test";
import { BooksRequests } from "../../../api/data/requests/books/BooksRequests";
import { BooksApi } from "../../../api/services/BooksApi";
import { DataGenerator } from "../../../common/utils/DataGenerator";

test.describe("Test edge cases of the Books API", () => {
    test("TC-BOOKS-06 - Validate GET /books/<id> - Non existent book ID", async () => {
        const singleBookResponse = await BooksApi.getBookWithId(DataGenerator.generateRandomNumberBetween(7000, 9000), false)
        const singleBookResponseJson = await singleBookResponse?.json()
        expect(singleBookResponse?.status()).toBe(404)
        expect(singleBookResponseJson['title']).toEqual("Not Found")
        expect(singleBookResponseJson['traceId']).not.toBeNull()
    })

    test("TC-BOOKS-07 - Validate GET /books/<id> - Long book ID", async () => {
        const largeNumber = 10000000000
        const singleBookResponse = await BooksApi.getBookWithId(largeNumber, false)
        const singleBookResponseJson = await singleBookResponse?.json()
        expect(singleBookResponse?.status()).toBe(400)
        expect(singleBookResponseJson['title']).toEqual("One or more validation errors occurred.")
        expect(singleBookResponseJson['errors']['id'][0]).toEqual(`The value '${largeNumber}' is not valid.`)
        expect(singleBookResponseJson['traceId']).not.toBeNull()
    })

    test("TC-BOOKS-08 - Validate GET /books/<id> - Negative book ID", async () => {
        const singleBookResponse = await BooksApi.getBookWithId(-1, false)
        const singleBookResponseJson = await singleBookResponse?.json()
        expect(singleBookResponse?.status()).toBe(404)
        expect(singleBookResponseJson['title']).toEqual("Not Found")
        expect(singleBookResponseJson['traceId']).not.toBeNull()
    })

    test("TC-BOOKS-09 - Validate POST /books - Invalid publish date", async () => {
        BooksRequests.NEW_BOOK.publishDate = "someRandomText"
        const createBookResponse = await BooksApi.createNewBook(BooksRequests.NEW_BOOK, false)
        const createBookResponseJson = await createBookResponse?.json()
        expect(createBookResponse?.status()).toBe(400)
        expect(createBookResponseJson['errors']['$.publishDate']).toBeTruthy()
    })

    test("TC-BOOKS-10 - Validate PUT /books - Update non existing book", async () => {
        const bookIdToUpdate = DataGenerator.generateRandomNumberBetween(7000, 9000)
        const updateBookResponse = await BooksApi.updateBook(bookIdToUpdate, BooksRequests.NEW_BOOK, false)
        expect(updateBookResponse?.status()).toBe(400) // This is currently failing due to an actual bug in the API. Even though a book does not exist, it still updates it and returns 200.
    })

    test("TC-BOOKS-11 - Validate PUT /books - Not matching endpoint ID and request body ID", async () => {
        const endpointBookId = DataGenerator.generateRandomNumber(4)
        const requestBodyId = DataGenerator.generateRandomNumber(4)

        BooksRequests.NEW_BOOK.id = requestBodyId
        const updateBookResponse = await BooksApi.updateBook(endpointBookId, BooksRequests.NEW_BOOK, false)
        expect(updateBookResponse?.status()).toBe(400) // This is currently failing due to an actual bug in the API. Even though a book does not exist, it still updates it and returns 200.
    })

    test("TC-BOOKS-12 - Validate DELETE /books/<id> - Non existing book ID", async () => {
        const bookIdToDelete = DataGenerator.generateRandomNumberBetween(7000, 9000)
        const deleteBookResponse = await BooksApi.deleteBookWithId(bookIdToDelete)
        expect(deleteBookResponse?.status()).toBe(404) // This is currently failing due to an actual bug in the API. Even though a book does not exist, it still deletes it and returns 200.
    })
})