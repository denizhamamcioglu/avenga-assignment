import { JSONSchemaType } from "ajv"

interface Author {
    id: number,
    idBook: number,
    firstName?: string | null,
    lastName?: string | null
}

export const author: JSONSchemaType<Author> = {
    type: "object",
    properties: {
        id: { type: "integer" },
        idBook: { type: "integer" },
        firstName: { type: "string", nullable: true },
        lastName: { type: "string", nullable: true }
    },
    required: ["id", "idBook"],
    additionalProperties: false
}