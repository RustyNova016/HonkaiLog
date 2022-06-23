import axios from "axios";

export async function fetcher<T>(key: string): Promise<T> {
    return await axios.get(key).then((res) => res.data).catch((e) => {
        console.log(e)
        throw e;
    });
}
