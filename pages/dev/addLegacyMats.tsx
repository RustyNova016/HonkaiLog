import {NextApiRequest, NextApiResponse} from "next";
import {addLegacyData} from "../../tools/Database/legacyMigration";

export default function addLegacyMats() {
    addLegacyData()

    return <>Lol</>
}