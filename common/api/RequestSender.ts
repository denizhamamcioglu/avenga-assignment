import { APIRequestContext, request } from "@playwright/test"
import { Constants } from "../config/Constants"
import { RequestType } from "../data/Enums"
import type { RequestOptions } from "../types/RequestOptions"

export class RequestSender {
    private static requestContext: APIRequestContext

    public static async initContext(baseURL?: string): Promise<void> {
        this.requestContext = await request.newContext({ baseURL })
    }

    public static async sendRequest(options: RequestOptions, createNewContext: boolean = true) {
        console.info(`HTTP Request: Sending an HTTP request with the following options: ${JSON.stringify(options).slice(0, 5000)}`)

        if (createNewContext) {
            await this.initContext(options.url)
        }

        const {
            method = RequestType.GET,
            url,
            params,
            data,
            headers,
            cookies,
            timeout = Constants.API_TIMEOUT,
            failOnStatusCode = true,
        } = options

        const cookieHeader =
            cookies?.map(({ name, value }) => `${name}=${value}`).join('; ') || undefined;

        const mergedHeaders = {
            ...headers,
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        };

        try {
            const response = await this.requestContext.fetch(url, {
                method,
                headers: mergedHeaders,
                data,
                params,
                timeout,
                failOnStatusCode,
            });

            const status = response.status();
            console.debug(`HTTP Request: Request sent. Status: ${status}.`)

            return response

        } catch (error: any) {
            console.error(`HTTP Request: Request failed with ${error}.`)
            return
        }
    }
}