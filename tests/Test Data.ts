// Generate a test IMaterialCountAPIResponse object
import {MaterialLogsAPIFetchResponse} from "../pages/api/material/logs/[id]";
import {MaterialLogItemJSON} from "../database/material_log";
import {TimeTools} from "../utils/TimeTools";

export const TestMaterialCountAPIResponse: MaterialLogsAPIFetchResponse = {
    createdAt: "2020-01-01T00:00:00.000Z",
    id: 1,
    name: "Test Material",
    updatedAt: "2020-01-01T00:00:00.000Z",
    Material_logs: [
        {
            createdAt: "2020-01-01T00:00:00.000Z",
            id: 1,
            materialId: 1,
            count: 1,
            updatedAt: "2020-01-01T00:00:00.000Z",
            log_date: "2020-01-01T00:00:00.000Z",
            userId: 1
        },
        {
            createdAt: "2020-01-01T00:00:00.000Z",
            id: 2,
            materialId: 1,
            count: 2,
            updatedAt: "2020-01-01T00:00:00.000Z",
            log_date: "2020-01-01T00:01:00.000Z",
            userId: 1
        }
    ]
}

export const TestMaterialCountAPIResponse_NoLogs: MaterialLogsAPIFetchResponse = {
    createdAt: "2020-01-01T00:00:00.000Z",
    id: 1,
    name: "Test Material 2",
    updatedAt: "2020-01-01T00:00:00.000Z",
    Material_logs: []
}

export const TestMaterialLogAPIResponse_bigger: MaterialLogsAPIFetchResponse = {
    createdAt: "2020-01-01T00:00:00.000Z",
    id: 1,
    name: "Test Material",
    updatedAt: "2020-01-01T00:00:00.000Z",
    Material_logs: [
        generateFakeLog(100, 1),
        generateFakeLog(200, 2),
        generateFakeLog(250, 3),
        generateFakeLog(400, 4)
    ]
}

export function generateFakeLog(count: number, day: number): MaterialLogItemJSON {
    const logDate = TimeTools.addDaysToDay(new Date("2020-01-01T00:00:00.000Z"), day).toISOString();

    return {
        id: 1,
        count: count,
        userId: 1,
        materialId: 1,
        log_date: logDate,
        updatedAt: logDate,
        createdAt: logDate,
    }
}