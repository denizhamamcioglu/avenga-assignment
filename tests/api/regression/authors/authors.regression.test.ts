import test, { expect } from "@playwright/test";
import { DataGenerator } from "../../../../common/utils/DataGenerator";
import { AuthorsApi } from "../../../../api/services/AuthorsApi";
import { AuthorsRequests } from "../../../../api/data/requests/authors/AuthorsRequests";


const largeNumber = 10000000000
test.describe("Test edge cases of the Authors API", () => {
    test("TC-AUTHORS-07 - Validate GET /authors/<id> - Non existent author ID", async () => {
        const singleAuthorResponse = await AuthorsApi.getAuthorWithId(DataGenerator.generateRandomNumberBetween(7000, 9000), false)
        const singleAuthorResponseJson = await singleAuthorResponse?.json()
        expect(singleAuthorResponse?.status()).toBe(404)
        expect(singleAuthorResponseJson['title']).toEqual("Not Found")
        expect(singleAuthorResponseJson['traceId']).not.toBeNull()
    })

    test("TC-AUTHORS-08 - Validate GET /authors/<id> - Long author ID", async () => {
        const singleAuthorResponse = await AuthorsApi.getAuthorWithId(largeNumber, false)
        const singleAuthorResponseJson = await singleAuthorResponse?.json()
        expect(singleAuthorResponse?.status()).toBe(400)
        expect(singleAuthorResponseJson['title']).toEqual("One or more validation errors occurred.")
        expect(singleAuthorResponseJson['errors']['id'][0]).toEqual(`The value '${largeNumber}' is not valid.`)
        expect(singleAuthorResponseJson['traceId']).not.toBeNull()
    })

    test("TC-AUTHORS-09 - Validate GET /authors/<id> - Negative author ID", async () => {
        const singleAuthorResponse = await AuthorsApi.getAuthorWithId(-1, false)
        const singleAuthorResponseJson = await singleAuthorResponse?.json()
        expect(singleAuthorResponse?.status()).toBe(404)
        expect(singleAuthorResponseJson['title']).toEqual("Not Found")
        expect(singleAuthorResponseJson['traceId']).not.toBeNull()
    })

    test("TC-AUTHORS-10 - Validate POST /authors - Invalid author ID", async () => {
        AuthorsRequests.NEW_AUTHOR.id = largeNumber
        const createAuthorResponse = await AuthorsApi.createNewAuthor(AuthorsRequests.NEW_AUTHOR, false)
        const createAuthorResponseJson = await createAuthorResponse?.json()
        expect(createAuthorResponse?.status()).toBe(400)
        expect(createAuthorResponseJson['errors']['$.id']).toBeTruthy()
    })

    test("TC-AUTHORS-11 - Validate PUT /authors - Update non existing author", async () => {
        const authorIdToUpdate = DataGenerator.generateRandomNumberBetween(7000, 9000)
        const updateAuthorResponse = await AuthorsApi.updateAuthor(authorIdToUpdate, AuthorsRequests.NEW_AUTHOR, false)
        expect(updateAuthorResponse?.status()).toBe(400) // This is currently failing due to an actual bug in the API. Even though an author does not exist, it still updates it and returns 200.
    })

    test("TC-AUTHORS-12 - Validate PUT /authors - Not matching endpoint ID and request body ID", async () => {
        const endpointAuthorId = DataGenerator.generateRandomNumber(4)
        const requestBodyId = DataGenerator.generateRandomNumber(4)

        AuthorsRequests.NEW_AUTHOR.id = requestBodyId
        const updateAuthorResponse = await AuthorsApi.updateAuthor(endpointAuthorId, AuthorsRequests.NEW_AUTHOR, false)
        expect(updateAuthorResponse?.status()).toBe(400) // This is currently failing due to an actual bug in the API. Even though an author does not exist, it still updates it and returns 200.
    })

    test("TC-AUTHORS-13 - Validate DELETE /authors/<id> - Non existing author ID", async () => {
        const authorIdToDelete = DataGenerator.generateRandomNumberBetween(7000, 9000)
        const deleteAuthorResponse = await AuthorsApi.deleteAuthorWithId(authorIdToDelete)
        expect(deleteAuthorResponse?.status()).toBe(404) // This is currently failing due to an actual bug in the API. Even though an author does not exist, it still deletes it and returns 200.
    })
    
    test("TC-AUTHORS-14 - Validate GET /Authors/authors/books/<idBook> - Negative book ID", async () => {
        const authorBookId = -1
        const authorsOfBookResponse = await AuthorsApi.getAuthorOfBookWithId(authorBookId)
        const authorsOfBookJson = await authorsOfBookResponse?.json()
        expect(authorsOfBookJson.length).toBe(0)
    })

    test("TC-AUTHORS-15 - Validate GET /Authors/authors/books/<idBook> - Invalid book ID", async () => {
        const authorBookId = largeNumber
        const authorsOfBookResponse = await AuthorsApi.getAuthorOfBookWithId(authorBookId, false)
        const authorsOfBookJson = await authorsOfBookResponse?.json()
        expect(authorsOfBookResponse?.status()).toBe(400)
        expect(authorsOfBookJson!['errors']['idBook'][0]).toEqual(`The value '${largeNumber}' is not valid.`)
    })
})