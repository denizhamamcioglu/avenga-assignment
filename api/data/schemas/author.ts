import { JSONSchemaType } from "ajv"

interface AuthorResponse {
    id: number,
    idBook: number,
    firstName?: string | null,
    lastName?: string | null
}

export const allAuthorsResponseSchema: JSONSchemaType<AuthorResponse[]> = {
    type: "array",
    items: {
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
}

export const authorsResponseSchema: JSONSchemaType<AuthorResponse> = {
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