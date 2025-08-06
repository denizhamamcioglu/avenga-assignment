import test, { APIResponse, expect } from "@playwright/test";
import { BooksRequests } from "../../../../api/data/requests/books/BooksRequests";
import { allBooksResponseSchema, booksResponseSchema } from "../../../../api/data/schemas/books";
import { BooksApi } from "../../../../api/services/BooksApi";
import { ResponseValidator } from "../../../../common/api/ResponseValidator";

let allBooksResponse: APIResponse | undefined
const booksToBeDeleted: number[] = []

test.describe("Test happy path flows of Books API", () => {
    test.beforeAll(async () => {
        allBooksResponse = await BooksApi.getAllBooks()
    })

    test.afterAll(async () => {
        for (const bookId of booksToBeDeleted) {
            try {
                await BooksApi.deleteBookWithId(bookId)
            } catch (error: any) {
                console.warn(`Test Cleanup: Unable to delete the book with ID: ${bookId}. Error: ${error}`)
            }
        }
    })

    test("TC-BOOKS-01 - Validate GET /books endpoint", async () => {
        await ResponseValidator.performBasicResponseChecks(allBooksResponse!, allBooksResponseSchema)
        const booksJson = await allBooksResponse?.json()
        expect(booksJson[0]['id']).toBe(1)
    })

    test("TC-BOOKS-02 - Validate GET /books/<id> endpoint", async () => {
        // In order to provide isolated tests which are independent from each other and the available data, it is better to create a new book from scratch in beforeAll() block of this test file.
        // However, since the fake Books API does not permanently save the newly created book even if we call the POST /books endpoint, this test first gets all available books and uses the first one.
        const bookIdToGet = await (await allBooksResponse?.json())[0]['id']
        const singleBookResponse = await BooksApi.getBookWithId(bookIdToGet)
        await ResponseValidator.performBasicResponseChecks(singleBookResponse!, booksResponseSchema)

        const singleBookJson = await singleBookResponse?.json()
        expect(singleBookJson['id']).toEqual(bookIdToGet)

        // The logic below is the one that provides more accurate tests. However, each time that we call books/1 endpoint, title, description, excerpt and publishDate values are randomized.
        // const allBooksJson = await allBooksResponse?.json()
        // expect(singleBookJson).toEqual(allBooksJson[0])
    })

    test("TC-BOOKS-03 - Validate POST /books endpoint", async () => {
        const createBookResponse = await BooksApi.createNewBook()
        await ResponseValidator.performBasicResponseChecks(createBookResponse!, booksResponseSchema)

        const createBookJson = await createBookResponse?.json()
        expect(createBookJson).toEqual(BooksRequests.NEW_BOOK)
        booksToBeDeleted.push(createBookJson['id'])
    })

    test("TC-BOOKS-04 - Validate PUT /books/<id> endpoint", async () => {
        // In order to provide isolated tests which are independent from each other and the available data, it is better to create a new book from scratch in beforeAll() block of this test file.
        // However, since the fake Books API does not permanently save the newly created book even if we call the POST /books endpoint, this test first gets all available books and uses the first one.
        const bookIdToUpdate = await (await allBooksResponse?.json())[0]['id']
        const updateBookResponse = await BooksApi.updateBook(bookIdToUpdate, BooksRequests.NEW_BOOK)
        await ResponseValidator.performBasicResponseChecks(updateBookResponse!, booksResponseSchema)

        const updateBookJson = await updateBookResponse?.json()
        expect(updateBookJson).toEqual(BooksRequests.NEW_BOOK)
    })

    test("TC-BOOKS-05 - Validate DELETE /books/<id> endpoint", async () => {
        // In order to provide isolated tests which are independent from each other and the available data, it is better to create a new book from scratch in beforeAll() block of this test file.
        // However, since the fake Books API does not permanently save the newly created book even if we call the POST /books endpoint, this test first gets all available books and uses the first one.
        const bookIdToDelete = await (await allBooksResponse?.json())[0]['id']
        const deleteBookResponse = await BooksApi.deleteBookWithId(bookIdToDelete)
        expect(deleteBookResponse?.ok).toBeTruthy()
    })
})