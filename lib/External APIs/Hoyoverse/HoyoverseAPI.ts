import axios from "axios";
import {FetchHoyoCrystalLogRes, HoyoCrystalLogData} from "@/utils/types/api/hoyoverse/FetchHoyoCrystalLogRes";
import {stringify} from "json5";
import {HoyoAPIResponse} from "@/lib/External APIs/Hoyoverse/HoyoAPIResponse";
import {APIType} from "@/lib/External APIs/Hoyoverse/MaterialHistoryConverters";

export class HoyoverseAPI {
    public static fetchAPI(apiType: APIType, authKey: string) {
        return this.fetchFromUrl(apiType.url, authKey);
    }

    public static async fetchAPIs(apiTypes: APIType[], authKey: string) {
        return Promise.all(apiTypes.map(value => this.fetchAPI(value, authKey)));
    }

    public static async fetchCrystalLogs(authKey: string): Promise<HoyoAPIResponse> {
        return this.fetchFromUrl("GetUserHCoin", authKey);
    }

    public static async fetchCrystalLogsOld(authKey: string): Promise<HoyoCrystalLogData> {
        let lastResponseEmpty = false
        let i = 2;

        //TODO: Check if the update time change while fetching
        const res = (await this.fetchCrystalsLogPage(1, authKey)).data

        while (!lastResponseEmpty) {
            const data = await this.fetchCrystalsLogPage(i, authKey);
            const list = data.data.list;
            lastResponseEmpty = list.length === 0;
            res.list.push(...list)

            i = i + 1
        }

        return res
    }

    private static async fetchCrystalsLogPage(page: number, authKey: string) {
        const url = this.getCrystalAPIUrl(authKey, page);
        console.log("Sending Request to:", url)
        const res = await axios.get<FetchHoyoCrystalLogRes>(url);

        const fetchHoyoCrystalRes = res.data;
        if (fetchHoyoCrystalRes.retcode !== 0) {
            throw new Error("Hoyoverse returned an error status: " + stringify(fetchHoyoCrystalRes))
        }

        return fetchHoyoCrystalRes
    }

    private static async fetchFromUrl(apiName: string, authKey: string): Promise<HoyoAPIResponse> {
        let lastResponseEmpty = false
        let i = 2;

        //TODO: Check if the update time change while fetching
        const res = await this.fetchPageFromUrl(apiName, authKey, 1)

        while (!lastResponseEmpty) {
            const nextPage = await this.fetchPageFromUrl(apiName, authKey, i);
            const list = nextPage.data.list;
            lastResponseEmpty = list.length === 0;
            res.data.list.push(...list)

            i = i + 1
        }

        return res
    }

    private static async fetchPageFromUrl(apiName: string, authKey: string, page: number): Promise<HoyoAPIResponse> {
        const url = this.urlBuilder(apiName, authKey, page);
        const res = await axios.get<HoyoAPIResponse>(url).then(value => value.data);

        if (res.retcode !== 0) {
            throw new Error("Hoyoverse returned an error status: " + stringify(res))
        }

        return res
    }

    private static getCrystalAPIUrl(authKey: string, page: number): string {
        return `https://sg-public-api.hoyoverse.com/common/bh3_self_help_query/UserMaterialQuery/GetUserHCoin?authkey_ver=1&sign_type=2&pageSize=20&page=${page}&authkey=${encodeURIComponent(authKey)}`
    }

    private static urlBuilder(apiName: string, authKey: string, page: number) {
        return `https://sg-public-api.hoyoverse.com/common/bh3_self_help_query/UserMaterialQuery/${apiName}?authkey_ver=1&sign_type=2&pageSize=20&page=${page}&authkey=${encodeURIComponent(authKey)}`
    }
}