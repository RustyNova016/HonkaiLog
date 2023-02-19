import axios from "axios";
import {stringify} from "json5";
import {HoyoAPIResponse} from "@/lib/External APIs/Hoyoverse/HoyoAPIResponse";
import {APIType} from "@/lib/External APIs/Hoyoverse/ApiTypes";


export class HoyoverseAPI {
    public static fetchAPI(apiType: APIType, authKey: string) {
        return this.fetchFromUrl(apiType, authKey);
    }

    public static async fetchAPIs(apiTypes: APIType[], authKey: string, statusCallback: (str: string) => void = () => {}) {
        const responses = [];

        for (const apiType of apiTypes) {
            responses.push(await this.fetchFromUrl(apiType, authKey, statusCallback))
        }

        return responses
    }

    private static async fetchFromUrl(apiType: APIType, authKey: string, statusCallback: (str: string) => void = () => {}): Promise<HoyoAPIResponse> {
        let lastResponseEmpty = false
        let i = 2;

        statusCallback(`Fetching ${apiType.name} | Page ${1} | Number of logs found: ${0}`)
        const res = await this.fetchPageFromUrl(apiType, authKey, 1);

        //TODO: Stop fetching if returned logs are already in

        while (!lastResponseEmpty) {
            statusCallback(`Fetching ${apiType.name} | Page ${i} | Number of logs found: ${res.data.list.length}`)
            const nextPage = await this.fetchPageFromUrl(apiType, authKey, i);

            // TODO: Fix it
            //if (nextPage.data.lastUpdateTime !== res.data.lastUpdateTime) {throw new UpdateTimeChangeError()}

            const list = nextPage.data.list;
            lastResponseEmpty = list.length === 0;
            res.data.list.push(...list)

            i = i + 1
        }

        return res
    }

    private static async fetchPageFromUrl(apiType: APIType, authKey: string, page: number): Promise<HoyoAPIResponse> {
        console.log("Fetching page", page, "for", apiType.url);

        const res = await axios.post<HoyoAPIResponse>("/api/hoyoverse/importCorsProxy", {
            url: apiType.url,
            page: page,
            authkey: authKey,
            urlParams: apiType.urlParams
        })

        const data = res.data;
        if (data.retcode !== 0) {
            throw new HoyoAPIError(data, res.config.baseURL)
        }

        return data
    }
}

export class UpdateTimeChangeError extends Error {
    constructor() {
        super("The server updated while fetching the data");
        Object.setPrototypeOf(this, UpdateTimeChangeError.prototype)
    }
}

export class HoyoAPIError extends Error {
    constructor(res: HoyoAPIResponse, url: string | undefined) {
        super("Hoyoverse returned an error status: " + stringify(res) + ", for url request: " + url);
        Object.setPrototypeOf(this, UpdateTimeChangeError.prototype)
    }
}