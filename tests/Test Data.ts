// Generate a test IMaterialCountAPIResponse object
import {IMaterialLogsAPIResponse} from "../pages/api/material/logs/[id]";

export const TestMaterialCountAPIResponse: IMaterialLogsAPIResponse = {
    createdAt: "2020-01-01T00:00:00.000Z",
    id: 1,
    name: "Test Material",
    updatedAt: "2020-01-01T00:00:00.000Z",
    materialLogsResponce: [
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

export const TestMaterialCountAPIResponse_NoLogs: IMaterialLogsAPIResponse = {
    createdAt: "2020-01-01T00:00:00.000Z",
    id: 1,
    name: "Test Material 2",
    updatedAt: "2020-01-01T00:00:00.000Z",
    materialLogsResponce: []
}

export const TestMaterialCountAPIResponse_bigger: IMaterialLogsAPIResponse = {
    createdAt: "2020-01-01T00:00:00.000Z",
    id: 1,
    name: "Test Material",
    updatedAt: "2020-01-01T00:00:00.000Z",
    materialLogsResponce: [
        {
            createdAt: "2020-01-01T00:00:00.000Z",
            id: 1,
            materialId: 1,
            count: 100,
            updatedAt: "2020-01-01T00:00:00.000Z",
            log_date: "2020-01-01T00:00:00.000Z",
            userId: 1
        },
        {
            createdAt: "2020-01-01T00:00:00.000Z",
            id: 2,
            materialId: 1,
            count: 200,
            updatedAt: "2020-01-05T00:00:00.000Z",
            log_date: "2020-01-02T00:00:00.000Z",
            userId: 1
        },
        {
            createdAt: "2020-01-01T00:00:00.000Z",
            id: 3,
            materialId: 1,
            count: 250,
            updatedAt: "2020-01-05T00:00:00.000Z",
            log_date: "2020-01-03T00:00:00.000Z",
            userId: 1
        },
        {
            createdAt: "2020-01-01T00:00:00.000Z",
            id: 3,
            materialId: 1,
            count: 400,
            updatedAt: "2020-01-06T00:00:00.000Z",
            log_date: "2020-01-04T00:00:00.000Z",
            userId: 1
        }
    ]
}