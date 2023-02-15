import {PluginFunc} from "dayjs";

export const DayTSPlugin: PluginFunc = (option, dayjsClass, dayjsFactory) => {
    dayjsClass.prototype.isBeforeAsync = async function (arguments) {

    }
}