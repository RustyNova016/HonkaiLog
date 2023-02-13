import axios from "axios";
import {FetchHoyoCrystalLogRes, HoyoCrystalLogData} from "@/utils/types/api/hoyoverse/FetchHoyoCrystalLogRes";
import {stringify} from "json5";

export class HoyoverseAPI {
    public static async fetchCrystalLogs(authKey: string): Promise<HoyoCrystalLogData> {
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

    private static getCrystalAPIUrl(authKey: string, page: number): string {
        return `https://sg-public-api.hoyoverse.com/common/bh3_self_help_query/UserMaterialQuery/GetUserHCoin?authkey_ver=1&sign_type=2&pageSize=20&page=${page}&authkey=${encodeURIComponent(authKey)}`
    }
}