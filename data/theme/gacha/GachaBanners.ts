import {GachaBanner} from "@/utils/entities/Gacha/GachaBanner";
import dayjs from "dayjs";
import {MaterialHistoryCalculatorFilter} from "@/utils/entities/Material/MaterialHistoryCalculator";

export const BannerHistoryFilter: MaterialHistoryCalculatorFilter = {period: {start: dayjs().add(-35, "day"), end: dayjs()}};

export const EXPABanner = new GachaBanner(
    "Expa Banner",
    100,
    1
).addCost(
    {
        idMaterial: "ExpansionSupplyCard",
        cost: 1,
        isMainCurrency: false
    }
).addCost(
    {
        idMaterial: "Crystal",
        cost: 280,
        isMainCurrency: true
    }
)