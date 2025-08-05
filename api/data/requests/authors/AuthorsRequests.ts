import { DataGenerator } from "../../../../common/utils/DataGenerator"

export class AuthorsRequests {
    static NEW_AUTHOR = {
        id: DataGenerator.generateRandomNumber(5),
        idBook: DataGenerator.generateRandomNumber(5),
        firstName: DataGenerator.generateRandomFirstName(),
        lastName: DataGenerator.generateRandomLastName()
    }
}