// Generate a test IMaterialCountAPIResponse object
import {IMaterialCountAPIResponse} from "../pages/api/material/logs/[id]";

export const TestMaterialCountAPIResponse: IMaterialCountAPIResponse = {
    createdAt: "2020-01-01T00:00:00.000Z",
    id: 1,
    name: "Test Material",
    updatedAt: "2020-01-01T00:00:00.000Z",
    materialLogs: [
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

export const TestMaterialCountAPIResponse_NoLogs: IMaterialCountAPIResponse = {
    createdAt: "2020-01-01T00:00:00.000Z",
    id: 1,
    name: "Test Material 2",
    updatedAt: "2020-01-01T00:00:00.000Z",
    materialLogs: []
}