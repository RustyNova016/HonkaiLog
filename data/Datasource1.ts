interface PrismaMaterialLogCreate {
    idMaterial: number;
    idUser: string;
    loggedAt: string | Date | undefined;
    quantity: number;
}

interface honkaiLogv1MaterialLog {
    id_material: string
    id_user: string,
    quantity: string,
    time_stamp: string,
}

export function convertHonkaiLogv1Datasource(item: honkaiLogv1MaterialLog): null | PrismaMaterialLogCreate {
    let idMat: number;
    if (item.id_material === "1") {
        idMat = 1
    } else {
        return null
    }

    let idUser: string;
    if (item.id_user === "2") {
        idUser = "clbi86bpc0000z3v86fmco1nl"
    } else {
        return null
    }

    return {
        quantity: parseInt(item.quantity),
        loggedAt: new Date(item.time_stamp),
        idMaterial: idMat,
        idUser: idUser
    }
}

export const honkaiLogV1Data = [
    {
        "id_log": "1",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4032",
        "libchange": "",
        "time_stamp": "2021-03-06 00:11:13"
    },
    {
        "id_log": "3",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4047",
        "libchange": "HoS tuto 1",
        "time_stamp": "2021-03-06 00:22:59"
    },
    {
        "id_log": "4",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4062",
        "libchange": "tuto2",
        "time_stamp": "2021-03-06 00:26:24"
    },
    {
        "id_log": "5",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4077",
        "libchange": "",
        "time_stamp": "2021-03-06 00:28:00"
    },
    {
        "id_log": "6",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4092",
        "libchange": "",
        "time_stamp": "2021-03-06 00:30:17"
    },
    {
        "id_log": "7",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4107",
        "libchange": "",
        "time_stamp": "2021-03-06 00:32:07"
    },
    {
        "id_log": "8",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4152",
        "libchange": "",
        "time_stamp": "2021-03-06 00:32:24"
    },
    {
        "id_log": "9",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4167",
        "libchange": "",
        "time_stamp": "2021-03-06 00:56:52"
    },
    {
        "id_log": "10",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4187",
        "libchange": "",
        "time_stamp": "2021-03-06 00:57:11"
    },
    {
        "id_log": "11",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4187",
        "libchange": "",
        "time_stamp": "2021-03-06 15:46:37"
    },
    {
        "id_log": "12",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4237",
        "libchange": "daily log\r\n",
        "time_stamp": "2021-03-06 15:47:17"
    },
    {
        "id_log": "13",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4247",
        "libchange": "",
        "time_stamp": "2021-03-06 15:50:03"
    },
    {
        "id_log": "14",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4352",
        "libchange": "",
        "time_stamp": "2021-03-06 16:21:41"
    },
    {
        "id_log": "15",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4032",
        "libchange": "First entry",
        "time_stamp": "2021-03-01 00:00:00"
    },
    {
        "id_log": "16",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4362",
        "libchange": "",
        "time_stamp": "2021-03-06 18:28:12"
    },
    {
        "id_log": "17",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4382",
        "libchange": "",
        "time_stamp": "2021-03-06 18:34:09"
    },
    {
        "id_log": "18",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4482",
        "libchange": "",
        "time_stamp": "2021-03-06 18:37:19"
    },
    {
        "id_log": "19",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30905270",
        "libchange": "",
        "time_stamp": "2021-03-06 19:02:58"
    },
    {
        "id_log": "20",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2137006",
        "libchange": "",
        "time_stamp": "2021-03-06 19:09:48"
    },
    {
        "id_log": "21",
        "id_user": "2",
        "id_material": "4",
        "quantity": "129586",
        "libchange": "",
        "time_stamp": "2021-03-06 19:18:03"
    },
    {
        "id_log": "22",
        "id_user": "2",
        "id_material": "5",
        "quantity": "571",
        "libchange": "",
        "time_stamp": "2021-03-06 21:07:30"
    },
    {
        "id_log": "23",
        "id_user": "2",
        "id_material": "6",
        "quantity": "131",
        "libchange": "",
        "time_stamp": "2021-03-06 21:07:44"
    },
    {
        "id_log": "24",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4497",
        "libchange": "",
        "time_stamp": "2021-03-06 21:15:38"
    },
    {
        "id_log": "25",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30911209",
        "libchange": "",
        "time_stamp": "2021-03-06 21:18:12"
    },
    {
        "id_log": "26",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30867569",
        "libchange": "",
        "time_stamp": "2021-03-06 21:19:09"
    },
    {
        "id_log": "27",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30730529",
        "libchange": "",
        "time_stamp": "2021-03-06 21:20:48"
    },
    {
        "id_log": "28",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2137806",
        "libchange": "",
        "time_stamp": "2021-03-06 21:21:44"
    },
    {
        "id_log": "29",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2129006",
        "libchange": "",
        "time_stamp": "2021-03-06 21:22:28"
    },
    {
        "id_log": "30",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30683169",
        "libchange": "",
        "time_stamp": "2021-03-06 21:23:11"
    },
    {
        "id_log": "31",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30786949",
        "libchange": "",
        "time_stamp": "2021-03-06 21:32:24"
    },
    {
        "id_log": "32",
        "id_user": "2",
        "id_material": "4",
        "quantity": "129586",
        "libchange": "",
        "time_stamp": "2021-03-06 21:33:34"
    },
    {
        "id_log": "33",
        "id_user": "2",
        "id_material": "8",
        "quantity": "2577",
        "libchange": "",
        "time_stamp": "2021-03-06 21:47:22"
    },
    {
        "id_log": "34",
        "id_user": "2",
        "id_material": "7",
        "quantity": "1612",
        "libchange": "",
        "time_stamp": "2021-03-06 21:47:41"
    },
    {
        "id_log": "35",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30804467",
        "libchange": "",
        "time_stamp": "2021-03-06 21:48:08"
    },
    {
        "id_log": "36",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30944407",
        "libchange": "",
        "time_stamp": "2021-03-06 22:08:17"
    },
    {
        "id_log": "37",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2129006",
        "libchange": "",
        "time_stamp": "2021-03-06 22:18:18"
    },
    {
        "id_log": "38",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30945526",
        "libchange": "",
        "time_stamp": "2021-03-06 22:19:44"
    },
    {
        "id_log": "39",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4497",
        "libchange": "",
        "time_stamp": "2021-03-06 22:20:25"
    },
    {
        "id_log": "40",
        "id_user": "2",
        "id_material": "9",
        "quantity": "4395",
        "libchange": "",
        "time_stamp": "2021-03-06 22:26:27"
    },
    {
        "id_log": "41",
        "id_user": "2",
        "id_material": "9",
        "quantity": "4275",
        "libchange": "",
        "time_stamp": "2021-03-06 22:27:19"
    },
    {
        "id_log": "42",
        "id_user": "2",
        "id_material": "9",
        "quantity": "4290",
        "libchange": "",
        "time_stamp": "2021-03-06 22:27:26"
    },
    {
        "id_log": "43",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4547",
        "libchange": "",
        "time_stamp": "2021-03-06 22:32:55"
    },
    {
        "id_log": "44",
        "id_user": "2",
        "id_material": "5",
        "quantity": "586",
        "libchange": "",
        "time_stamp": "2021-03-06 22:33:42"
    },
    {
        "id_log": "45",
        "id_user": "2",
        "id_material": "6",
        "quantity": "131",
        "libchange": "",
        "time_stamp": "2021-03-06 22:33:51"
    },
    {
        "id_log": "46",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4587",
        "libchange": "",
        "time_stamp": "2021-03-06 23:46:06"
    },
    {
        "id_log": "47",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4687",
        "libchange": "",
        "time_stamp": "2021-03-06 23:47:10"
    },
    {
        "id_log": "48",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4712",
        "libchange": "",
        "time_stamp": "2021-03-06 23:53:54"
    },
    {
        "id_log": "49",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30783401",
        "libchange": "",
        "time_stamp": "2021-03-06 23:55:09"
    },
    {
        "id_log": "50",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4732",
        "libchange": "",
        "time_stamp": "2021-03-06 23:59:14"
    },
    {
        "id_log": "51",
        "id_user": "2",
        "id_material": "7",
        "quantity": "1976",
        "libchange": "",
        "time_stamp": "2021-03-07 13:21:57"
    },
    {
        "id_log": "52",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4737",
        "libchange": "",
        "time_stamp": "2021-03-07 13:22:44"
    },
    {
        "id_log": "53",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4747",
        "libchange": "",
        "time_stamp": "2021-03-07 13:23:49"
    },
    {
        "id_log": "54",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30951351",
        "libchange": "",
        "time_stamp": "2021-03-07 13:25:24"
    },
    {
        "id_log": "55",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4827",
        "libchange": "",
        "time_stamp": "2021-03-07 13:36:02"
    },
    {
        "id_log": "56",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2130586",
        "libchange": "",
        "time_stamp": "2021-03-07 13:48:47"
    },
    {
        "id_log": "57",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30953151",
        "libchange": "",
        "time_stamp": "2021-03-07 13:49:16"
    },
    {
        "id_log": "58",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30150375",
        "libchange": "",
        "time_stamp": "2021-03-07 13:50:32"
    },
    {
        "id_log": "59",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30300375",
        "libchange": "",
        "time_stamp": "2021-03-07 13:51:25"
    },
    {
        "id_log": "60",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4827",
        "libchange": "",
        "time_stamp": "2021-03-07 15:10:42"
    },
    {
        "id_log": "61",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4827",
        "libchange": "",
        "time_stamp": "2021-03-07 15:13:26"
    },
    {
        "id_log": "62",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4842",
        "libchange": "",
        "time_stamp": "2021-03-07 15:44:38"
    },
    {
        "id_log": "63",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4852",
        "libchange": "",
        "time_stamp": "2021-03-07 15:48:32"
    },
    {
        "id_log": "64",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30593335",
        "libchange": "",
        "time_stamp": "2021-03-07 19:06:05"
    },
    {
        "id_log": "65",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4852",
        "libchange": "",
        "time_stamp": "2021-03-07 23:22:58"
    },
    {
        "id_log": "66",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30597925",
        "libchange": "",
        "time_stamp": "2021-03-07 23:30:26"
    },
    {
        "id_log": "67",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2087866",
        "libchange": "",
        "time_stamp": "2021-03-07 23:38:12"
    },
    {
        "id_log": "68",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30073013",
        "libchange": "",
        "time_stamp": "2021-03-01 23:39:48"
    },
    {
        "id_log": "69",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4867",
        "libchange": "",
        "time_stamp": "2021-03-07 23:49:03"
    },
    {
        "id_log": "70",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4882",
        "libchange": "",
        "time_stamp": "2021-03-07 23:50:59"
    },
    {
        "id_log": "71",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4897",
        "libchange": "",
        "time_stamp": "2021-03-07 23:51:15"
    },
    {
        "id_log": "72",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4897",
        "libchange": "",
        "time_stamp": "2021-03-08 00:18:47"
    },
    {
        "id_log": "73",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4897",
        "libchange": "",
        "time_stamp": "2021-03-08 00:44:03"
    },
    {
        "id_log": "74",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5207",
        "libchange": "",
        "time_stamp": "2021-03-09 00:12:19"
    },
    {
        "id_log": "75",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5212",
        "libchange": "",
        "time_stamp": "2021-03-09 00:12:50"
    },
    {
        "id_log": "77",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5222",
        "libchange": "",
        "time_stamp": "2021-03-09 00:46:20"
    },
    {
        "id_log": "78",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5247",
        "libchange": "",
        "time_stamp": "2021-03-09 00:47:18"
    },
    {
        "id_log": "79",
        "id_user": "2",
        "id_material": "8",
        "quantity": "2756",
        "libchange": "",
        "time_stamp": "2021-03-09 00:48:12"
    },
    {
        "id_log": "80",
        "id_user": "2",
        "id_material": "7",
        "quantity": "2183",
        "libchange": "",
        "time_stamp": "2021-03-09 00:51:41"
    },
    {
        "id_log": "81",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30331443",
        "libchange": "",
        "time_stamp": "2021-03-09 00:52:25"
    },
    {
        "id_log": "82",
        "id_user": "2",
        "id_material": "2",
        "quantity": "30331443",
        "libchange": "",
        "time_stamp": "2021-03-09 00:54:01"
    },
    {
        "id_log": "83",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5247",
        "libchange": "",
        "time_stamp": "2021-03-09 15:00:10"
    },
    {
        "id_log": "84",
        "id_user": "2",
        "id_material": "7",
        "quantity": "2570",
        "libchange": "",
        "time_stamp": "2021-03-09 16:05:21"
    },
    {
        "id_log": "85",
        "id_user": "2",
        "id_material": "7",
        "quantity": "2570",
        "libchange": "",
        "time_stamp": "2021-03-09 16:05:29"
    },
    {
        "id_log": "86",
        "id_user": "2",
        "id_material": "7",
        "quantity": "2570",
        "libchange": "",
        "time_stamp": "2021-03-09 16:05:35"
    },
    {
        "id_log": "87",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5252",
        "libchange": "",
        "time_stamp": "2021-03-09 16:06:00"
    },
    {
        "id_log": "88",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5342",
        "libchange": "",
        "time_stamp": "2021-03-09 16:07:32"
    },
    {
        "id_log": "89",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5362",
        "libchange": "",
        "time_stamp": "2021-03-09 16:08:37"
    },
    {
        "id_log": "90",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5362",
        "libchange": "",
        "time_stamp": "2021-03-09 18:53:56"
    },
    {
        "id_log": "91",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5362",
        "libchange": "",
        "time_stamp": "2021-03-09 19:16:06"
    },
    {
        "id_log": "92",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5462",
        "libchange": "",
        "time_stamp": "2021-03-09 20:20:06"
    },
    {
        "id_log": "93",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5462",
        "libchange": "",
        "time_stamp": "2021-03-10 19:07:48"
    },
    {
        "id_log": "94",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5662",
        "libchange": "",
        "time_stamp": "2021-03-10 19:24:05"
    },
    {
        "id_log": "95",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5672",
        "libchange": "",
        "time_stamp": "2021-03-10 19:25:56"
    },
    {
        "id_log": "96",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5687",
        "libchange": "",
        "time_stamp": "2021-03-10 20:45:44"
    },
    {
        "id_log": "97",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5807",
        "libchange": "",
        "time_stamp": "2021-03-11 11:00:09"
    },
    {
        "id_log": "98",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5822",
        "libchange": "",
        "time_stamp": "2021-03-11 11:02:06"
    },
    {
        "id_log": "99",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5882",
        "libchange": "",
        "time_stamp": "2021-03-11 11:02:26"
    },
    {
        "id_log": "100",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4482",
        "libchange": "",
        "time_stamp": "2021-03-11 18:59:45"
    },
    {
        "id_log": "101",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4202",
        "libchange": "",
        "time_stamp": "2021-03-11 19:06:39"
    },
    {
        "id_log": "103",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2",
        "libchange": "",
        "time_stamp": "2021-03-11 23:00:00"
    },
    {
        "id_log": "105",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7",
        "libchange": "",
        "time_stamp": "2021-03-12 18:17:30"
    },
    {
        "id_log": "106",
        "id_user": "2",
        "id_material": "1",
        "quantity": "17",
        "libchange": "",
        "time_stamp": "2021-03-12 21:01:56"
    },
    {
        "id_log": "107",
        "id_user": "2",
        "id_material": "1",
        "quantity": "217",
        "libchange": "",
        "time_stamp": "2021-03-12 21:21:53"
    },
    {
        "id_log": "108",
        "id_user": "2",
        "id_material": "1",
        "quantity": "227",
        "libchange": "",
        "time_stamp": "2021-03-12 21:22:13"
    },
    {
        "id_log": "109",
        "id_user": "2",
        "id_material": "1",
        "quantity": "287",
        "libchange": "",
        "time_stamp": "2021-03-12 21:29:38"
    },
    {
        "id_log": "110",
        "id_user": "2",
        "id_material": "1",
        "quantity": "302",
        "libchange": "",
        "time_stamp": "2021-03-12 21:30:20"
    },
    {
        "id_log": "112",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22",
        "libchange": "",
        "time_stamp": "2021-03-12 22:17:04"
    },
    {
        "id_log": "113",
        "id_user": "2",
        "id_material": "1",
        "quantity": "87",
        "libchange": "",
        "time_stamp": "2021-03-13 17:16:56"
    },
    {
        "id_log": "114",
        "id_user": "2",
        "id_material": "1",
        "quantity": "92",
        "libchange": "",
        "time_stamp": "2021-03-14 14:56:24"
    },
    {
        "id_log": "115",
        "id_user": "2",
        "id_material": "1",
        "quantity": "92",
        "libchange": "",
        "time_stamp": "2021-03-14 14:56:54"
    },
    {
        "id_log": "116",
        "id_user": "2",
        "id_material": "1",
        "quantity": "92",
        "libchange": "",
        "time_stamp": "2021-03-14 14:57:05"
    },
    {
        "id_log": "117",
        "id_user": "2",
        "id_material": "1",
        "quantity": "92",
        "libchange": "",
        "time_stamp": "2021-03-14 14:57:13"
    },
    {
        "id_log": "118",
        "id_user": "2",
        "id_material": "1",
        "quantity": "102",
        "libchange": "",
        "time_stamp": "2021-03-14 15:00:33"
    },
    {
        "id_log": "119",
        "id_user": "2",
        "id_material": "1",
        "quantity": "102",
        "libchange": "",
        "time_stamp": "2021-03-14 15:34:13"
    },
    {
        "id_log": "120",
        "id_user": "2",
        "id_material": "1",
        "quantity": "112",
        "libchange": "",
        "time_stamp": "2021-03-14 16:11:43"
    },
    {
        "id_log": "121",
        "id_user": "2",
        "id_material": "1",
        "quantity": "242",
        "libchange": "",
        "time_stamp": "2021-03-16 16:18:48"
    },
    {
        "id_log": "122",
        "id_user": "2",
        "id_material": "1",
        "quantity": "382",
        "libchange": "",
        "time_stamp": "2021-03-17 10:10:16"
    },
    {
        "id_log": "123",
        "id_user": "2",
        "id_material": "1",
        "quantity": "397",
        "libchange": "",
        "time_stamp": "2021-03-17 20:27:24"
    },
    {
        "id_log": "124",
        "id_user": "2",
        "id_material": "1",
        "quantity": "672",
        "libchange": "",
        "time_stamp": "2021-03-18 11:08:08"
    },
    {
        "id_log": "125",
        "id_user": "2",
        "id_material": "1",
        "quantity": "697",
        "libchange": "",
        "time_stamp": "2021-03-18 20:56:00"
    },
    {
        "id_log": "126",
        "id_user": "2",
        "id_material": "1",
        "quantity": "840",
        "libchange": "",
        "time_stamp": "2021-03-19 13:43:18"
    },
    {
        "id_log": "127",
        "id_user": "2",
        "id_material": "1",
        "quantity": "850",
        "libchange": "",
        "time_stamp": "2021-03-19 13:46:26"
    },
    {
        "id_log": "128",
        "id_user": "2",
        "id_material": "1",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-01-01 00:00:00"
    },
    {
        "id_log": "129",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1215",
        "libchange": "",
        "time_stamp": "2021-03-23 00:48:53"
    },
    {
        "id_log": "130",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1215",
        "libchange": "",
        "time_stamp": "2021-03-23 00:48:58"
    },
    {
        "id_log": "131",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1340",
        "libchange": "",
        "time_stamp": "2021-03-23 00:51:13"
    },
    {
        "id_log": "132",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1060",
        "libchange": "",
        "time_stamp": "2021-03-23 08:19:14"
    },
    {
        "id_log": "133",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1095",
        "libchange": "",
        "time_stamp": "2021-03-23 08:19:28"
    },
    {
        "id_log": "134",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1180",
        "libchange": "",
        "time_stamp": "2021-03-23 18:37:03"
    },
    {
        "id_log": "135",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1220",
        "libchange": "",
        "time_stamp": "2021-03-23 22:03:33"
    },
    {
        "id_log": "136",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1533",
        "libchange": "",
        "time_stamp": "2021-03-25 10:52:40"
    },
    {
        "id_log": "137",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1558",
        "libchange": "",
        "time_stamp": "2021-03-28 01:10:00"
    },
    {
        "id_log": "138",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1563",
        "libchange": "",
        "time_stamp": "2021-03-28 01:10:30"
    },
    {
        "id_log": "139",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1651",
        "libchange": "",
        "time_stamp": "2021-03-28 01:21:38"
    },
    {
        "id_log": "140",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1656",
        "libchange": "",
        "time_stamp": "2021-03-28 15:18:10"
    },
    {
        "id_log": "141",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1716",
        "libchange": "",
        "time_stamp": "2021-03-28 15:21:23"
    },
    {
        "id_log": "142",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1721",
        "libchange": "",
        "time_stamp": "2021-03-28 15:27:33"
    },
    {
        "id_log": "143",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1781",
        "libchange": "",
        "time_stamp": "2021-03-28 15:31:11"
    },
    {
        "id_log": "144",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1981",
        "libchange": "",
        "time_stamp": "2021-03-28 22:50:14"
    },
    {
        "id_log": "145",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2176",
        "libchange": "",
        "time_stamp": "2021-03-29 19:10:45"
    },
    {
        "id_log": "146",
        "id_user": "2",
        "id_material": "6",
        "quantity": "99",
        "libchange": null,
        "time_stamp": "2021-03-29 20:08:39"
    },
    {
        "id_log": "147",
        "id_user": "2",
        "id_material": "5",
        "quantity": "582",
        "libchange": null,
        "time_stamp": "2021-03-29 20:08:39"
    },
    {
        "id_log": "148",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2191",
        "libchange": "",
        "time_stamp": "2021-03-29 20:10:17"
    },
    {
        "id_log": "149",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2256",
        "libchange": "",
        "time_stamp": "2021-03-30 16:51:15"
    },
    {
        "id_log": "150",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2271",
        "libchange": "",
        "time_stamp": "2021-03-31 00:51:15"
    },
    {
        "id_log": "151",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2311",
        "libchange": "",
        "time_stamp": "2021-03-31 10:10:54"
    },
    {
        "id_log": "152",
        "id_user": "2",
        "id_material": "8",
        "quantity": "6361",
        "libchange": "",
        "time_stamp": "2021-03-31 13:28:55"
    },
    {
        "id_log": "153",
        "id_user": "2",
        "id_material": "6",
        "quantity": "99",
        "libchange": "",
        "time_stamp": "2021-03-31 14:49:16"
    },
    {
        "id_log": "154",
        "id_user": "2",
        "id_material": "5",
        "quantity": "498",
        "libchange": "",
        "time_stamp": "2021-03-31 14:59:21"
    },
    {
        "id_log": "155",
        "id_user": "2",
        "id_material": "5",
        "quantity": "0",
        "libchange": null,
        "time_stamp": "2021-03-01 00:00:00"
    },
    {
        "id_log": "156",
        "id_user": "2",
        "id_material": "9",
        "quantity": "4751",
        "libchange": "",
        "time_stamp": "2021-03-31 15:24:50"
    },
    {
        "id_log": "157",
        "id_user": "2",
        "id_material": "8",
        "quantity": "3850",
        "libchange": "",
        "time_stamp": "2021-03-31 15:25:23"
    },
    {
        "id_log": "158",
        "id_user": "2",
        "id_material": "4",
        "quantity": "155847",
        "libchange": "",
        "time_stamp": "2021-03-31 15:26:10"
    },
    {
        "id_log": "159",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2225639",
        "libchange": "",
        "time_stamp": "2021-03-31 15:26:29"
    },
    {
        "id_log": "160",
        "id_user": "2",
        "id_material": "7",
        "quantity": "6361",
        "libchange": "",
        "time_stamp": "2021-03-31 15:27:01"
    },
    {
        "id_log": "161",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2311",
        "libchange": "",
        "time_stamp": "2021-03-31 18:42:52"
    },
    {
        "id_log": "162",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2371",
        "libchange": "",
        "time_stamp": "2021-03-31 18:55:30"
    },
    {
        "id_log": "163",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2646",
        "libchange": "",
        "time_stamp": "2021-04-01 00:07:36"
    },
    {
        "id_log": "164",
        "id_user": "2",
        "id_material": "7",
        "quantity": "6618",
        "libchange": "",
        "time_stamp": "2021-04-01 00:17:01"
    },
    {
        "id_log": "165",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2746",
        "libchange": "",
        "time_stamp": "2021-04-01 00:19:08"
    },
    {
        "id_log": "166",
        "id_user": "2",
        "id_material": "8",
        "quantity": "3880",
        "libchange": "",
        "time_stamp": "2021-04-01 00:33:14"
    },
    {
        "id_log": "167",
        "id_user": "2",
        "id_material": "8",
        "quantity": "3970",
        "libchange": "",
        "time_stamp": "2021-04-01 00:36:52"
    },
    {
        "id_log": "168",
        "id_user": "2",
        "id_material": "17",
        "quantity": "0",
        "libchange": null,
        "time_stamp": "2020-03-01 00:00:00"
    },
    {
        "id_log": "169",
        "id_user": "2",
        "id_material": "19",
        "quantity": "0",
        "libchange": null,
        "time_stamp": "2020-03-01 00:00:00"
    },
    {
        "id_log": "170",
        "id_user": "2",
        "id_material": "18",
        "quantity": "0",
        "libchange": null,
        "time_stamp": "2020-03-01 00:00:00"
    },
    {
        "id_log": "171",
        "id_user": "2",
        "id_material": "16",
        "quantity": "0",
        "libchange": null,
        "time_stamp": "2020-03-01 00:00:00"
    },
    {
        "id_log": "172",
        "id_user": "2",
        "id_material": "18",
        "quantity": "761",
        "libchange": "",
        "time_stamp": "2021-04-01 00:44:08"
    },
    {
        "id_log": "173",
        "id_user": "2",
        "id_material": "19",
        "quantity": "811",
        "libchange": "",
        "time_stamp": "2021-04-01 00:44:25"
    },
    {
        "id_log": "174",
        "id_user": "2",
        "id_material": "17",
        "quantity": "2521",
        "libchange": "",
        "time_stamp": "2021-04-01 00:44:36"
    },
    {
        "id_log": "175",
        "id_user": "2",
        "id_material": "16",
        "quantity": "695",
        "libchange": "",
        "time_stamp": "2021-04-01 00:44:47"
    },
    {
        "id_log": "176",
        "id_user": "2",
        "id_material": "2",
        "quantity": "34892512",
        "libchange": "",
        "time_stamp": "2021-04-01 00:47:25"
    },
    {
        "id_log": "177",
        "id_user": "2",
        "id_material": "2",
        "quantity": "0",
        "libchange": null,
        "time_stamp": "2020-03-01 00:00:00"
    },
    {
        "id_log": "178",
        "id_user": "2",
        "id_material": "2",
        "quantity": "34892512",
        "libchange": "",
        "time_stamp": "2021-04-01 00:48:17"
    },
    {
        "id_log": "179",
        "id_user": "2",
        "id_material": "1",
        "quantity": "0",
        "libchange": null,
        "time_stamp": "2020-03-01 00:00:00"
    },
    {
        "id_log": "180",
        "id_user": "2",
        "id_material": "5",
        "quantity": "518",
        "libchange": "",
        "time_stamp": "2021-04-01 00:58:00"
    },
    {
        "id_log": "181",
        "id_user": "2",
        "id_material": "5",
        "quantity": "522",
        "libchange": "",
        "time_stamp": "2021-04-01 00:59:48"
    },
    {
        "id_log": "182",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2816",
        "libchange": "",
        "time_stamp": "2021-04-01 10:37:27"
    },
    {
        "id_log": "183",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2816",
        "libchange": "",
        "time_stamp": "2021-04-01 10:37:38"
    },
    {
        "id_log": "184",
        "id_user": "2",
        "id_material": "7",
        "quantity": "6618",
        "libchange": "",
        "time_stamp": "2021-04-01 10:47:52"
    },
    {
        "id_log": "185",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2826",
        "libchange": "",
        "time_stamp": "2021-04-01 10:48:33"
    },
    {
        "id_log": "186",
        "id_user": "2",
        "id_material": "10",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-02 13:33:56"
    },
    {
        "id_log": "188",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2225639",
        "libchange": "",
        "time_stamp": "2021-04-02 13:54:07"
    },
    {
        "id_log": "189",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2225639",
        "libchange": "",
        "time_stamp": "2021-04-02 13:54:21"
    },
    {
        "id_log": "190",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2225639",
        "libchange": "",
        "time_stamp": "2021-04-02 13:54:22"
    },
    {
        "id_log": "191",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2225639",
        "libchange": "",
        "time_stamp": "2021-04-02 13:54:23"
    },
    {
        "id_log": "192",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2225639",
        "libchange": "",
        "time_stamp": "2021-04-02 13:55:33"
    },
    {
        "id_log": "193",
        "id_user": "2",
        "id_material": "12",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-02 23:53:08"
    },
    {
        "id_log": "194",
        "id_user": "2",
        "id_material": "13",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-02 23:57:57"
    },
    {
        "id_log": "195",
        "id_user": "2",
        "id_material": "14",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-02 23:57:57"
    },
    {
        "id_log": "196",
        "id_user": "2",
        "id_material": "15",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-02 23:57:57"
    },
    {
        "id_log": "197",
        "id_user": "2",
        "id_material": "20",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 02:06:26"
    },
    {
        "id_log": "198",
        "id_user": "2",
        "id_material": "20",
        "quantity": "79",
        "libchange": "",
        "time_stamp": "2021-04-03 02:06:41"
    },
    {
        "id_log": "199",
        "id_user": "2",
        "id_material": "21",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 02:14:30"
    },
    {
        "id_log": "200",
        "id_user": "2",
        "id_material": "22",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 02:15:24"
    },
    {
        "id_log": "201",
        "id_user": "2",
        "id_material": "23",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 02:21:04"
    },
    {
        "id_log": "202",
        "id_user": "2",
        "id_material": "24",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 02:21:04"
    },
    {
        "id_log": "203",
        "id_user": "2",
        "id_material": "21",
        "quantity": "175",
        "libchange": "",
        "time_stamp": "2021-04-03 02:21:18"
    },
    {
        "id_log": "204",
        "id_user": "2",
        "id_material": "22",
        "quantity": "210",
        "libchange": "",
        "time_stamp": "2021-04-03 02:22:32"
    },
    {
        "id_log": "205",
        "id_user": "2",
        "id_material": "23",
        "quantity": "255",
        "libchange": "",
        "time_stamp": "2021-04-03 02:22:42"
    },
    {
        "id_log": "206",
        "id_user": "2",
        "id_material": "24",
        "quantity": "420",
        "libchange": "",
        "time_stamp": "2021-04-03 02:22:48"
    },
    {
        "id_log": "207",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2956",
        "libchange": "",
        "time_stamp": "2021-04-03 02:24:27"
    },
    {
        "id_log": "208",
        "id_user": "2",
        "id_material": "7",
        "quantity": "7156",
        "libchange": "",
        "time_stamp": "2021-04-03 02:59:14"
    },
    {
        "id_log": "209",
        "id_user": "2",
        "id_material": "16",
        "quantity": "682",
        "libchange": "",
        "time_stamp": "2021-04-03 03:06:34"
    },
    {
        "id_log": "210",
        "id_user": "2",
        "id_material": "16",
        "quantity": "664",
        "libchange": "",
        "time_stamp": "2021-04-03 03:07:06"
    },
    {
        "id_log": "211",
        "id_user": "2",
        "id_material": "25",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 03:14:25"
    },
    {
        "id_log": "212",
        "id_user": "2",
        "id_material": "26",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 03:14:25"
    },
    {
        "id_log": "213",
        "id_user": "2",
        "id_material": "27",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 03:14:25"
    },
    {
        "id_log": "214",
        "id_user": "2",
        "id_material": "28",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 03:14:25"
    },
    {
        "id_log": "215",
        "id_user": "2",
        "id_material": "29",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 03:14:25"
    },
    {
        "id_log": "216",
        "id_user": "2",
        "id_material": "30",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 03:14:25"
    },
    {
        "id_log": "217",
        "id_user": "2",
        "id_material": "31",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 03:14:25"
    },
    {
        "id_log": "218",
        "id_user": "2",
        "id_material": "25",
        "quantity": "10",
        "libchange": "",
        "time_stamp": "2021-04-03 03:14:41"
    },
    {
        "id_log": "219",
        "id_user": "2",
        "id_material": "26",
        "quantity": "53",
        "libchange": "",
        "time_stamp": "2021-04-03 03:14:44"
    },
    {
        "id_log": "220",
        "id_user": "2",
        "id_material": "27",
        "quantity": "2",
        "libchange": "",
        "time_stamp": "2021-04-03 03:14:49"
    },
    {
        "id_log": "221",
        "id_user": "2",
        "id_material": "28",
        "quantity": "2",
        "libchange": "",
        "time_stamp": "2021-04-03 03:14:55"
    },
    {
        "id_log": "222",
        "id_user": "2",
        "id_material": "29",
        "quantity": "27",
        "libchange": "",
        "time_stamp": "2021-04-03 03:15:02"
    },
    {
        "id_log": "223",
        "id_user": "2",
        "id_material": "30",
        "quantity": "38",
        "libchange": "",
        "time_stamp": "2021-04-03 03:15:12"
    },
    {
        "id_log": "224",
        "id_user": "2",
        "id_material": "31",
        "quantity": "40",
        "libchange": "",
        "time_stamp": "2021-04-03 03:15:17"
    },
    {
        "id_log": "225",
        "id_user": "2",
        "id_material": "32",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 03:17:55"
    },
    {
        "id_log": "226",
        "id_user": "2",
        "id_material": "32",
        "quantity": "10",
        "libchange": "",
        "time_stamp": "2021-04-03 03:18:18"
    },
    {
        "id_log": "227",
        "id_user": "2",
        "id_material": "4",
        "quantity": "163407",
        "libchange": "",
        "time_stamp": "2021-04-03 03:19:38"
    },
    {
        "id_log": "228",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2245679",
        "libchange": "",
        "time_stamp": "2021-04-03 03:23:01"
    },
    {
        "id_log": "229",
        "id_user": "2",
        "id_material": "2",
        "quantity": "35013498",
        "libchange": "",
        "time_stamp": "2021-04-03 03:25:34"
    },
    {
        "id_log": "230",
        "id_user": "2",
        "id_material": "2",
        "quantity": "34968498",
        "libchange": "",
        "time_stamp": "2021-04-03 03:26:19"
    },
    {
        "id_log": "231",
        "id_user": "2",
        "id_material": "2",
        "quantity": "34458648",
        "libchange": "",
        "time_stamp": "2021-04-03 03:27:47"
    },
    {
        "id_log": "232",
        "id_user": "2",
        "id_material": "32",
        "quantity": "4",
        "libchange": "",
        "time_stamp": "2021-04-03 03:30:18"
    },
    {
        "id_log": "233",
        "id_user": "2",
        "id_material": "26",
        "quantity": "0",
        "libchange": "",
        "time_stamp": "2021-04-03 03:30:31"
    },
    {
        "id_log": "234",
        "id_user": "2",
        "id_material": "5",
        "quantity": "563",
        "libchange": "",
        "time_stamp": "2021-04-03 03:35:49"
    },
    {
        "id_log": "235",
        "id_user": "2",
        "id_material": "9",
        "quantity": "4828",
        "libchange": "",
        "time_stamp": "2021-04-03 03:37:27"
    },
    {
        "id_log": "236",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3106",
        "libchange": "",
        "time_stamp": "2021-04-03 04:10:37"
    },
    {
        "id_log": "237",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3116",
        "libchange": "",
        "time_stamp": "2021-04-03 14:18:04"
    },
    {
        "id_log": "238",
        "id_user": "2",
        "id_material": "33",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 14:36:11"
    },
    {
        "id_log": "239",
        "id_user": "2",
        "id_material": "34",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 14:36:11"
    },
    {
        "id_log": "240",
        "id_user": "2",
        "id_material": "35",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 14:36:11"
    },
    {
        "id_log": "241",
        "id_user": "2",
        "id_material": "36",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 14:36:11"
    },
    {
        "id_log": "242",
        "id_user": "2",
        "id_material": "33",
        "quantity": "3268",
        "libchange": "",
        "time_stamp": "2021-04-03 14:37:10"
    },
    {
        "id_log": "243",
        "id_user": "2",
        "id_material": "34",
        "quantity": "277",
        "libchange": "",
        "time_stamp": "2021-04-03 14:37:25"
    },
    {
        "id_log": "244",
        "id_user": "2",
        "id_material": "35",
        "quantity": "684",
        "libchange": "",
        "time_stamp": "2021-04-03 14:37:38"
    },
    {
        "id_log": "245",
        "id_user": "2",
        "id_material": "36",
        "quantity": "43",
        "libchange": "",
        "time_stamp": "2021-04-03 14:37:46"
    },
    {
        "id_log": "246",
        "id_user": "2",
        "id_material": "37",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 14:38:23"
    },
    {
        "id_log": "247",
        "id_user": "2",
        "id_material": "37",
        "quantity": "64",
        "libchange": "",
        "time_stamp": "2021-04-03 14:38:32"
    },
    {
        "id_log": "248",
        "id_user": "2",
        "id_material": "35",
        "quantity": "691",
        "libchange": "",
        "time_stamp": "2021-04-03 14:40:41"
    },
    {
        "id_log": "249",
        "id_user": "2",
        "id_material": "36",
        "quantity": "49",
        "libchange": "",
        "time_stamp": "2021-04-03 14:40:52"
    },
    {
        "id_log": "250",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3241",
        "libchange": "",
        "time_stamp": "2021-04-03 14:41:40"
    },
    {
        "id_log": "251",
        "id_user": "2",
        "id_material": "6",
        "quantity": "104",
        "libchange": "",
        "time_stamp": "2021-04-03 14:47:23"
    },
    {
        "id_log": "252",
        "id_user": "2",
        "id_material": "6",
        "quantity": "108",
        "libchange": "",
        "time_stamp": "2021-04-03 14:48:28"
    },
    {
        "id_log": "253",
        "id_user": "2",
        "id_material": "5",
        "quantity": "565",
        "libchange": "",
        "time_stamp": "2021-04-03 14:48:40"
    },
    {
        "id_log": "254",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3266",
        "libchange": "",
        "time_stamp": "2021-04-03 22:35:21"
    },
    {
        "id_log": "255",
        "id_user": "2",
        "id_material": "38",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 22:52:47"
    },
    {
        "id_log": "256",
        "id_user": "2",
        "id_material": "38",
        "quantity": "425",
        "libchange": "",
        "time_stamp": "2021-04-03 22:53:05"
    },
    {
        "id_log": "257",
        "id_user": "2",
        "id_material": "38",
        "quantity": "421",
        "libchange": "",
        "time_stamp": "2021-04-03 22:53:20"
    },
    {
        "id_log": "258",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2249499",
        "libchange": "",
        "time_stamp": "2021-04-03 22:53:39"
    },
    {
        "id_log": "259",
        "id_user": "2",
        "id_material": "31",
        "quantity": "41",
        "libchange": "",
        "time_stamp": "2021-04-03 23:03:52"
    },
    {
        "id_log": "260",
        "id_user": "2",
        "id_material": "16",
        "quantity": "670",
        "libchange": "",
        "time_stamp": "2021-04-03 23:04:14"
    },
    {
        "id_log": "261",
        "id_user": "2",
        "id_material": "39",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 23:08:08"
    },
    {
        "id_log": "262",
        "id_user": "2",
        "id_material": "40",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-03 23:08:08"
    },
    {
        "id_log": "263",
        "id_user": "2",
        "id_material": "40",
        "quantity": "3",
        "libchange": "",
        "time_stamp": "2021-04-03 23:08:15"
    },
    {
        "id_log": "264",
        "id_user": "2",
        "id_material": "39",
        "quantity": "3",
        "libchange": "",
        "time_stamp": "2021-04-03 23:08:19"
    },
    {
        "id_log": "265",
        "id_user": "2",
        "id_material": "40",
        "quantity": "6",
        "libchange": "",
        "time_stamp": "2021-04-03 23:08:37"
    },
    {
        "id_log": "266",
        "id_user": "2",
        "id_material": "49",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-04 00:06:23"
    },
    {
        "id_log": "267",
        "id_user": "2",
        "id_material": "49",
        "quantity": "15",
        "libchange": "",
        "time_stamp": "2021-04-04 00:06:37"
    },
    {
        "id_log": "268",
        "id_user": "2",
        "id_material": "50",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-04 00:19:32"
    },
    {
        "id_log": "269",
        "id_user": "2",
        "id_material": "51",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-04 00:19:32"
    },
    {
        "id_log": "270",
        "id_user": "2",
        "id_material": "52",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-04 00:19:32"
    },
    {
        "id_log": "271",
        "id_user": "2",
        "id_material": "53",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-04 00:19:32"
    },
    {
        "id_log": "272",
        "id_user": "2",
        "id_material": "54",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-04 00:19:32"
    },
    {
        "id_log": "273",
        "id_user": "2",
        "id_material": "55",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2020-04-04 00:19:32"
    },
    {
        "id_log": "274",
        "id_user": "2",
        "id_material": "49",
        "quantity": "15",
        "libchange": "",
        "time_stamp": "2021-04-04 00:19:32"
    },
    {
        "id_log": "275",
        "id_user": "2",
        "id_material": "50",
        "quantity": "1",
        "libchange": "",
        "time_stamp": "2021-04-04 00:19:48"
    },
    {
        "id_log": "276",
        "id_user": "2",
        "id_material": "51",
        "quantity": "18",
        "libchange": "",
        "time_stamp": "2021-04-04 00:20:04"
    },
    {
        "id_log": "277",
        "id_user": "2",
        "id_material": "52",
        "quantity": "11",
        "libchange": "",
        "time_stamp": "2021-04-04 00:20:09"
    },
    {
        "id_log": "278",
        "id_user": "2",
        "id_material": "53",
        "quantity": "111",
        "libchange": "",
        "time_stamp": "2021-04-04 00:20:19"
    },
    {
        "id_log": "279",
        "id_user": "2",
        "id_material": "54",
        "quantity": "12",
        "libchange": "",
        "time_stamp": "2021-04-04 00:20:26"
    },
    {
        "id_log": "280",
        "id_user": "2",
        "id_material": "55",
        "quantity": "10",
        "libchange": "",
        "time_stamp": "2021-04-04 00:20:33"
    },
    {
        "id_log": "281",
        "id_user": "2",
        "id_material": "49",
        "quantity": "15",
        "libchange": "",
        "time_stamp": "2021-04-04 01:05:34"
    },
    {
        "id_log": "282",
        "id_user": "2",
        "id_material": "37",
        "quantity": "248",
        "libchange": "",
        "time_stamp": "2021-04-04 14:47:15"
    },
    {
        "id_log": "283",
        "id_user": "2",
        "id_material": "7",
        "quantity": "7492",
        "libchange": "",
        "time_stamp": "2021-04-04 14:48:23"
    },
    {
        "id_log": "284",
        "id_user": "2",
        "id_material": "7",
        "quantity": "7502",
        "libchange": "",
        "time_stamp": "2021-04-04 14:51:11"
    },
    {
        "id_log": "285",
        "id_user": "2",
        "id_material": "37",
        "quantity": "148",
        "libchange": "",
        "time_stamp": "2021-04-04 14:54:14"
    },
    {
        "id_log": "286",
        "id_user": "2",
        "id_material": "37",
        "quantity": "150",
        "libchange": "",
        "time_stamp": "2021-04-04 15:05:48"
    },
    {
        "id_log": "287",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3276",
        "libchange": "",
        "time_stamp": "2021-04-04 15:06:35"
    },
    {
        "id_log": "288",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3281",
        "libchange": "",
        "time_stamp": "2021-04-04 15:13:42"
    },
    {
        "id_log": "289",
        "id_user": "2",
        "id_material": "37",
        "quantity": "112",
        "libchange": "",
        "time_stamp": "2021-04-04 15:17:44"
    },
    {
        "id_log": "290",
        "id_user": "2",
        "id_material": "16",
        "quantity": "670",
        "libchange": "",
        "time_stamp": "2021-04-04 15:18:52"
    },
    {
        "id_log": "291",
        "id_user": "2",
        "id_material": "17",
        "quantity": "2570",
        "libchange": "",
        "time_stamp": "2021-04-04 15:19:03"
    },
    {
        "id_log": "292",
        "id_user": "2",
        "id_material": "17",
        "quantity": "2581",
        "libchange": "",
        "time_stamp": "2021-04-04 15:20:30"
    },
    {
        "id_log": "293",
        "id_user": "2",
        "id_material": "16",
        "quantity": "682",
        "libchange": "",
        "time_stamp": "2021-04-04 15:20:39"
    },
    {
        "id_log": "294",
        "id_user": "2",
        "id_material": "40",
        "quantity": "8",
        "libchange": "",
        "time_stamp": "2021-04-04 15:22:12"
    },
    {
        "id_log": "295",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3291",
        "libchange": "",
        "time_stamp": "2021-04-04 15:22:29"
    },
    {
        "id_log": "296",
        "id_user": "2",
        "id_material": "37",
        "quantity": "92",
        "libchange": "",
        "time_stamp": "2021-04-04 15:23:08"
    },
    {
        "id_log": "297",
        "id_user": "2",
        "id_material": "5",
        "quantity": "565",
        "libchange": "",
        "time_stamp": "2021-04-04 15:25:52"
    },
    {
        "id_log": "298",
        "id_user": "2",
        "id_material": "6",
        "quantity": "108",
        "libchange": "",
        "time_stamp": "2021-04-04 15:25:54"
    },
    {
        "id_log": "299",
        "id_user": "2",
        "id_material": "37",
        "quantity": "93",
        "libchange": "",
        "time_stamp": "2021-04-04 15:26:25"
    },
    {
        "id_log": "300",
        "id_user": "2",
        "id_material": "7",
        "quantity": "7502",
        "libchange": "",
        "time_stamp": "2021-04-04 15:27:58"
    },
    {
        "id_log": "301",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3306",
        "libchange": "",
        "time_stamp": "2021-04-04 22:52:24"
    },
    {
        "id_log": "302",
        "id_user": "2",
        "id_material": "37",
        "quantity": "191",
        "libchange": "",
        "time_stamp": "2021-04-04 23:46:53"
    },
    {
        "id_log": "303",
        "id_user": "2",
        "id_material": "8",
        "quantity": "3315",
        "libchange": "",
        "time_stamp": "2021-04-04 23:48:19"
    },
    {
        "id_log": "304",
        "id_user": "2",
        "id_material": "31",
        "quantity": "41",
        "libchange": "",
        "time_stamp": "2021-04-05 00:10:00"
    },
    {
        "id_log": "305",
        "id_user": "2",
        "id_material": "6",
        "quantity": "108",
        "libchange": "",
        "time_stamp": "2021-04-05 00:10:22"
    },
    {
        "id_log": "306",
        "id_user": "2",
        "id_material": "6",
        "quantity": "108",
        "libchange": "",
        "time_stamp": "2021-04-05 00:10:28"
    },
    {
        "id_log": "307",
        "id_user": "2",
        "id_material": "37",
        "quantity": "191",
        "libchange": "",
        "time_stamp": "2021-04-05 01:40:02"
    },
    {
        "id_log": "308",
        "id_user": "2",
        "id_material": "6",
        "quantity": "120",
        "libchange": "",
        "time_stamp": "2021-04-05 02:12:19"
    },
    {
        "id_log": "309",
        "id_user": "2",
        "id_material": "19",
        "quantity": "821",
        "libchange": "",
        "time_stamp": "2021-04-05 02:14:59"
    },
    {
        "id_log": "310",
        "id_user": "2",
        "id_material": "18",
        "quantity": "821",
        "libchange": "",
        "time_stamp": "2021-04-05 02:20:50"
    },
    {
        "id_log": "311",
        "id_user": "2",
        "id_material": "19",
        "quantity": "811",
        "libchange": "",
        "time_stamp": "2021-04-05 02:20:57"
    },
    {
        "id_log": "312",
        "id_user": "2",
        "id_material": "2",
        "quantity": "34992293",
        "libchange": "",
        "time_stamp": "2021-04-05 02:22:30"
    },
    {
        "id_log": "313",
        "id_user": "2",
        "id_material": "2",
        "quantity": "34182293",
        "libchange": "",
        "time_stamp": "2021-04-05 02:23:02"
    },
    {
        "id_log": "314",
        "id_user": "2",
        "id_material": "2",
        "quantity": "34076193",
        "libchange": "",
        "time_stamp": "2021-04-05 02:24:07"
    },
    {
        "id_log": "315",
        "id_user": "2",
        "id_material": "2",
        "quantity": "34005493",
        "libchange": "",
        "time_stamp": "2021-04-05 02:26:33"
    },
    {
        "id_log": "316",
        "id_user": "2",
        "id_material": "2",
        "quantity": "33793293",
        "libchange": "",
        "time_stamp": "2021-04-05 02:31:12"
    },
    {
        "id_log": "317",
        "id_user": "2",
        "id_material": "16",
        "quantity": "657",
        "libchange": "",
        "time_stamp": "2021-04-05 02:43:09"
    },
    {
        "id_log": "318",
        "id_user": "2",
        "id_material": "6",
        "quantity": "122",
        "libchange": "",
        "time_stamp": "2021-04-05 02:51:51"
    },
    {
        "id_log": "319",
        "id_user": "2",
        "id_material": "37",
        "quantity": "158",
        "libchange": "",
        "time_stamp": "2021-04-05 02:53:19"
    },
    {
        "id_log": "320",
        "id_user": "2",
        "id_material": "4",
        "quantity": "161847",
        "libchange": "",
        "time_stamp": "2021-04-05 02:55:00"
    },
    {
        "id_log": "321",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2253819",
        "libchange": "",
        "time_stamp": "2021-04-05 02:55:29"
    },
    {
        "id_log": "322",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2253399",
        "libchange": "",
        "time_stamp": "2021-04-05 02:56:29"
    },
    {
        "id_log": "323",
        "id_user": "2",
        "id_material": "38",
        "quantity": "424",
        "libchange": "",
        "time_stamp": "2021-04-05 02:57:17"
    },
    {
        "id_log": "324",
        "id_user": "2",
        "id_material": "38",
        "quantity": "422",
        "libchange": "",
        "time_stamp": "2021-04-05 02:57:21"
    },
    {
        "id_log": "325",
        "id_user": "2",
        "id_material": "40",
        "quantity": "1",
        "libchange": "",
        "time_stamp": "2021-04-05 03:06:20"
    },
    {
        "id_log": "326",
        "id_user": "2",
        "id_material": "40",
        "quantity": "2",
        "libchange": "",
        "time_stamp": "2021-04-05 03:06:24"
    },
    {
        "id_log": "327",
        "id_user": "2",
        "id_material": "40",
        "quantity": "4",
        "libchange": "",
        "time_stamp": "2021-04-05 03:06:33"
    },
    {
        "id_log": "328",
        "id_user": "2",
        "id_material": "31",
        "quantity": "43",
        "libchange": "",
        "time_stamp": "2021-04-05 03:07:31"
    },
    {
        "id_log": "329",
        "id_user": "2",
        "id_material": "37",
        "quantity": "48",
        "libchange": "",
        "time_stamp": "2021-04-05 03:07:50"
    },
    {
        "id_log": "330",
        "id_user": "2",
        "id_material": "8",
        "quantity": "3435",
        "libchange": "",
        "time_stamp": "2021-04-05 03:14:37"
    },
    {
        "id_log": "331",
        "id_user": "2",
        "id_material": "37",
        "quantity": "134",
        "libchange": "",
        "time_stamp": "2021-04-05 11:47:25"
    },
    {
        "id_log": "332",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3576",
        "libchange": "",
        "time_stamp": "2021-04-05 11:48:38"
    },
    {
        "id_log": "333",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3651",
        "libchange": "",
        "time_stamp": "2021-04-05 11:52:54"
    },
    {
        "id_log": "334",
        "id_user": "2",
        "id_material": "37",
        "quantity": "85",
        "libchange": "",
        "time_stamp": "2021-04-05 11:55:24"
    },
    {
        "id_log": "335",
        "id_user": "2",
        "id_material": "37",
        "quantity": "108",
        "libchange": "",
        "time_stamp": "2021-04-05 12:00:52"
    },
    {
        "id_log": "336",
        "id_user": "2",
        "id_material": "8",
        "quantity": "3460",
        "libchange": "",
        "time_stamp": "2021-04-05 12:01:53"
    },
    {
        "id_log": "337",
        "id_user": "2",
        "id_material": "8",
        "quantity": "3580",
        "libchange": "",
        "time_stamp": "2021-04-05 12:06:40"
    },
    {
        "id_log": "338",
        "id_user": "2",
        "id_material": "7",
        "quantity": "7759",
        "libchange": "",
        "time_stamp": "2021-04-05 12:08:19"
    },
    {
        "id_log": "339",
        "id_user": "2",
        "id_material": "5",
        "quantity": "575",
        "libchange": "",
        "time_stamp": "2021-04-05 12:08:35"
    },
    {
        "id_log": "340",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 12:08:52"
    },
    {
        "id_log": "341",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:32:29"
    },
    {
        "id_log": "342",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:35:00"
    },
    {
        "id_log": "343",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:35:12"
    },
    {
        "id_log": "344",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:35:32"
    },
    {
        "id_log": "345",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:36:01"
    },
    {
        "id_log": "346",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:36:24"
    },
    {
        "id_log": "347",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:37:13"
    },
    {
        "id_log": "348",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:37:31"
    },
    {
        "id_log": "349",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:39:22"
    },
    {
        "id_log": "350",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:40:53"
    },
    {
        "id_log": "351",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:45:12"
    },
    {
        "id_log": "352",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:46:42"
    },
    {
        "id_log": "353",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:47:06"
    },
    {
        "id_log": "354",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:47:57"
    },
    {
        "id_log": "355",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:50:50"
    },
    {
        "id_log": "356",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:51:57"
    },
    {
        "id_log": "357",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:52:45"
    },
    {
        "id_log": "358",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:54:15"
    },
    {
        "id_log": "359",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:54:34"
    },
    {
        "id_log": "360",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:55:33"
    },
    {
        "id_log": "361",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:58:41"
    },
    {
        "id_log": "362",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 13:59:29"
    },
    {
        "id_log": "363",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 14:00:18"
    },
    {
        "id_log": "364",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 14:00:22"
    },
    {
        "id_log": "365",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 14:01:04"
    },
    {
        "id_log": "366",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 14:01:31"
    },
    {
        "id_log": "367",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 14:02:09"
    },
    {
        "id_log": "368",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 14:03:54"
    },
    {
        "id_log": "369",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 14:06:50"
    },
    {
        "id_log": "370",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 14:07:25"
    },
    {
        "id_log": "371",
        "id_user": "2",
        "id_material": "5",
        "quantity": "491",
        "libchange": "",
        "time_stamp": "2021-04-05 14:09:04"
    },
    {
        "id_log": "372",
        "id_user": "2",
        "id_material": "32",
        "quantity": "4",
        "libchange": "",
        "time_stamp": "2021-04-05 18:20:41"
    },
    {
        "id_log": "373",
        "id_user": "2",
        "id_material": "2",
        "quantity": "33793293",
        "libchange": "",
        "time_stamp": "2021-04-05 18:20:55"
    },
    {
        "id_log": "374",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3651",
        "libchange": "",
        "time_stamp": "2021-04-05 22:09:40"
    },
    {
        "id_log": "375",
        "id_user": "2",
        "id_material": "8",
        "quantity": "3656",
        "libchange": "",
        "time_stamp": "2021-04-05 22:10:10"
    },
    {
        "id_log": "376",
        "id_user": "2",
        "id_material": "8",
        "quantity": "3686",
        "libchange": "",
        "time_stamp": "2021-04-05 22:10:24"
    },
    {
        "id_log": "377",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3666",
        "libchange": "",
        "time_stamp": "2021-04-05 22:15:39"
    },
    {
        "id_log": "378",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3766",
        "libchange": "",
        "time_stamp": "2021-04-05 22:57:17"
    },
    {
        "id_log": "379",
        "id_user": "2",
        "id_material": "37",
        "quantity": "99",
        "libchange": "",
        "time_stamp": "2021-04-05 23:00:09"
    },
    {
        "id_log": "380",
        "id_user": "2",
        "id_material": "40",
        "quantity": "8",
        "libchange": "",
        "time_stamp": "2021-04-05 23:03:42"
    },
    {
        "id_log": "381",
        "id_user": "2",
        "id_material": "40",
        "quantity": "8",
        "libchange": "",
        "time_stamp": "2021-04-06 09:30:56"
    },
    {
        "id_log": "382",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3816",
        "libchange": "",
        "time_stamp": "2021-04-06 09:38:27"
    },
    {
        "id_log": "383",
        "id_user": "2",
        "id_material": "37",
        "quantity": "164",
        "libchange": "",
        "time_stamp": "2021-04-06 09:40:08"
    },
    {
        "id_log": "384",
        "id_user": "2",
        "id_material": "37",
        "quantity": "64",
        "libchange": "",
        "time_stamp": "2021-04-06 09:40:16"
    },
    {
        "id_log": "385",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3826",
        "libchange": "",
        "time_stamp": "2021-04-06 09:40:51"
    },
    {
        "id_log": "386",
        "id_user": "2",
        "id_material": "36",
        "quantity": "18",
        "libchange": "",
        "time_stamp": "2021-04-06 09:58:27"
    },
    {
        "id_log": "387",
        "id_user": "2",
        "id_material": "35",
        "quantity": "706",
        "libchange": "",
        "time_stamp": "2021-04-06 09:58:46"
    },
    {
        "id_log": "388",
        "id_user": "2",
        "id_material": "34",
        "quantity": "270",
        "libchange": "",
        "time_stamp": "2021-04-06 09:59:01"
    },
    {
        "id_log": "389",
        "id_user": "2",
        "id_material": "33",
        "quantity": "3324",
        "libchange": "",
        "time_stamp": "2021-04-06 09:59:11"
    },
    {
        "id_log": "390",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3856",
        "libchange": "",
        "time_stamp": "2021-04-06 10:02:38"
    },
    {
        "id_log": "391",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3881",
        "libchange": "",
        "time_stamp": "2021-04-06 10:08:07"
    },
    {
        "id_log": "392",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4091",
        "libchange": "",
        "time_stamp": "2021-04-07 13:37:58"
    },
    {
        "id_log": "393",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4096",
        "libchange": "",
        "time_stamp": "2021-04-07 13:38:28"
    },
    {
        "id_log": "394",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4106",
        "libchange": "",
        "time_stamp": "2021-04-07 13:52:33"
    },
    {
        "id_log": "395",
        "id_user": "2",
        "id_material": "5",
        "quantity": "503",
        "libchange": "",
        "time_stamp": "2021-04-07 18:47:06"
    },
    {
        "id_log": "396",
        "id_user": "2",
        "id_material": "5",
        "quantity": "523",
        "libchange": "",
        "time_stamp": "2021-04-07 18:53:36"
    },
    {
        "id_log": "397",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4161",
        "libchange": "",
        "time_stamp": "2021-04-07 18:54:54"
    },
    {
        "id_log": "398",
        "id_user": "2",
        "id_material": "5",
        "quantity": "523",
        "libchange": "",
        "time_stamp": "2021-04-07 19:13:54"
    },
    {
        "id_log": "399",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4321",
        "libchange": "",
        "time_stamp": "2021-04-08 00:40:32"
    },
    {
        "id_log": "400",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4381",
        "libchange": "",
        "time_stamp": "2021-04-08 10:34:09"
    },
    {
        "id_log": "401",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4396",
        "libchange": "",
        "time_stamp": "2021-04-08 10:40:14"
    },
    {
        "id_log": "402",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4411",
        "libchange": "",
        "time_stamp": "2021-04-08 10:42:10"
    },
    {
        "id_log": "403",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4581",
        "libchange": "",
        "time_stamp": "2021-04-08 11:17:28"
    },
    {
        "id_log": "404",
        "id_user": "2",
        "id_material": "5",
        "quantity": "544",
        "libchange": "",
        "time_stamp": "2021-04-08 11:18:09"
    },
    {
        "id_log": "405",
        "id_user": "2",
        "id_material": "5",
        "quantity": "564",
        "libchange": "",
        "time_stamp": "2021-04-08 11:20:11"
    },
    {
        "id_log": "406",
        "id_user": "2",
        "id_material": "5",
        "quantity": "568",
        "libchange": "",
        "time_stamp": "2021-04-08 11:22:24"
    },
    {
        "id_log": "407",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4586",
        "libchange": "",
        "time_stamp": "2021-04-09 10:24:17"
    },
    {
        "id_log": "408",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4596",
        "libchange": "",
        "time_stamp": "2021-04-09 10:25:46"
    },
    {
        "id_log": "409",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4621",
        "libchange": "",
        "time_stamp": "2021-04-09 10:31:43"
    },
    {
        "id_log": "410",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4741",
        "libchange": "",
        "time_stamp": "2021-04-09 21:41:22"
    },
    {
        "id_log": "411",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4751",
        "libchange": "",
        "time_stamp": "2021-04-10 13:23:53"
    },
    {
        "id_log": "412",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4756",
        "libchange": "",
        "time_stamp": "2021-04-10 13:30:24"
    },
    {
        "id_log": "413",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4781",
        "libchange": "",
        "time_stamp": "2021-04-10 13:38:23"
    },
    {
        "id_log": "414",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4981",
        "libchange": "",
        "time_stamp": "2021-04-10 13:58:11"
    },
    {
        "id_log": "415",
        "id_user": "2",
        "id_material": "6",
        "quantity": "127",
        "libchange": "",
        "time_stamp": "2021-04-10 13:59:44"
    },
    {
        "id_log": "416",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2321995",
        "libchange": "",
        "time_stamp": "2021-04-10 14:59:19"
    },
    {
        "id_log": "417",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2301995",
        "libchange": "",
        "time_stamp": "2021-04-10 14:59:40"
    },
    {
        "id_log": "418",
        "id_user": "2",
        "id_material": "40",
        "quantity": "10",
        "libchange": "",
        "time_stamp": "2021-04-10 15:05:21"
    },
    {
        "id_log": "419",
        "id_user": "2",
        "id_material": "40",
        "quantity": "8",
        "libchange": "",
        "time_stamp": "2021-04-10 15:05:32"
    },
    {
        "id_log": "420",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4996",
        "libchange": "",
        "time_stamp": "2021-04-11 13:51:08"
    },
    {
        "id_log": "421",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5021",
        "libchange": "",
        "time_stamp": "2021-04-11 14:32:32"
    },
    {
        "id_log": "422",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5141",
        "libchange": "",
        "time_stamp": "2021-04-11 23:48:09"
    },
    {
        "id_log": "423",
        "id_user": "2",
        "id_material": "8",
        "quantity": "4031",
        "libchange": "",
        "time_stamp": "2021-04-12 00:19:16"
    },
    {
        "id_log": "424",
        "id_user": "2",
        "id_material": "8",
        "quantity": "4151",
        "libchange": "",
        "time_stamp": "2021-04-12 00:21:40"
    },
    {
        "id_log": "425",
        "id_user": "2",
        "id_material": "5",
        "quantity": "578",
        "libchange": "",
        "time_stamp": "2021-04-12 17:20:25"
    },
    {
        "id_log": "426",
        "id_user": "2",
        "id_material": "5",
        "quantity": "578",
        "libchange": "",
        "time_stamp": "2021-04-13 01:12:37"
    },
    {
        "id_log": "427",
        "id_user": "2",
        "id_material": "5",
        "quantity": "494",
        "libchange": "",
        "time_stamp": "2021-04-13 01:12:47"
    },
    {
        "id_log": "428",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5181",
        "libchange": "",
        "time_stamp": "2021-04-13 01:28:04"
    },
    {
        "id_log": "429",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5231",
        "libchange": "",
        "time_stamp": "2021-04-13 15:16:43"
    },
    {
        "id_log": "430",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5291",
        "libchange": "",
        "time_stamp": "2021-04-13 15:36:16"
    },
    {
        "id_log": "431",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5331",
        "libchange": "",
        "time_stamp": "2021-04-13 22:39:43"
    },
    {
        "id_log": "432",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5356",
        "libchange": "",
        "time_stamp": "2021-04-14 01:52:53"
    },
    {
        "id_log": "433",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5421",
        "libchange": "",
        "time_stamp": "2021-04-14 20:38:02"
    },
    {
        "id_log": "434",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5456",
        "libchange": "",
        "time_stamp": "2021-04-14 21:02:49"
    },
    {
        "id_log": "435",
        "id_user": "2",
        "id_material": "5",
        "quantity": "514",
        "libchange": "",
        "time_stamp": "2021-04-15 01:55:00"
    },
    {
        "id_log": "436",
        "id_user": "2",
        "id_material": "5",
        "quantity": "534",
        "libchange": "",
        "time_stamp": "2021-04-15 01:55:09"
    },
    {
        "id_log": "437",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5716",
        "libchange": "",
        "time_stamp": "2021-04-15 13:28:07"
    },
    {
        "id_log": "438",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5766",
        "libchange": "",
        "time_stamp": "2021-04-15 13:28:16"
    },
    {
        "id_log": "439",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5806",
        "libchange": "",
        "time_stamp": "2021-04-15 18:31:41"
    },
    {
        "id_log": "440",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5831",
        "libchange": "",
        "time_stamp": "2021-04-16 18:56:10"
    },
    {
        "id_log": "441",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5906",
        "libchange": "",
        "time_stamp": "2021-04-16 19:07:09"
    },
    {
        "id_log": "442",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5946",
        "libchange": "",
        "time_stamp": "2021-04-17 01:43:55"
    },
    {
        "id_log": "443",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5956",
        "libchange": "",
        "time_stamp": "2021-04-17 15:52:03"
    },
    {
        "id_log": "444",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5971",
        "libchange": "",
        "time_stamp": "2021-04-17 16:01:22"
    },
    {
        "id_log": "445",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5986",
        "libchange": "",
        "time_stamp": "2021-04-17 16:05:33"
    },
    {
        "id_log": "446",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6036",
        "libchange": "",
        "time_stamp": "2021-04-17 20:58:44"
    },
    {
        "id_log": "447",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6096",
        "libchange": "",
        "time_stamp": "2021-04-18 17:10:53"
    },
    {
        "id_log": "448",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6106",
        "libchange": "",
        "time_stamp": "2021-04-18 17:41:30"
    },
    {
        "id_log": "449",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6121",
        "libchange": "",
        "time_stamp": "2021-04-18 17:46:32"
    },
    {
        "id_log": "450",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6396",
        "libchange": "",
        "time_stamp": "2021-04-19 15:44:41"
    },
    {
        "id_log": "451",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6431",
        "libchange": "",
        "time_stamp": "2021-04-19 15:45:51"
    },
    {
        "id_log": "452",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6441",
        "libchange": "",
        "time_stamp": "2021-04-19 15:46:42"
    },
    {
        "id_log": "453",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6471",
        "libchange": "",
        "time_stamp": "2021-04-20 01:24:22"
    },
    {
        "id_log": "454",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6526",
        "libchange": "",
        "time_stamp": "2021-04-20 23:45:28"
    },
    {
        "id_log": "455",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6576",
        "libchange": "",
        "time_stamp": "2021-04-21 00:00:38"
    },
    {
        "id_log": "456",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6601",
        "libchange": "",
        "time_stamp": "2021-04-21 00:01:44"
    },
    {
        "id_log": "457",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6626",
        "libchange": "",
        "time_stamp": "2021-04-21 00:02:06"
    },
    {
        "id_log": "458",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6706",
        "libchange": "",
        "time_stamp": "2021-04-21 00:07:30"
    },
    {
        "id_log": "459",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6781",
        "libchange": "",
        "time_stamp": "2021-04-21 18:30:29"
    },
    {
        "id_log": "460",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6901",
        "libchange": "",
        "time_stamp": "2021-04-21 18:37:16"
    },
    {
        "id_log": "461",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6926",
        "libchange": "",
        "time_stamp": "2021-04-21 18:39:37"
    },
    {
        "id_log": "462",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7026",
        "libchange": "",
        "time_stamp": "2021-04-21 18:41:20"
    },
    {
        "id_log": "463",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7076",
        "libchange": "",
        "time_stamp": "2021-04-21 20:54:17"
    },
    {
        "id_log": "464",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7646",
        "libchange": "",
        "time_stamp": "2021-04-22 14:45:58"
    },
    {
        "id_log": "465",
        "id_user": "2",
        "id_material": "7",
        "quantity": "10519",
        "libchange": "",
        "time_stamp": "2021-04-22 15:16:26"
    },
    {
        "id_log": "466",
        "id_user": "2",
        "id_material": "7",
        "quantity": "4319",
        "libchange": "",
        "time_stamp": "2021-04-22 15:16:48"
    },
    {
        "id_log": "467",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7656",
        "libchange": "",
        "time_stamp": "2021-04-22 15:17:41"
    },
    {
        "id_log": "468",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7701",
        "libchange": "",
        "time_stamp": "2021-04-22 15:24:35"
    },
    {
        "id_log": "469",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7716",
        "libchange": "",
        "time_stamp": "2021-04-22 16:00:04"
    },
    {
        "id_log": "470",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8226",
        "libchange": "",
        "time_stamp": "2021-04-23 14:09:38"
    },
    {
        "id_log": "471",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8526",
        "libchange": "",
        "time_stamp": "2021-04-23 14:11:25"
    },
    {
        "id_log": "472",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8556",
        "libchange": "",
        "time_stamp": "2021-04-23 14:31:52"
    },
    {
        "id_log": "473",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8756",
        "libchange": "",
        "time_stamp": "2021-04-23 18:40:56"
    },
    {
        "id_log": "474",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8816",
        "libchange": "",
        "time_stamp": "2021-04-23 20:13:40"
    },
    {
        "id_log": "475",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9106",
        "libchange": "",
        "time_stamp": "2021-04-24 13:15:33"
    },
    {
        "id_log": "476",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9116",
        "libchange": "",
        "time_stamp": "2021-04-24 13:17:47"
    },
    {
        "id_log": "477",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9131",
        "libchange": "",
        "time_stamp": "2021-04-24 13:21:51"
    },
    {
        "id_log": "478",
        "id_user": "2",
        "id_material": "24",
        "quantity": "434",
        "libchange": "",
        "time_stamp": "2021-04-24 13:56:18"
    },
    {
        "id_log": "479",
        "id_user": "2",
        "id_material": "24",
        "quantity": "434",
        "libchange": "",
        "time_stamp": "2021-04-24 13:56:24"
    },
    {
        "id_log": "480",
        "id_user": "2",
        "id_material": "49",
        "quantity": "16",
        "libchange": "",
        "time_stamp": "2021-04-24 14:11:41"
    },
    {
        "id_log": "481",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9156",
        "libchange": "",
        "time_stamp": "2021-04-25 23:58:09"
    },
    {
        "id_log": "482",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9376",
        "libchange": "",
        "time_stamp": "2021-04-26 03:10:44"
    },
    {
        "id_log": "483",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9391",
        "libchange": "",
        "time_stamp": "2021-04-26 03:16:35"
    },
    {
        "id_log": "484",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9706",
        "libchange": "",
        "time_stamp": "2021-04-27 02:26:34"
    },
    {
        "id_log": "485",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9861",
        "libchange": "",
        "time_stamp": "2021-05-01 22:28:36"
    },
    {
        "id_log": "486",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9866",
        "libchange": "",
        "time_stamp": "2021-05-01 22:28:56"
    },
    {
        "id_log": "487",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10001",
        "libchange": "",
        "time_stamp": "2021-05-02 00:08:56"
    },
    {
        "id_log": "488",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10041",
        "libchange": "",
        "time_stamp": "2021-05-02 00:13:51"
    },
    {
        "id_log": "489",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10141",
        "libchange": "",
        "time_stamp": "2021-05-02 01:00:25"
    },
    {
        "id_log": "490",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10201",
        "libchange": "",
        "time_stamp": "2021-05-02 01:53:40"
    },
    {
        "id_log": "491",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10216",
        "libchange": "",
        "time_stamp": "2021-05-02 02:34:43"
    },
    {
        "id_log": "492",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10276",
        "libchange": "",
        "time_stamp": "2021-05-02 13:31:14"
    },
    {
        "id_log": "493",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10421",
        "libchange": "",
        "time_stamp": "2021-05-02 13:41:24"
    },
    {
        "id_log": "494",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10486",
        "libchange": "",
        "time_stamp": "2021-05-02 14:11:23"
    },
    {
        "id_log": "495",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10861",
        "libchange": "",
        "time_stamp": "2021-05-04 09:37:04"
    },
    {
        "id_log": "496",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10886",
        "libchange": "",
        "time_stamp": "2021-05-04 18:23:36"
    },
    {
        "id_log": "497",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10911",
        "libchange": "",
        "time_stamp": "2021-05-04 18:23:56"
    },
    {
        "id_log": "498",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11191",
        "libchange": "",
        "time_stamp": "2021-05-05 20:22:11"
    },
    {
        "id_log": "499",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11191",
        "libchange": "",
        "time_stamp": "2021-05-05 20:24:47"
    },
    {
        "id_log": "500",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11191",
        "libchange": "",
        "time_stamp": "2021-05-05 20:25:03"
    },
    {
        "id_log": "501",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11191",
        "libchange": "",
        "time_stamp": "2021-05-05 20:28:14"
    },
    {
        "id_log": "502",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11191",
        "libchange": "",
        "time_stamp": "2021-05-05 20:28:16"
    },
    {
        "id_log": "503",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11191",
        "libchange": "",
        "time_stamp": "2021-05-05 20:28:29"
    },
    {
        "id_log": "504",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11191",
        "libchange": "",
        "time_stamp": "2021-05-05 20:31:11"
    },
    {
        "id_log": "505",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11191",
        "libchange": "",
        "time_stamp": "2021-05-05 20:31:18"
    },
    {
        "id_log": "506",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11191",
        "libchange": "",
        "time_stamp": "2021-05-05 20:33:27"
    },
    {
        "id_log": "507",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11191",
        "libchange": "",
        "time_stamp": "2021-05-05 20:33:36"
    },
    {
        "id_log": "508",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11411",
        "libchange": "",
        "time_stamp": "2021-05-06 00:38:40"
    },
    {
        "id_log": "509",
        "id_user": "2",
        "id_material": "56",
        "quantity": "12",
        "libchange": "",
        "time_stamp": "2021-05-06 09:42:09"
    },
    {
        "id_log": "698",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11706",
        "libchange": "",
        "time_stamp": "2021-05-06 19:38:15"
    },
    {
        "id_log": "1451",
        "id_user": "6",
        "id_material": "5",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:19"
    },
    {
        "id_log": "1452",
        "id_user": "6",
        "id_material": "6",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:19"
    },
    {
        "id_log": "1453",
        "id_user": "6",
        "id_material": "8",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:19"
    },
    {
        "id_log": "1454",
        "id_user": "6",
        "id_material": "1",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1455",
        "id_user": "6",
        "id_material": "3",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1456",
        "id_user": "6",
        "id_material": "4",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1457",
        "id_user": "6",
        "id_material": "2",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1458",
        "id_user": "6",
        "id_material": "20",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1459",
        "id_user": "6",
        "id_material": "21",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1460",
        "id_user": "6",
        "id_material": "22",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1461",
        "id_user": "6",
        "id_material": "23",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1462",
        "id_user": "6",
        "id_material": "24",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1463",
        "id_user": "6",
        "id_material": "13",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1464",
        "id_user": "6",
        "id_material": "12",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1465",
        "id_user": "6",
        "id_material": "14",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1466",
        "id_user": "6",
        "id_material": "15",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1467",
        "id_user": "6",
        "id_material": "18",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1468",
        "id_user": "6",
        "id_material": "19",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:20"
    },
    {
        "id_log": "1469",
        "id_user": "6",
        "id_material": "17",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1470",
        "id_user": "6",
        "id_material": "16",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1471",
        "id_user": "6",
        "id_material": "33",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1472",
        "id_user": "6",
        "id_material": "34",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1473",
        "id_user": "6",
        "id_material": "35",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1474",
        "id_user": "6",
        "id_material": "36",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1475",
        "id_user": "6",
        "id_material": "39",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1476",
        "id_user": "6",
        "id_material": "40",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1477",
        "id_user": "6",
        "id_material": "53",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1478",
        "id_user": "6",
        "id_material": "54",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1479",
        "id_user": "6",
        "id_material": "55",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1480",
        "id_user": "6",
        "id_material": "49",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1481",
        "id_user": "6",
        "id_material": "50",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1482",
        "id_user": "6",
        "id_material": "51",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1483",
        "id_user": "6",
        "id_material": "52",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:21"
    },
    {
        "id_log": "1484",
        "id_user": "6",
        "id_material": "32",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1485",
        "id_user": "6",
        "id_material": "25",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1486",
        "id_user": "6",
        "id_material": "26",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1487",
        "id_user": "6",
        "id_material": "27",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1488",
        "id_user": "6",
        "id_material": "28",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1489",
        "id_user": "6",
        "id_material": "29",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1490",
        "id_user": "6",
        "id_material": "30",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1491",
        "id_user": "6",
        "id_material": "31",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1492",
        "id_user": "6",
        "id_material": "7",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1493",
        "id_user": "6",
        "id_material": "9",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1494",
        "id_user": "6",
        "id_material": "10",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1495",
        "id_user": "6",
        "id_material": "37",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1496",
        "id_user": "6",
        "id_material": "38",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1497",
        "id_user": "6",
        "id_material": "56",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-05-07 21:11:22"
    },
    {
        "id_log": "1498",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11891",
        "libchange": "",
        "time_stamp": "2021-05-08 00:58:06"
    },
    {
        "id_log": "1499",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11991",
        "libchange": "",
        "time_stamp": "2021-05-08 01:07:06"
    },
    {
        "id_log": "1500",
        "id_user": "2",
        "id_material": "1",
        "quantity": "19797",
        "libchange": "",
        "time_stamp": "2021-12-04 21:09:26"
    },
    {
        "id_log": "1501",
        "id_user": "2",
        "id_material": "1",
        "quantity": "19837",
        "libchange": "",
        "time_stamp": "2021-12-04 21:11:12"
    },
    {
        "id_log": "1502",
        "id_user": "2",
        "id_material": "1",
        "quantity": "19952",
        "libchange": "",
        "time_stamp": "2021-12-04 23:14:43"
    },
    {
        "id_log": "1503",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1606",
        "libchange": "",
        "time_stamp": "2021-12-05 13:55:36"
    },
    {
        "id_log": "1504",
        "id_user": "2",
        "id_material": "6",
        "quantity": "104",
        "libchange": "",
        "time_stamp": "2021-12-05 13:55:45"
    },
    {
        "id_log": "1505",
        "id_user": "2",
        "id_material": "8",
        "quantity": "674",
        "libchange": "",
        "time_stamp": "2021-12-05 13:56:24"
    },
    {
        "id_log": "1506",
        "id_user": "2",
        "id_material": "1",
        "quantity": "19977",
        "libchange": "",
        "time_stamp": "2021-12-05 13:56:38"
    },
    {
        "id_log": "1507",
        "id_user": "2",
        "id_material": "58",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-12-05 14:01:23"
    },
    {
        "id_log": "1508",
        "id_user": "2",
        "id_material": "7",
        "quantity": "1498",
        "libchange": "",
        "time_stamp": "2021-12-05 14:01:23"
    },
    {
        "id_log": "1509",
        "id_user": "2",
        "id_material": "4",
        "quantity": "461472",
        "libchange": "",
        "time_stamp": "2021-12-05 14:02:00"
    },
    {
        "id_log": "1510",
        "id_user": "2",
        "id_material": "59",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-12-05 14:03:02"
    },
    {
        "id_log": "1511",
        "id_user": "2",
        "id_material": "59",
        "quantity": "860",
        "libchange": "",
        "time_stamp": "2021-12-05 14:03:12"
    },
    {
        "id_log": "1512",
        "id_user": "2",
        "id_material": "58",
        "quantity": "1653",
        "libchange": "",
        "time_stamp": "2021-12-05 14:05:01"
    },
    {
        "id_log": "1513",
        "id_user": "2",
        "id_material": "9",
        "quantity": "7409",
        "libchange": "",
        "time_stamp": "2021-12-05 14:05:12"
    },
    {
        "id_log": "1514",
        "id_user": "2",
        "id_material": "60",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-12-05 14:14:14"
    },
    {
        "id_log": "1515",
        "id_user": "2",
        "id_material": "61",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-12-05 14:14:14"
    },
    {
        "id_log": "1516",
        "id_user": "2",
        "id_material": "62",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-12-05 14:14:14"
    },
    {
        "id_log": "1517",
        "id_user": "2",
        "id_material": "63",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-12-05 14:14:14"
    },
    {
        "id_log": "1518",
        "id_user": "2",
        "id_material": "60",
        "quantity": "530",
        "libchange": "",
        "time_stamp": "2021-12-05 14:14:23"
    },
    {
        "id_log": "1519",
        "id_user": "2",
        "id_material": "64",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-12-05 14:15:27"
    },
    {
        "id_log": "1520",
        "id_user": "2",
        "id_material": "64",
        "quantity": "191",
        "libchange": "",
        "time_stamp": "2021-12-05 14:15:46"
    },
    {
        "id_log": "1521",
        "id_user": "2",
        "id_material": "61",
        "quantity": "37",
        "libchange": "",
        "time_stamp": "2021-12-05 14:16:05"
    },
    {
        "id_log": "1522",
        "id_user": "2",
        "id_material": "62",
        "quantity": "78",
        "libchange": "",
        "time_stamp": "2021-12-05 14:16:18"
    },
    {
        "id_log": "1523",
        "id_user": "2",
        "id_material": "63",
        "quantity": "74",
        "libchange": "",
        "time_stamp": "2021-12-05 14:16:27"
    },
    {
        "id_log": "1524",
        "id_user": "2",
        "id_material": "65",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-12-05 14:26:15"
    },
    {
        "id_log": "1525",
        "id_user": "2",
        "id_material": "65",
        "quantity": "1048",
        "libchange": "",
        "time_stamp": "2021-12-05 14:26:29"
    },
    {
        "id_log": "1526",
        "id_user": "2",
        "id_material": "65",
        "quantity": "948",
        "libchange": "",
        "time_stamp": "2021-12-05 14:26:33"
    },
    {
        "id_log": "1527",
        "id_user": "2",
        "id_material": "58",
        "quantity": "1353",
        "libchange": "",
        "time_stamp": "2021-12-05 14:28:04"
    },
    {
        "id_log": "1528",
        "id_user": "2",
        "id_material": "1",
        "quantity": "20432",
        "libchange": "",
        "time_stamp": "2021-12-05 17:16:21"
    },
    {
        "id_log": "1529",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1466",
        "libchange": "",
        "time_stamp": "2021-12-05 17:20:37"
    },
    {
        "id_log": "1530",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1486",
        "libchange": "",
        "time_stamp": "2021-12-05 17:22:34"
    },
    {
        "id_log": "1531",
        "id_user": "2",
        "id_material": "9",
        "quantity": "7454",
        "libchange": "",
        "time_stamp": "2021-12-05 17:24:30"
    },
    {
        "id_log": "1532",
        "id_user": "2",
        "id_material": "1",
        "quantity": "20452",
        "libchange": "",
        "time_stamp": "2021-12-05 17:26:33"
    },
    {
        "id_log": "1533",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1490",
        "libchange": "",
        "time_stamp": "2021-12-05 17:29:27"
    },
    {
        "id_log": "1534",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1515",
        "libchange": "",
        "time_stamp": "2021-12-05 17:36:55"
    },
    {
        "id_log": "1535",
        "id_user": "2",
        "id_material": "6",
        "quantity": "106",
        "libchange": "",
        "time_stamp": "2021-12-05 17:37:06"
    },
    {
        "id_log": "1536",
        "id_user": "2",
        "id_material": "58",
        "quantity": "1791",
        "libchange": "",
        "time_stamp": "2021-12-05 17:38:15"
    },
    {
        "id_log": "1537",
        "id_user": "2",
        "id_material": "1",
        "quantity": "20492",
        "libchange": "",
        "time_stamp": "2021-12-05 17:40:49"
    },
    {
        "id_log": "1538",
        "id_user": "2",
        "id_material": "1",
        "quantity": "20652",
        "libchange": "",
        "time_stamp": "2021-12-06 19:19:26"
    },
    {
        "id_log": "1539",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1539",
        "libchange": "",
        "time_stamp": "2021-12-06 19:28:06"
    },
    {
        "id_log": "1540",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1399",
        "libchange": "",
        "time_stamp": "2021-12-06 19:28:41"
    },
    {
        "id_log": "1541",
        "id_user": "2",
        "id_material": "6",
        "quantity": "113",
        "libchange": "",
        "time_stamp": "2021-12-06 19:28:58"
    },
    {
        "id_log": "1542",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21047",
        "libchange": "",
        "time_stamp": "2021-12-08 19:44:37"
    },
    {
        "id_log": "1543",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1424",
        "libchange": "",
        "time_stamp": "2021-12-08 21:28:03"
    },
    {
        "id_log": "1544",
        "id_user": "2",
        "id_material": "6",
        "quantity": "113",
        "libchange": "",
        "time_stamp": "2021-12-08 21:28:05"
    },
    {
        "id_log": "1545",
        "id_user": "2",
        "id_material": "6",
        "quantity": "115",
        "libchange": "",
        "time_stamp": "2021-12-08 21:28:09"
    },
    {
        "id_log": "1546",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21087",
        "libchange": "",
        "time_stamp": "2021-12-08 21:28:31"
    },
    {
        "id_log": "1547",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1434",
        "libchange": "",
        "time_stamp": "2021-12-08 22:02:59"
    },
    {
        "id_log": "1548",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21102",
        "libchange": "",
        "time_stamp": "2021-12-08 22:12:18"
    },
    {
        "id_log": "1549",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21147",
        "libchange": "",
        "time_stamp": "2021-12-08 22:16:44"
    },
    {
        "id_log": "1550",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21677",
        "libchange": "",
        "time_stamp": "2021-12-11 14:05:08"
    },
    {
        "id_log": "1551",
        "id_user": "2",
        "id_material": "6",
        "quantity": "123",
        "libchange": "",
        "time_stamp": "2021-12-11 14:27:31"
    },
    {
        "id_log": "1552",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1459",
        "libchange": "",
        "time_stamp": "2021-12-11 14:33:14"
    },
    {
        "id_log": "1553",
        "id_user": "2",
        "id_material": "6",
        "quantity": "125",
        "libchange": "",
        "time_stamp": "2021-12-11 14:33:22"
    },
    {
        "id_log": "1554",
        "id_user": "2",
        "id_material": "58",
        "quantity": "1962",
        "libchange": "",
        "time_stamp": "2021-12-11 14:34:29"
    },
    {
        "id_log": "1555",
        "id_user": "2",
        "id_material": "16",
        "quantity": "972",
        "libchange": "",
        "time_stamp": "2021-12-11 14:45:12"
    },
    {
        "id_log": "1556",
        "id_user": "2",
        "id_material": "58",
        "quantity": "2019",
        "libchange": "",
        "time_stamp": "2021-12-11 14:58:26"
    },
    {
        "id_log": "1557",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21737",
        "libchange": "",
        "time_stamp": "2021-12-11 14:59:11"
    },
    {
        "id_log": "1558",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21887",
        "libchange": "",
        "time_stamp": "2021-12-11 15:39:38"
    },
    {
        "id_log": "1559",
        "id_user": "2",
        "id_material": "1",
        "quantity": "19672",
        "libchange": null,
        "time_stamp": "2021-12-02 21:14:14"
    },
    {
        "id_log": "1560",
        "id_user": "2",
        "id_material": "1",
        "quantity": "18482",
        "libchange": null,
        "time_stamp": "2021-12-02 21:09:53"
    },
    {
        "id_log": "1561",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1",
        "libchange": null,
        "time_stamp": "2021-07-13 16:27:55"
    },
    {
        "id_log": "1562",
        "id_user": "2",
        "id_material": "65",
        "quantity": "988",
        "libchange": "",
        "time_stamp": "2021-12-12 00:00:31"
    },
    {
        "id_log": "1563",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21926",
        "libchange": "",
        "time_stamp": "2021-12-12 00:01:16"
    },
    {
        "id_log": "1564",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21967",
        "libchange": "",
        "time_stamp": "2021-12-12 00:01:25"
    },
    {
        "id_log": "1565",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22087",
        "libchange": "",
        "time_stamp": "2021-12-12 00:37:05"
    },
    {
        "id_log": "1566",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22287",
        "libchange": "",
        "time_stamp": "2021-12-12 02:10:46"
    },
    {
        "id_log": "1567",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22387",
        "libchange": "",
        "time_stamp": "2021-12-12 02:12:07"
    },
    {
        "id_log": "1568",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22427",
        "libchange": "",
        "time_stamp": "2021-12-12 02:22:08"
    },
    {
        "id_log": "1569",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22647",
        "libchange": "",
        "time_stamp": "2021-12-12 03:15:09"
    },
    {
        "id_log": "1571",
        "id_user": "2",
        "id_material": "1",
        "quantity": "23222",
        "libchange": "",
        "time_stamp": "2021-12-15 20:42:58"
    },
    {
        "id_log": "1572",
        "id_user": "2",
        "id_material": "1",
        "quantity": "23742",
        "libchange": "",
        "time_stamp": "2021-12-18 00:08:45"
    },
    {
        "id_log": "1573",
        "id_user": "2",
        "id_material": "1",
        "quantity": "24162",
        "libchange": "",
        "time_stamp": "2021-12-20 00:00:16"
    },
    {
        "id_log": "1574",
        "id_user": "2",
        "id_material": "66",
        "quantity": "0",
        "libchange": "Init",
        "time_stamp": "2021-12-20 00:03:13"
    },
    {
        "id_log": "1575",
        "id_user": "2",
        "id_material": "66",
        "quantity": "6",
        "libchange": "",
        "time_stamp": "2021-12-20 00:03:22"
    },
    {
        "id_log": "1576",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1501",
        "libchange": "",
        "time_stamp": "2021-12-20 00:10:27"
    },
    {
        "id_log": "1577",
        "id_user": "2",
        "id_material": "6",
        "quantity": "151",
        "libchange": "",
        "time_stamp": "2021-12-20 00:10:33"
    },
    {
        "id_log": "1578",
        "id_user": "2",
        "id_material": "9",
        "quantity": "7731",
        "libchange": "",
        "time_stamp": "2021-12-20 00:11:33"
    },
    {
        "id_log": "1579",
        "id_user": "2",
        "id_material": "9",
        "quantity": "7231",
        "libchange": "",
        "time_stamp": "2021-12-20 00:11:48"
    },
    {
        "id_log": "1580",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1538",
        "libchange": "",
        "time_stamp": "2021-12-20 00:20:14"
    },
    {
        "id_log": "1581",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1556",
        "libchange": "",
        "time_stamp": "2021-12-20 00:21:26"
    },
    {
        "id_log": "1582",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1560",
        "libchange": "",
        "time_stamp": "2021-12-20 00:23:12"
    },
    {
        "id_log": "1583",
        "id_user": "2",
        "id_material": "66",
        "quantity": "0",
        "libchange": null,
        "time_stamp": "2021-12-20 00:47:56"
    },
    {
        "id_log": "1584",
        "id_user": "2",
        "id_material": "66",
        "quantity": "1",
        "libchange": null,
        "time_stamp": "2021-12-20 00:48:19"
    },
    {
        "id_log": "1585",
        "id_user": "2",
        "id_material": "66",
        "quantity": "0",
        "libchange": null,
        "time_stamp": "2021-12-20 00:49:00"
    },
    {
        "id_log": "1586",
        "id_user": "2",
        "id_material": "1",
        "quantity": "24507",
        "libchange": "",
        "time_stamp": "2021-12-22 16:23:30"
    },
    {
        "id_log": "1587",
        "id_user": "2",
        "id_material": "1",
        "quantity": "24547",
        "libchange": "",
        "time_stamp": "2021-12-22 16:28:17"
    },
    {
        "id_log": "1588",
        "id_user": "2",
        "id_material": "1",
        "quantity": "24647",
        "libchange": "",
        "time_stamp": "2021-12-22 17:33:55"
    },
    {
        "id_log": "1589",
        "id_user": "2",
        "id_material": "1",
        "quantity": "25037",
        "libchange": "",
        "time_stamp": "2021-12-23 14:16:12"
    },
    {
        "id_log": "1590",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1597",
        "libchange": "",
        "time_stamp": "2021-12-23 14:25:53"
    },
    {
        "id_log": "1591",
        "id_user": "2",
        "id_material": "6",
        "quantity": "163",
        "libchange": "",
        "time_stamp": "2021-12-23 14:26:01"
    },
    {
        "id_log": "1592",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1622",
        "libchange": "",
        "time_stamp": "2021-12-26 23:25:42"
    },
    {
        "id_log": "1593",
        "id_user": "2",
        "id_material": "6",
        "quantity": "171",
        "libchange": "",
        "time_stamp": "2021-12-26 23:25:51"
    },
    {
        "id_log": "1594",
        "id_user": "2",
        "id_material": "1",
        "quantity": "25557",
        "libchange": "",
        "time_stamp": "2021-12-26 23:26:08"
    },
    {
        "id_log": "1595",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1647",
        "libchange": "",
        "time_stamp": "2021-12-26 23:34:52"
    },
    {
        "id_log": "1596",
        "id_user": "2",
        "id_material": "6",
        "quantity": "173",
        "libchange": "",
        "time_stamp": "2021-12-26 23:35:16"
    },
    {
        "id_log": "1597",
        "id_user": "2",
        "id_material": "1",
        "quantity": "25607",
        "libchange": "",
        "time_stamp": "2021-12-26 23:51:27"
    },
    {
        "id_log": "1598",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4937",
        "libchange": null,
        "time_stamp": "2021-09-20 13:15:25"
    },
    {
        "id_log": "1599",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6072",
        "libchange": null,
        "time_stamp": "2021-09-28 07:49:51"
    },
    {
        "id_log": "1600",
        "id_user": "2",
        "id_material": "1",
        "quantity": "17177",
        "libchange": null,
        "time_stamp": "2021-11-24 19:23:05"
    },
    {
        "id_log": "1601",
        "id_user": "2",
        "id_material": "1",
        "quantity": "25802",
        "libchange": "",
        "time_stamp": "2021-12-28 13:21:10"
    },
    {
        "id_log": "1602",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1664",
        "libchange": "",
        "time_stamp": "2021-12-28 13:22:15"
    },
    {
        "id_log": "1603",
        "id_user": "2",
        "id_material": "1",
        "quantity": "25982",
        "libchange": "",
        "time_stamp": "2021-12-28 15:11:52"
    },
    {
        "id_log": "1604",
        "id_user": "2",
        "id_material": "1",
        "quantity": "26182",
        "libchange": "",
        "time_stamp": "2021-12-28 15:43:51"
    },
    {
        "id_log": "1605",
        "id_user": "2",
        "id_material": "1",
        "quantity": "26262",
        "libchange": "",
        "time_stamp": "2021-12-29 13:56:57"
    },
    {
        "id_log": "1606",
        "id_user": "2",
        "id_material": "58",
        "quantity": "2381",
        "libchange": "",
        "time_stamp": "2021-12-29 14:05:52"
    },
    {
        "id_log": "1607",
        "id_user": "2",
        "id_material": "1",
        "quantity": "26282",
        "libchange": "",
        "time_stamp": "2021-12-29 15:44:37"
    },
    {
        "id_log": "1608",
        "id_user": "2",
        "id_material": "1",
        "quantity": "26397",
        "libchange": "",
        "time_stamp": "2021-12-29 15:57:17"
    },
    {
        "id_log": "1609",
        "id_user": "2",
        "id_material": "1",
        "quantity": "24897",
        "libchange": "",
        "time_stamp": "2021-12-29 16:10:38"
    },
    {
        "id_log": "1610",
        "id_user": "2",
        "id_material": "1",
        "quantity": "23497",
        "libchange": "",
        "time_stamp": "2021-12-29 20:55:00"
    },
    {
        "id_log": "1611",
        "id_user": "2",
        "id_material": "1",
        "quantity": "23697",
        "libchange": "",
        "time_stamp": "2021-12-29 21:05:37"
    },
    {
        "id_log": "1612",
        "id_user": "2",
        "id_material": "1",
        "quantity": "23747",
        "libchange": "",
        "time_stamp": "2021-12-29 21:09:14"
    },
    {
        "id_log": "1613",
        "id_user": "2",
        "id_material": "1",
        "quantity": "24162",
        "libchange": "",
        "time_stamp": "2021-12-30 14:43:43"
    },
    {
        "id_log": "1614",
        "id_user": "2",
        "id_material": "1",
        "quantity": "24262",
        "libchange": "",
        "time_stamp": "2021-12-30 15:01:20"
    },
    {
        "id_log": "1615",
        "id_user": "2",
        "id_material": "1",
        "quantity": "24302",
        "libchange": "",
        "time_stamp": "2021-12-30 15:05:12"
    },
    {
        "id_log": "1616",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1689",
        "libchange": "",
        "time_stamp": "2021-12-30 15:05:23"
    },
    {
        "id_log": "1617",
        "id_user": "2",
        "id_material": "6",
        "quantity": "185",
        "libchange": "",
        "time_stamp": "2021-12-30 15:05:30"
    },
    {
        "id_log": "1618",
        "id_user": "2",
        "id_material": "1",
        "quantity": "24402",
        "libchange": "",
        "time_stamp": "2021-12-31 15:03:53"
    },
    {
        "id_log": "1619",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21602",
        "libchange": "",
        "time_stamp": "2021-12-31 15:04:46"
    },
    {
        "id_log": "1620",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21682",
        "libchange": "",
        "time_stamp": "2021-12-31 15:05:17"
    },
    {
        "id_log": "1622",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21767",
        "libchange": "",
        "time_stamp": "2021-12-31 15:14:43"
    },
    {
        "id_log": "1623",
        "id_user": "2",
        "id_material": "1",
        "quantity": "21967",
        "libchange": "",
        "time_stamp": "2021-12-31 16:58:38"
    },
    {
        "id_log": "1624",
        "id_user": "2",
        "id_material": "6",
        "quantity": "191",
        "libchange": "",
        "time_stamp": "2021-12-31 17:08:45"
    },
    {
        "id_log": "1625",
        "id_user": "2",
        "id_material": "6",
        "quantity": "192",
        "libchange": "",
        "time_stamp": "2021-12-31 17:09:06"
    },
    {
        "id_log": "1626",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22227",
        "libchange": "",
        "time_stamp": "2022-01-01 13:52:22"
    },
    {
        "id_log": "1627",
        "id_user": "2",
        "id_material": "6",
        "quantity": "200",
        "libchange": "",
        "time_stamp": "2022-01-01 14:11:31"
    },
    {
        "id_log": "1628",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1714",
        "libchange": "",
        "time_stamp": "2022-01-01 14:13:25"
    },
    {
        "id_log": "1629",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22337",
        "libchange": "",
        "time_stamp": "2022-01-02 16:15:04"
    },
    {
        "id_log": "1630",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22482",
        "libchange": "",
        "time_stamp": "2022-01-03 11:59:43"
    },
    {
        "id_log": "1631",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22497",
        "libchange": "",
        "time_stamp": "2022-01-03 19:29:41"
    },
    {
        "id_log": "1632",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22522",
        "libchange": "",
        "time_stamp": "2022-01-04 19:18:34"
    },
    {
        "id_log": "1633",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22562",
        "libchange": "",
        "time_stamp": "2022-01-04 19:22:01"
    },
    {
        "id_log": "1634",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22562",
        "libchange": "",
        "time_stamp": "2022-01-04 20:49:41"
    },
    {
        "id_log": "1635",
        "id_user": "2",
        "id_material": "1",
        "quantity": "19762",
        "libchange": "",
        "time_stamp": "2022-01-04 20:50:48"
    },
    {
        "id_log": "1636",
        "id_user": "2",
        "id_material": "1",
        "quantity": "16962",
        "libchange": "",
        "time_stamp": "2022-01-04 20:52:41"
    },
    {
        "id_log": "1637",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14162",
        "libchange": "",
        "time_stamp": "2022-01-04 20:55:44"
    },
    {
        "id_log": "1638",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14442",
        "libchange": "",
        "time_stamp": "2022-01-04 22:10:06"
    },
    {
        "id_log": "1639",
        "id_user": "2",
        "id_material": "58",
        "quantity": "2824",
        "libchange": "",
        "time_stamp": "2022-01-04 22:13:28"
    },
    {
        "id_log": "1640",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14482",
        "libchange": "",
        "time_stamp": "2022-01-04 22:25:12"
    },
    {
        "id_log": "1641",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14512",
        "libchange": "",
        "time_stamp": "2022-01-04 22:34:31"
    },
    {
        "id_log": "1642",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14672",
        "libchange": "",
        "time_stamp": "2022-01-04 22:36:19"
    },
    {
        "id_log": "1643",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14757",
        "libchange": "",
        "time_stamp": "2022-01-05 19:18:46"
    },
    {
        "id_log": "1644",
        "id_user": "2",
        "id_material": "4",
        "quantity": "529565",
        "libchange": "",
        "time_stamp": "2022-01-05 19:28:32"
    },
    {
        "id_log": "1645",
        "id_user": "2",
        "id_material": "4",
        "quantity": "517565",
        "libchange": "",
        "time_stamp": "2022-01-05 19:28:56"
    },
    {
        "id_log": "1646",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14772",
        "libchange": "",
        "time_stamp": "2022-01-05 19:29:39"
    },
    {
        "id_log": "1647",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14922",
        "libchange": "",
        "time_stamp": "2022-01-05 21:42:26"
    },
    {
        "id_log": "1648",
        "id_user": "2",
        "id_material": "58",
        "quantity": "3179",
        "libchange": "",
        "time_stamp": "2022-01-05 22:22:07"
    },
    {
        "id_log": "1649",
        "id_user": "2",
        "id_material": "1",
        "quantity": "15412",
        "libchange": "",
        "time_stamp": "2022-01-06 20:14:41"
    },
    {
        "id_log": "1650",
        "id_user": "2",
        "id_material": "1",
        "quantity": "15612",
        "libchange": "",
        "time_stamp": "2022-01-07 09:12:36"
    },
    {
        "id_log": "1651",
        "id_user": "2",
        "id_material": "1",
        "quantity": "15777",
        "libchange": "",
        "time_stamp": "2022-01-08 15:43:11"
    },
    {
        "id_log": "1652",
        "id_user": "2",
        "id_material": "6",
        "quantity": "220",
        "libchange": "",
        "time_stamp": "2022-01-08 15:45:12"
    },
    {
        "id_log": "1653",
        "id_user": "2",
        "id_material": "6",
        "quantity": "246",
        "libchange": "",
        "time_stamp": "2022-01-08 15:45:28"
    },
    {
        "id_log": "1654",
        "id_user": "2",
        "id_material": "1",
        "quantity": "15792",
        "libchange": "",
        "time_stamp": "2022-01-08 16:07:26"
    },
    {
        "id_log": "1655",
        "id_user": "2",
        "id_material": "6",
        "quantity": "250",
        "libchange": "",
        "time_stamp": "2022-01-08 16:27:30"
    },
    {
        "id_log": "1656",
        "id_user": "2",
        "id_material": "1",
        "quantity": "16217",
        "libchange": "",
        "time_stamp": "2022-01-11 20:20:46"
    },
    {
        "id_log": "1658",
        "id_user": "2",
        "id_material": "1",
        "quantity": "16517",
        "libchange": "",
        "time_stamp": "2022-01-13 00:57:50"
    },
    {
        "id_log": "1659",
        "id_user": "2",
        "id_material": "1",
        "quantity": "622",
        "libchange": "",
        "time_stamp": "2022-01-13 19:03:10"
    },
    {
        "id_log": "1660",
        "id_user": "2",
        "id_material": "1",
        "quantity": "16517",
        "libchange": null,
        "time_stamp": "2022-01-13 12:45:19"
    },
    {
        "id_log": "1661",
        "id_user": "2",
        "id_material": "1",
        "quantity": "13717",
        "libchange": null,
        "time_stamp": "2022-01-13 12:46:19"
    },
    {
        "id_log": "1662",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10917",
        "libchange": null,
        "time_stamp": "2022-01-13 12:47:19"
    },
    {
        "id_log": "1663",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8117",
        "libchange": null,
        "time_stamp": "2022-01-13 12:48:19"
    },
    {
        "id_log": "1664",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5317",
        "libchange": null,
        "time_stamp": "2022-01-13 12:49:19"
    },
    {
        "id_log": "1668",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2517",
        "libchange": null,
        "time_stamp": "2022-01-13 12:50:19"
    },
    {
        "id_log": "1669",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3182",
        "libchange": null,
        "time_stamp": "2022-01-13 12:51:19"
    },
    {
        "id_log": "1670",
        "id_user": "2",
        "id_material": "1",
        "quantity": "382",
        "libchange": null,
        "time_stamp": "2022-01-13 12:52:19"
    },
    {
        "id_log": "1671",
        "id_user": "2",
        "id_material": "1",
        "quantity": "872",
        "libchange": "",
        "time_stamp": "2022-01-13 19:42:43"
    },
    {
        "id_log": "1672",
        "id_user": "2",
        "id_material": "1",
        "quantity": "32",
        "libchange": "",
        "time_stamp": "2022-01-13 20:40:32"
    },
    {
        "id_log": "1673",
        "id_user": "2",
        "id_material": "1",
        "quantity": "92",
        "libchange": "",
        "time_stamp": "2022-01-13 22:08:53"
    },
    {
        "id_log": "1674",
        "id_user": "2",
        "id_material": "1",
        "quantity": "112",
        "libchange": "",
        "time_stamp": "2022-01-13 22:11:10"
    },
    {
        "id_log": "1675",
        "id_user": "2",
        "id_material": "1",
        "quantity": "187",
        "libchange": "",
        "time_stamp": "2022-01-13 22:37:50"
    },
    {
        "id_log": "1676",
        "id_user": "2",
        "id_material": "1",
        "quantity": "527",
        "libchange": "",
        "time_stamp": "2022-01-13 23:02:44"
    },
    {
        "id_log": "1677",
        "id_user": "2",
        "id_material": "1",
        "quantity": "247",
        "libchange": "",
        "time_stamp": "2022-01-13 23:04:23"
    },
    {
        "id_log": "1678",
        "id_user": "2",
        "id_material": "1",
        "quantity": "287",
        "libchange": "",
        "time_stamp": "2022-01-13 23:30:38"
    },
    {
        "id_log": "1679",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7",
        "libchange": "",
        "time_stamp": "2022-01-13 23:31:24"
    },
    {
        "id_log": "1680",
        "id_user": "2",
        "id_material": "6",
        "quantity": "266",
        "libchange": "",
        "time_stamp": "2022-01-14 14:52:46"
    },
    {
        "id_log": "1681",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1879",
        "libchange": "",
        "time_stamp": "2022-01-14 14:53:00"
    },
    {
        "id_log": "1682",
        "id_user": "2",
        "id_material": "1",
        "quantity": "97",
        "libchange": "",
        "time_stamp": "2022-01-14 14:57:23"
    },
    {
        "id_log": "1683",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1899",
        "libchange": "",
        "time_stamp": "2022-01-14 15:03:49"
    },
    {
        "id_log": "1684",
        "id_user": "2",
        "id_material": "6",
        "quantity": "218",
        "libchange": "",
        "time_stamp": "2022-01-14 15:04:33"
    },
    {
        "id_log": "1685",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1851",
        "libchange": "",
        "time_stamp": "2022-01-14 15:04:46"
    },
    {
        "id_log": "1686",
        "id_user": "2",
        "id_material": "1",
        "quantity": "197",
        "libchange": "",
        "time_stamp": "2022-01-14 19:22:17"
    },
    {
        "id_log": "1687",
        "id_user": "2",
        "id_material": "1",
        "quantity": "292",
        "libchange": "",
        "time_stamp": "2022-01-15 13:12:09"
    },
    {
        "id_log": "1688",
        "id_user": "2",
        "id_material": "1",
        "quantity": "302",
        "libchange": "",
        "time_stamp": "2022-01-15 15:17:28"
    },
    {
        "id_log": "1689",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22",
        "libchange": "",
        "time_stamp": "2022-01-15 15:18:00"
    },
    {
        "id_log": "1690",
        "id_user": "2",
        "id_material": "1",
        "quantity": "172",
        "libchange": "",
        "time_stamp": "2022-01-15 15:37:40"
    },
    {
        "id_log": "1691",
        "id_user": "2",
        "id_material": "1",
        "quantity": "192",
        "libchange": "",
        "time_stamp": "2022-01-15 15:45:29"
    },
    {
        "id_log": "1692",
        "id_user": "2",
        "id_material": "1",
        "quantity": "247",
        "libchange": "",
        "time_stamp": "2022-01-15 15:54:46"
    },
    {
        "id_log": "1693",
        "id_user": "2",
        "id_material": "1",
        "quantity": "297",
        "libchange": "",
        "time_stamp": "2022-01-16 13:16:56"
    },
    {
        "id_log": "1694",
        "id_user": "2",
        "id_material": "1",
        "quantity": "17",
        "libchange": "",
        "time_stamp": "2022-01-16 13:17:36"
    },
    {
        "id_log": "1695",
        "id_user": "2",
        "id_material": "1",
        "quantity": "92",
        "libchange": "",
        "time_stamp": "2022-01-16 13:19:41"
    },
    {
        "id_log": "1696",
        "id_user": "2",
        "id_material": "1",
        "quantity": "152",
        "libchange": "",
        "time_stamp": "2022-01-16 14:20:26"
    },
    {
        "id_log": "1697",
        "id_user": "2",
        "id_material": "1",
        "quantity": "182",
        "libchange": "",
        "time_stamp": "2022-01-16 22:49:26"
    },
    {
        "id_log": "1698",
        "id_user": "2",
        "id_material": "1",
        "quantity": "222",
        "libchange": "",
        "time_stamp": "2022-01-17 10:41:50"
    },
    {
        "id_log": "1699",
        "id_user": "2",
        "id_material": "1",
        "quantity": "287",
        "libchange": "",
        "time_stamp": "2022-01-18 23:08:37"
    },
    {
        "id_log": "1700",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7",
        "libchange": "",
        "time_stamp": "2022-01-18 23:08:59"
    },
    {
        "id_log": "1701",
        "id_user": "2",
        "id_material": "1",
        "quantity": "127",
        "libchange": "",
        "time_stamp": "2022-01-18 23:11:50"
    },
    {
        "id_log": "1702",
        "id_user": "2",
        "id_material": "6",
        "quantity": "228",
        "libchange": "",
        "time_stamp": "2022-01-19 18:57:07"
    },
    {
        "id_log": "1703",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1876",
        "libchange": "",
        "time_stamp": "2022-01-19 18:57:15"
    },
    {
        "id_log": "1704",
        "id_user": "2",
        "id_material": "6",
        "quantity": "180",
        "libchange": "",
        "time_stamp": "2022-01-19 18:57:33"
    },
    {
        "id_log": "1705",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1828",
        "libchange": "",
        "time_stamp": "2022-01-19 18:57:40"
    },
    {
        "id_log": "1706",
        "id_user": "2",
        "id_material": "6",
        "quantity": "190",
        "libchange": "",
        "time_stamp": "2022-01-19 19:02:44"
    },
    {
        "id_log": "1707",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1832",
        "libchange": "",
        "time_stamp": "2022-01-19 19:21:30"
    },
    {
        "id_log": "1708",
        "id_user": "2",
        "id_material": "6",
        "quantity": "192",
        "libchange": "",
        "time_stamp": "2022-01-19 19:21:36"
    },
    {
        "id_log": "1709",
        "id_user": "2",
        "id_material": "1",
        "quantity": "257",
        "libchange": "",
        "time_stamp": "2022-01-19 19:22:30"
    },
    {
        "id_log": "1710",
        "id_user": "2",
        "id_material": "1",
        "quantity": "327",
        "libchange": "",
        "time_stamp": "2022-01-19 19:31:34"
    },
    {
        "id_log": "1711",
        "id_user": "2",
        "id_material": "1",
        "quantity": "47",
        "libchange": "",
        "time_stamp": "2022-01-19 20:29:19"
    },
    {
        "id_log": "1712",
        "id_user": "2",
        "id_material": "1",
        "quantity": "332",
        "libchange": "",
        "time_stamp": "2022-01-20 09:58:54"
    },
    {
        "id_log": "1713",
        "id_user": "2",
        "id_material": "1",
        "quantity": "467",
        "libchange": "",
        "time_stamp": "2022-01-21 20:38:10"
    },
    {
        "id_log": "1714",
        "id_user": "2",
        "id_material": "1",
        "quantity": "617",
        "libchange": "",
        "time_stamp": "2022-01-21 21:36:58"
    },
    {
        "id_log": "1715",
        "id_user": "2",
        "id_material": "1",
        "quantity": "627",
        "libchange": "",
        "time_stamp": "2022-01-21 22:09:04"
    },
    {
        "id_log": "1716",
        "id_user": "2",
        "id_material": "1",
        "quantity": "807",
        "libchange": "",
        "time_stamp": "2022-01-21 22:09:17"
    },
    {
        "id_log": "1717",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1852",
        "libchange": "",
        "time_stamp": "2022-01-21 22:10:19"
    },
    {
        "id_log": "1718",
        "id_user": "2",
        "id_material": "6",
        "quantity": "203",
        "libchange": "",
        "time_stamp": "2022-01-21 22:10:26"
    },
    {
        "id_log": "1719",
        "id_user": "2",
        "id_material": "1",
        "quantity": "877",
        "libchange": "",
        "time_stamp": "2022-01-22 13:21:39"
    },
    {
        "id_log": "1720",
        "id_user": "2",
        "id_material": "2",
        "quantity": "159587170",
        "libchange": "",
        "time_stamp": "2022-01-22 13:22:03"
    },
    {
        "id_log": "1721",
        "id_user": "2",
        "id_material": "1",
        "quantity": "952",
        "libchange": "",
        "time_stamp": "2022-01-22 14:02:18"
    },
    {
        "id_log": "1722",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1042",
        "libchange": "",
        "time_stamp": "2022-01-23 13:48:49"
    },
    {
        "id_log": "1723",
        "id_user": "2",
        "id_material": "6",
        "quantity": "215",
        "libchange": "",
        "time_stamp": "2022-01-23 20:54:05"
    },
    {
        "id_log": "1724",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1877",
        "libchange": "",
        "time_stamp": "2022-01-23 20:54:23"
    },
    {
        "id_log": "1725",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1082",
        "libchange": "",
        "time_stamp": "2022-01-23 20:54:32"
    },
    {
        "id_log": "1726",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1427",
        "libchange": "",
        "time_stamp": "2022-01-24 10:57:05"
    },
    {
        "id_log": "1727",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1457",
        "libchange": "",
        "time_stamp": "2022-01-24 11:07:57"
    },
    {
        "id_log": "1728",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1542",
        "libchange": "",
        "time_stamp": "2022-01-26 10:50:21"
    },
    {
        "id_log": "1729",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1877",
        "libchange": "",
        "time_stamp": "2022-01-26 10:51:44"
    },
    {
        "id_log": "1730",
        "id_user": "2",
        "id_material": "6",
        "quantity": "223",
        "libchange": "",
        "time_stamp": "2022-01-26 10:51:52"
    },
    {
        "id_log": "1731",
        "id_user": "2",
        "id_material": "6",
        "quantity": "175",
        "libchange": "",
        "time_stamp": "2022-01-26 10:52:05"
    },
    {
        "id_log": "1732",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1829",
        "libchange": "",
        "time_stamp": "2022-01-26 10:52:11"
    },
    {
        "id_log": "1733",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1782",
        "libchange": "",
        "time_stamp": "2022-01-26 11:14:42"
    },
    {
        "id_log": "1734",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1859",
        "libchange": "",
        "time_stamp": "2022-01-26 11:15:21"
    },
    {
        "id_log": "1735",
        "id_user": "2",
        "id_material": "6",
        "quantity": "185",
        "libchange": "",
        "time_stamp": "2022-01-26 11:15:37"
    },
    {
        "id_log": "1736",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1651",
        "libchange": "",
        "time_stamp": "2022-01-26 11:16:11"
    },
    {
        "id_log": "1737",
        "id_user": "2",
        "id_material": "9",
        "quantity": "7421",
        "libchange": "",
        "time_stamp": "2022-01-26 11:21:29"
    },
    {
        "id_log": "1738",
        "id_user": "2",
        "id_material": "9",
        "quantity": "6921",
        "libchange": "",
        "time_stamp": "2022-01-26 11:21:42"
    },
    {
        "id_log": "1739",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1822",
        "libchange": "",
        "time_stamp": "2022-01-26 11:40:28"
    },
    {
        "id_log": "1740",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1676",
        "libchange": "",
        "time_stamp": "2022-01-26 11:40:48"
    },
    {
        "id_log": "1741",
        "id_user": "2",
        "id_material": "6",
        "quantity": "187",
        "libchange": "",
        "time_stamp": "2022-01-26 11:40:58"
    },
    {
        "id_log": "1742",
        "id_user": "2",
        "id_material": "6",
        "quantity": "190",
        "libchange": "",
        "time_stamp": "2022-01-26 11:47:55"
    },
    {
        "id_log": "1743",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1680",
        "libchange": "",
        "time_stamp": "2022-01-26 11:48:02"
    },
    {
        "id_log": "1744",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1842",
        "libchange": "",
        "time_stamp": "2022-01-26 11:51:25"
    },
    {
        "id_log": "1745",
        "id_user": "2",
        "id_material": "16",
        "quantity": "1181",
        "libchange": "",
        "time_stamp": "2022-01-26 15:43:23"
    },
    {
        "id_log": "1746",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1882",
        "libchange": "",
        "time_stamp": "2022-01-26 16:03:19"
    },
    {
        "id_log": "1747",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2262",
        "libchange": "",
        "time_stamp": "2022-01-26 16:57:46"
    },
    {
        "id_log": "1748",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2322",
        "libchange": "",
        "time_stamp": "2022-01-27 09:22:42"
    },
    {
        "id_log": "1749",
        "id_user": "2",
        "id_material": "6",
        "quantity": "198",
        "libchange": "",
        "time_stamp": "2022-01-27 09:32:31"
    },
    {
        "id_log": "1750",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2532",
        "libchange": "",
        "time_stamp": "2022-01-27 10:05:08"
    },
    {
        "id_log": "1751",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2592",
        "libchange": "",
        "time_stamp": "2022-01-27 11:33:51"
    },
    {
        "id_log": "1752",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2807",
        "libchange": "",
        "time_stamp": "2022-01-27 14:20:43"
    },
    {
        "id_log": "1753",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2847",
        "libchange": "",
        "time_stamp": "2022-01-27 14:38:12"
    },
    {
        "id_log": "1754",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2932",
        "libchange": "",
        "time_stamp": "2022-01-27 16:40:40"
    },
    {
        "id_log": "1755",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2957",
        "libchange": "",
        "time_stamp": "2022-01-27 18:49:38"
    },
    {
        "id_log": "1756",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2982",
        "libchange": "",
        "time_stamp": "2022-01-28 10:13:20"
    },
    {
        "id_log": "1757",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3370",
        "libchange": "",
        "time_stamp": "2022-01-28 10:20:31"
    },
    {
        "id_log": "1758",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3420",
        "libchange": "",
        "time_stamp": "2022-01-28 10:39:47"
    },
    {
        "id_log": "1759",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1733",
        "libchange": "",
        "time_stamp": "2022-01-28 10:47:19"
    },
    {
        "id_log": "1760",
        "id_user": "2",
        "id_material": "6",
        "quantity": "203",
        "libchange": "",
        "time_stamp": "2022-01-28 10:47:24"
    },
    {
        "id_log": "1761",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3435",
        "libchange": "",
        "time_stamp": "2022-01-28 10:48:40"
    },
    {
        "id_log": "1762",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3650",
        "libchange": "",
        "time_stamp": "2022-01-30 14:22:12"
    },
    {
        "id_log": "1763",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3915",
        "libchange": "",
        "time_stamp": "2022-02-02 10:32:38"
    },
    {
        "id_log": "1764",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5015",
        "libchange": "",
        "time_stamp": "2022-02-07 00:49:09"
    },
    {
        "id_log": "1765",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5300",
        "libchange": "",
        "time_stamp": "2022-02-07 09:30:23"
    },
    {
        "id_log": "1766",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5630",
        "libchange": "",
        "time_stamp": "2022-02-09 14:34:50"
    },
    {
        "id_log": "1767",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5775",
        "libchange": "",
        "time_stamp": "2022-02-09 14:37:32"
    },
    {
        "id_log": "1768",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6075",
        "libchange": "",
        "time_stamp": "2022-02-10 16:44:39"
    },
    {
        "id_log": "1769",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6255",
        "libchange": "",
        "time_stamp": "2022-02-10 17:38:19"
    },
    {
        "id_log": "1770",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1814",
        "libchange": "",
        "time_stamp": "2022-02-10 17:38:49"
    },
    {
        "id_log": "1771",
        "id_user": "2",
        "id_material": "6",
        "quantity": "239",
        "libchange": "",
        "time_stamp": "2022-02-10 17:38:54"
    },
    {
        "id_log": "1772",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6340",
        "libchange": "",
        "time_stamp": "2022-02-11 10:38:49"
    },
    {
        "id_log": "1773",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6435",
        "libchange": "",
        "time_stamp": "2022-02-11 11:08:53"
    },
    {
        "id_log": "1774",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7100",
        "libchange": "",
        "time_stamp": "2022-02-14 00:23:50"
    },
    {
        "id_log": "1775",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8635",
        "libchange": "",
        "time_stamp": "2022-02-20 14:46:09"
    },
    {
        "id_log": "1776",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9415",
        "libchange": "",
        "time_stamp": "2022-02-22 14:42:10"
    },
    {
        "id_log": "1777",
        "id_user": "2",
        "id_material": "5",
        "quantity": "2003",
        "libchange": "",
        "time_stamp": "2022-02-22 14:51:22"
    },
    {
        "id_log": "1778",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1863",
        "libchange": "",
        "time_stamp": "2022-02-22 14:51:32"
    },
    {
        "id_log": "1779",
        "id_user": "2",
        "id_material": "6",
        "quantity": "272",
        "libchange": "",
        "time_stamp": "2022-02-22 14:51:36"
    },
    {
        "id_log": "1780",
        "id_user": "2",
        "id_material": "4",
        "quantity": "580714",
        "libchange": "",
        "time_stamp": "2022-02-22 15:09:39"
    },
    {
        "id_log": "1781",
        "id_user": "2",
        "id_material": "4",
        "quantity": "565714",
        "libchange": "",
        "time_stamp": "2022-02-22 15:10:00"
    },
    {
        "id_log": "1782",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9945",
        "libchange": "",
        "time_stamp": "2022-02-24 13:31:51"
    },
    {
        "id_log": "1783",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10730",
        "libchange": "",
        "time_stamp": "2022-02-24 13:38:16"
    },
    {
        "id_log": "1784",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10985",
        "libchange": "",
        "time_stamp": "2022-02-24 14:41:44"
    },
    {
        "id_log": "1785",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11125",
        "libchange": "",
        "time_stamp": "2022-02-24 14:43:17"
    },
    {
        "id_log": "1786",
        "id_user": "2",
        "id_material": "58",
        "quantity": "154",
        "libchange": "",
        "time_stamp": "2022-02-24 15:12:38"
    },
    {
        "id_log": "1787",
        "id_user": "2",
        "id_material": "5",
        "quantity": "1987",
        "libchange": "",
        "time_stamp": "2022-02-25 12:53:06"
    },
    {
        "id_log": "1788",
        "id_user": "2",
        "id_material": "6",
        "quantity": "294",
        "libchange": "",
        "time_stamp": "2022-02-25 12:53:23"
    },
    {
        "id_log": "1789",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12355",
        "libchange": "",
        "time_stamp": "2022-02-25 14:53:24"
    },
    {
        "id_log": "1790",
        "id_user": "2",
        "id_material": "1",
        "quantity": "13130",
        "libchange": "",
        "time_stamp": "2022-02-27 14:47:31"
    },
    {
        "id_log": "1791",
        "id_user": "2",
        "id_material": "1",
        "quantity": "13405",
        "libchange": "",
        "time_stamp": "2022-02-27 22:54:05"
    },
    {
        "id_log": "1792",
        "id_user": "2",
        "id_material": "1",
        "quantity": "13775",
        "libchange": "",
        "time_stamp": "2022-03-01 09:55:50"
    },
    {
        "id_log": "1793",
        "id_user": "2",
        "id_material": "1",
        "quantity": "13785",
        "libchange": "",
        "time_stamp": "2022-03-01 16:51:00"
    },
    {
        "id_log": "1794",
        "id_user": "2",
        "id_material": "1",
        "quantity": "13905",
        "libchange": "",
        "time_stamp": "2022-03-01 17:42:17"
    },
    {
        "id_log": "1795",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14135",
        "libchange": "",
        "time_stamp": "2022-03-01 22:51:07"
    },
    {
        "id_log": "1796",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14275",
        "libchange": "",
        "time_stamp": "2022-03-01 23:33:23"
    },
    {
        "id_log": "1797",
        "id_user": "2",
        "id_material": "1",
        "quantity": "15030",
        "libchange": null,
        "time_stamp": "2022-03-02 16:59:19"
    },
    {
        "id_log": "1798",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12230",
        "libchange": null,
        "time_stamp": "2022-03-02 17:00:11"
    },
    {
        "id_log": "1799",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12975",
        "libchange": "",
        "time_stamp": "2022-03-04 17:03:12"
    },
    {
        "id_log": "1800",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11015",
        "libchange": "",
        "time_stamp": "2022-03-04 17:04:29"
    },
    {
        "id_log": "1801",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10455",
        "libchange": "",
        "time_stamp": "2022-03-04 17:06:23"
    },
    {
        "id_log": "1802",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10470",
        "libchange": "",
        "time_stamp": "2022-03-04 17:07:06"
    },
    {
        "id_log": "1803",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9350",
        "libchange": "",
        "time_stamp": "2022-03-04 17:08:38"
    },
    {
        "id_log": "1804",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9350",
        "libchange": "",
        "time_stamp": "2022-03-04 17:37:19"
    },
    {
        "id_log": "1805",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9400",
        "libchange": "",
        "time_stamp": "2022-03-04 17:58:53"
    },
    {
        "id_log": "1806",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9670",
        "libchange": "",
        "time_stamp": "2022-03-04 19:46:34"
    },
    {
        "id_log": "1807",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9770",
        "libchange": "",
        "time_stamp": "2022-03-04 21:28:17"
    },
    {
        "id_log": "1808",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9908",
        "libchange": "",
        "time_stamp": "2022-03-05 13:49:28"
    },
    {
        "id_log": "1809",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9918",
        "libchange": "",
        "time_stamp": "2022-03-05 13:52:23"
    },
    {
        "id_log": "1810",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9918",
        "libchange": "",
        "time_stamp": "2022-03-05 15:33:55"
    },
    {
        "id_log": "1811",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10388",
        "libchange": "",
        "time_stamp": "2022-03-06 12:46:15"
    },
    {
        "id_log": "1812",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10483",
        "libchange": "",
        "time_stamp": "2022-03-06 14:10:23"
    },
    {
        "id_log": "1813",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10678",
        "libchange": "",
        "time_stamp": "2022-03-06 15:40:54"
    },
    {
        "id_log": "1814",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11498",
        "libchange": "",
        "time_stamp": "2022-03-06 19:14:31"
    },
    {
        "id_log": "1815",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12003",
        "libchange": "",
        "time_stamp": "2022-03-07 13:54:28"
    },
    {
        "id_log": "1816",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10603",
        "libchange": "",
        "time_stamp": "2022-03-07 13:57:45"
    },
    {
        "id_log": "1817",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10848",
        "libchange": "",
        "time_stamp": "2022-03-07 19:21:24"
    },
    {
        "id_log": "1818",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11183",
        "libchange": "",
        "time_stamp": "2022-03-09 18:21:12"
    },
    {
        "id_log": "1819",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11233",
        "libchange": "",
        "time_stamp": "2022-03-09 18:23:10"
    },
    {
        "id_log": "1820",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2553",
        "libchange": "",
        "time_stamp": "2022-03-09 18:27:03"
    },
    {
        "id_log": "1821",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2603",
        "libchange": "",
        "time_stamp": "2022-03-09 18:33:43"
    },
    {
        "id_log": "1822",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2858",
        "libchange": null,
        "time_stamp": "2022-03-10 23:14:00"
    },
    {
        "id_log": "1823",
        "id_user": "2",
        "id_material": "1",
        "quantity": "58",
        "libchange": null,
        "time_stamp": "2022-03-10 23:15:24"
    },
    {
        "id_log": "1824",
        "id_user": "2",
        "id_material": "1",
        "quantity": "308",
        "libchange": null,
        "time_stamp": "2022-03-10 23:17:44"
    },
    {
        "id_log": "1825",
        "id_user": "2",
        "id_material": "1",
        "quantity": "28",
        "libchange": null,
        "time_stamp": "2022-03-10 23:21:38"
    },
    {
        "id_log": "1826",
        "id_user": "2",
        "id_material": "1",
        "quantity": "238",
        "libchange": "",
        "time_stamp": "2022-03-12 14:01:21"
    },
    {
        "id_log": "1827",
        "id_user": "2",
        "id_material": "1",
        "quantity": "288",
        "libchange": "",
        "time_stamp": "2022-03-12 14:01:36"
    },
    {
        "id_log": "1828",
        "id_user": "2",
        "id_material": "1",
        "quantity": "653",
        "libchange": "",
        "time_stamp": "2022-03-12 16:14:17"
    },
    {
        "id_log": "1829",
        "id_user": "2",
        "id_material": "8",
        "quantity": "728",
        "libchange": "",
        "time_stamp": "2022-03-13 13:54:07"
    },
    {
        "id_log": "1830",
        "id_user": "2",
        "id_material": "1",
        "quantity": "728",
        "libchange": "",
        "time_stamp": "2022-03-13 13:54:16"
    },
    {
        "id_log": "1831",
        "id_user": "2",
        "id_material": "58",
        "quantity": "875",
        "libchange": "",
        "time_stamp": "2022-03-13 13:54:39"
    },
    {
        "id_log": "1832",
        "id_user": "2",
        "id_material": "58",
        "quantity": "639",
        "libchange": "",
        "time_stamp": "2022-03-13 13:55:12"
    },
    {
        "id_log": "1833",
        "id_user": "2",
        "id_material": "9",
        "quantity": "7154",
        "libchange": "",
        "time_stamp": "2022-03-13 13:55:45"
    },
    {
        "id_log": "1834",
        "id_user": "2",
        "id_material": "9",
        "quantity": "6954",
        "libchange": "",
        "time_stamp": "2022-03-13 13:56:05"
    },
    {
        "id_log": "1835",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2203",
        "libchange": "",
        "time_stamp": "2022-03-20 13:39:46"
    },
    {
        "id_log": "1836",
        "id_user": "2",
        "id_material": "1",
        "quantity": "2303",
        "libchange": "",
        "time_stamp": "2022-03-20 14:16:27"
    },
    {
        "id_log": "1837",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3018",
        "libchange": "",
        "time_stamp": "2022-03-22 19:58:41"
    },
    {
        "id_log": "1838",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3418",
        "libchange": "",
        "time_stamp": "2022-03-23 14:58:29"
    },
    {
        "id_log": "1839",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4513",
        "libchange": "",
        "time_stamp": "2022-03-30 10:22:27"
    },
    {
        "id_log": "1840",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4553",
        "libchange": "",
        "time_stamp": "2022-03-30 10:23:04"
    },
    {
        "id_log": "1841",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4738",
        "libchange": "",
        "time_stamp": "2022-03-30 22:14:31"
    },
    {
        "id_log": "1842",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5823",
        "libchange": "",
        "time_stamp": "2022-04-03 18:44:14"
    },
    {
        "id_log": "1843",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6103",
        "libchange": "",
        "time_stamp": "2022-04-03 19:19:35"
    },
    {
        "id_log": "1844",
        "id_user": "2",
        "id_material": "4",
        "quantity": "490217",
        "libchange": "",
        "time_stamp": "2022-04-03 21:32:21"
    },
    {
        "id_log": "1845",
        "id_user": "2",
        "id_material": "4",
        "quantity": "457217",
        "libchange": "",
        "time_stamp": "2022-04-03 21:33:25"
    },
    {
        "id_log": "1846",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6368",
        "libchange": "",
        "time_stamp": "2022-04-04 17:08:56"
    },
    {
        "id_log": "1847",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7678",
        "libchange": "",
        "time_stamp": "2022-04-07 19:22:23"
    },
    {
        "id_log": "1848",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7708",
        "libchange": "",
        "time_stamp": "2022-04-07 22:20:10"
    },
    {
        "id_log": "1849",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8043",
        "libchange": "",
        "time_stamp": "2022-04-10 13:36:11"
    },
    {
        "id_log": "1850",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8118",
        "libchange": "",
        "time_stamp": "2022-04-10 13:53:01"
    },
    {
        "id_log": "1851",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9473",
        "libchange": "",
        "time_stamp": "2022-04-16 16:05:01"
    },
    {
        "id_log": "1852",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10163",
        "libchange": "",
        "time_stamp": "2022-04-18 12:57:13"
    },
    {
        "id_log": "1853",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9883",
        "libchange": "",
        "time_stamp": "2022-04-18 13:03:22"
    },
    {
        "id_log": "1854",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10478",
        "libchange": "",
        "time_stamp": "2022-04-20 18:44:23"
    },
    {
        "id_log": "1855",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10628",
        "libchange": "",
        "time_stamp": "2022-04-20 19:07:03"
    },
    {
        "id_log": "1856",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10888",
        "libchange": "",
        "time_stamp": "2022-04-20 22:32:21"
    },
    {
        "id_log": "1857",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11128",
        "libchange": "",
        "time_stamp": "2022-04-21 13:07:02"
    },
    {
        "id_log": "1858",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11168",
        "libchange": "",
        "time_stamp": "2022-04-21 13:10:16"
    },
    {
        "id_log": "1859",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11268",
        "libchange": "",
        "time_stamp": "2022-04-21 13:42:26"
    },
    {
        "id_log": "1860",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11308",
        "libchange": "",
        "time_stamp": "2022-04-21 15:26:32"
    },
    {
        "id_log": "1861",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12358",
        "libchange": "",
        "time_stamp": "2022-04-21 22:28:13"
    },
    {
        "id_log": "1862",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12359",
        "libchange": "",
        "time_stamp": "2022-05-05 20:19:49"
    },
    {
        "id_log": "1863",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14833",
        "libchange": "",
        "time_stamp": "2022-05-13 18:54:39"
    },
    {
        "id_log": "1864",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12033",
        "libchange": "",
        "time_stamp": "2022-05-13 18:56:20"
    },
    {
        "id_log": "1865",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10073",
        "libchange": "",
        "time_stamp": "2022-05-13 19:03:51"
    },
    {
        "id_log": "1866",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10173",
        "libchange": "",
        "time_stamp": "2022-05-13 19:36:24"
    },
    {
        "id_log": "1867",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10174",
        "libchange": "",
        "time_stamp": "2022-05-13 19:49:39"
    },
    {
        "id_log": "1868",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10198",
        "libchange": "",
        "time_stamp": "2022-05-13 19:57:49"
    },
    {
        "id_log": "1869",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10268",
        "libchange": "",
        "time_stamp": "2022-05-13 20:53:53"
    },
    {
        "id_log": "1870",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10343",
        "libchange": "",
        "time_stamp": "2022-05-13 22:10:54"
    },
    {
        "id_log": "1871",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10503",
        "libchange": "",
        "time_stamp": "2022-05-14 23:30:37"
    },
    {
        "id_log": "1872",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10643",
        "libchange": "",
        "time_stamp": "2022-05-15 21:45:20"
    },
    {
        "id_log": "1873",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10923",
        "libchange": "",
        "time_stamp": "2022-05-15 23:32:07"
    },
    {
        "id_log": "1874",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12008",
        "libchange": "",
        "time_stamp": "2022-05-19 22:48:57"
    },
    {
        "id_log": "1875",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11448",
        "libchange": "",
        "time_stamp": "2022-05-19 22:50:35"
    },
    {
        "id_log": "1876",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8663",
        "libchange": "",
        "time_stamp": "2022-05-20 03:02:07"
    },
    {
        "id_log": "1877",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8783",
        "libchange": "",
        "time_stamp": "2022-05-20 13:30:39"
    },
    {
        "id_log": "1878",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8903",
        "libchange": "",
        "time_stamp": "2022-05-21 15:46:04"
    },
    {
        "id_log": "1879",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9053",
        "libchange": "",
        "time_stamp": "2022-05-22 23:10:52"
    },
    {
        "id_log": "1880",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9228",
        "libchange": "",
        "time_stamp": "2022-05-22 23:31:52"
    },
    {
        "id_log": "1881",
        "id_user": "2",
        "id_material": "3",
        "quantity": "2301995",
        "libchange": "",
        "time_stamp": "2022-05-22 23:32:11"
    },
    {
        "id_log": "1882",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9618",
        "libchange": "",
        "time_stamp": "2022-05-23 01:50:03"
    },
    {
        "id_log": "1883",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9823",
        "libchange": "",
        "time_stamp": "2022-05-23 14:33:09"
    },
    {
        "id_log": "1884",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10088",
        "libchange": "",
        "time_stamp": "2022-05-24 14:01:18"
    },
    {
        "id_log": "1885",
        "id_user": "2",
        "id_material": "1",
        "quantity": "4809",
        "libchange": null,
        "time_stamp": "2019-05-06 21:49:28"
    },
    {
        "id_log": "1886",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10138",
        "libchange": "",
        "time_stamp": "2022-05-24 17:43:52"
    },
    {
        "id_log": "1887",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10343",
        "libchange": "",
        "time_stamp": "2022-05-25 15:08:54"
    },
    {
        "id_log": "1888",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10458",
        "libchange": "",
        "time_stamp": "2022-05-25 15:28:19"
    },
    {
        "id_log": "1889",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10598",
        "libchange": "",
        "time_stamp": "2022-05-25 15:31:54"
    },
    {
        "id_log": "1890",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10798",
        "libchange": "",
        "time_stamp": "2022-05-25 15:32:39"
    },
    {
        "id_log": "1891",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10898",
        "libchange": "",
        "time_stamp": "2022-05-25 16:54:54"
    },
    {
        "id_log": "1892",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11178",
        "libchange": "",
        "time_stamp": "2022-05-26 21:24:43"
    },
    {
        "id_log": "1893",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11218",
        "libchange": "",
        "time_stamp": "2022-05-27 14:23:47"
    },
    {
        "id_log": "1894",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11238",
        "libchange": "",
        "time_stamp": "2022-05-27 14:29:15"
    },
    {
        "id_log": "1895",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10678",
        "libchange": "",
        "time_stamp": "2022-05-27 14:33:36"
    },
    {
        "id_log": "1896",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10398",
        "libchange": "",
        "time_stamp": "2022-05-27 14:34:44"
    },
    {
        "id_log": "1897",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9558",
        "libchange": "",
        "time_stamp": "2022-05-27 14:37:37"
    },
    {
        "id_log": "1898",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8158",
        "libchange": "",
        "time_stamp": "2022-05-27 14:38:56"
    },
    {
        "id_log": "1899",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7878",
        "libchange": "",
        "time_stamp": "2022-05-27 14:40:51"
    },
    {
        "id_log": "1900",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7938",
        "libchange": "",
        "time_stamp": "2022-05-27 14:46:27"
    },
    {
        "id_log": "1901",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7658",
        "libchange": "",
        "time_stamp": "2022-05-27 14:47:40"
    },
    {
        "id_log": "1902",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7858",
        "libchange": "",
        "time_stamp": "2022-05-27 14:48:04"
    },
    {
        "id_log": "1903",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7908",
        "libchange": "",
        "time_stamp": "2022-05-27 16:34:46"
    },
    {
        "id_log": "1904",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7948",
        "libchange": "",
        "time_stamp": "2022-05-29 13:42:25"
    },
    {
        "id_log": "1905",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8078",
        "libchange": "",
        "time_stamp": "2022-05-29 13:45:59"
    },
    {
        "id_log": "1906",
        "id_user": "2",
        "id_material": "5",
        "quantity": "3182",
        "libchange": "",
        "time_stamp": "2022-05-29 13:50:51"
    },
    {
        "id_log": "1907",
        "id_user": "2",
        "id_material": "6",
        "quantity": "1186",
        "libchange": "",
        "time_stamp": "2022-05-29 13:51:18"
    },
    {
        "id_log": "1908",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8128",
        "libchange": "",
        "time_stamp": "2022-05-29 14:45:56"
    },
    {
        "id_log": "1909",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8208",
        "libchange": "",
        "time_stamp": "2022-05-30 01:32:58"
    },
    {
        "id_log": "1910",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8488",
        "libchange": "",
        "time_stamp": "2022-05-30 01:34:45"
    },
    {
        "id_log": "1911",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9028",
        "libchange": "",
        "time_stamp": "2022-05-30 14:49:26"
    },
    {
        "id_log": "1912",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9068",
        "libchange": "",
        "time_stamp": "2022-05-30 14:57:37"
    },
    {
        "id_log": "1913",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9333",
        "libchange": "",
        "time_stamp": "2022-06-01 19:53:16"
    },
    {
        "id_log": "1914",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8493",
        "libchange": "",
        "time_stamp": "2022-06-01 19:57:18"
    },
    {
        "id_log": "1915",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8543",
        "libchange": "",
        "time_stamp": "2022-06-01 19:58:43"
    },
    {
        "id_log": "1916",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8783",
        "libchange": "",
        "time_stamp": "2022-06-02 00:48:54"
    },
    {
        "id_log": "1917",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10068",
        "libchange": "",
        "time_stamp": "2022-06-08 15:32:29"
    },
    {
        "id_log": "1918",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9228",
        "libchange": "",
        "time_stamp": "2022-06-08 15:33:37"
    },
    {
        "id_log": "1919",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8388",
        "libchange": "",
        "time_stamp": "2022-06-08 15:34:38"
    },
    {
        "id_log": "1920",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7548",
        "libchange": "",
        "time_stamp": "2022-06-08 15:36:39"
    },
    {
        "id_log": "1921",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7598",
        "libchange": "",
        "time_stamp": "2022-06-08 15:37:14"
    },
    {
        "id_log": "1922",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7683",
        "libchange": "",
        "time_stamp": "2022-06-08 15:43:53"
    },
    {
        "id_log": "1923",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7758",
        "libchange": "",
        "time_stamp": "2022-06-08 15:58:36"
    },
    {
        "id_log": "1924",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7858",
        "libchange": "",
        "time_stamp": "2022-06-08 16:12:16"
    },
    {
        "id_log": "1925",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7958",
        "libchange": "",
        "time_stamp": "2022-06-08 17:08:38"
    },
    {
        "id_log": "1926",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8178",
        "libchange": "",
        "time_stamp": "2022-06-10 02:21:49"
    },
    {
        "id_log": "1927",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5658",
        "libchange": "",
        "time_stamp": "2022-06-10 02:34:01"
    },
    {
        "id_log": "1928",
        "id_user": "2",
        "id_material": "1",
        "quantity": "5848",
        "libchange": "",
        "time_stamp": "2022-06-10 23:08:52"
    },
    {
        "id_log": "1929",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6468",
        "libchange": "",
        "time_stamp": "2022-06-12 23:30:01"
    },
    {
        "id_log": "1930",
        "id_user": "2",
        "id_material": "1",
        "quantity": "6768",
        "libchange": "",
        "time_stamp": "2022-06-13 00:53:17"
    },
    {
        "id_log": "1931",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7023",
        "libchange": "",
        "time_stamp": "2022-06-15 00:38:23"
    },
    {
        "id_log": "1932",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7138",
        "libchange": "",
        "time_stamp": "2022-06-15 21:22:35"
    },
    {
        "id_log": "1933",
        "id_user": "2",
        "id_material": "5",
        "quantity": "3446",
        "libchange": "",
        "time_stamp": "2022-06-15 21:23:40"
    },
    {
        "id_log": "1934",
        "id_user": "2",
        "id_material": "5",
        "quantity": "3306",
        "libchange": "",
        "time_stamp": "2022-06-15 21:23:57"
    },
    {
        "id_log": "1935",
        "id_user": "2",
        "id_material": "1",
        "quantity": "7213",
        "libchange": "",
        "time_stamp": "2022-06-15 21:51:34"
    },
    {
        "id_log": "1936",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8428",
        "libchange": "",
        "time_stamp": "2022-06-21 19:30:29"
    },
    {
        "id_log": "1937",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8858",
        "libchange": "",
        "time_stamp": "2022-06-23 14:18:39"
    },
    {
        "id_log": "1938",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8898",
        "libchange": "",
        "time_stamp": "2022-06-23 14:22:25"
    },
    {
        "id_log": "1939",
        "id_user": "2",
        "id_material": "1",
        "quantity": "8958",
        "libchange": "",
        "time_stamp": "2022-06-23 15:11:19"
    },
    {
        "id_log": "1940",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9298",
        "libchange": "",
        "time_stamp": "2022-06-24 12:24:53"
    },
    {
        "id_log": "1941",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9486",
        "libchange": "",
        "time_stamp": "2022-06-24 12:27:52"
    },
    {
        "id_log": "1942",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9726",
        "libchange": "",
        "time_stamp": "2022-06-26 22:39:42"
    },
    {
        "id_log": "1943",
        "id_user": "2",
        "id_material": "1",
        "quantity": "9966",
        "libchange": "",
        "time_stamp": "2022-06-27 01:15:05"
    },
    {
        "id_log": "1944",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10166",
        "libchange": "",
        "time_stamp": "2022-06-27 19:02:31"
    },
    {
        "id_log": "1945",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10226",
        "libchange": "",
        "time_stamp": "2022-06-27 21:23:28"
    },
    {
        "id_log": "1946",
        "id_user": "2",
        "id_material": "1",
        "quantity": "10581",
        "libchange": "",
        "time_stamp": "2022-06-29 22:48:25"
    },
    {
        "id_log": "1947",
        "id_user": "2",
        "id_material": "1",
        "quantity": "11726",
        "libchange": "",
        "time_stamp": "2022-06-30 13:49:55"
    },
    {
        "id_log": "1948",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12016",
        "libchange": "",
        "time_stamp": "2022-07-02 01:56:08"
    },
    {
        "id_log": "1949",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12636",
        "libchange": "",
        "time_stamp": "2022-07-05 17:48:28"
    },
    {
        "id_log": "1950",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12801",
        "libchange": "",
        "time_stamp": "2022-07-05 18:42:24"
    },
    {
        "id_log": "1951",
        "id_user": "2",
        "id_material": "4",
        "quantity": "499611",
        "libchange": "",
        "time_stamp": "2022-07-06 21:12:00"
    },
    {
        "id_log": "1952",
        "id_user": "2",
        "id_material": "2",
        "quantity": "180498537",
        "libchange": "",
        "time_stamp": "2022-07-06 21:14:03"
    },
    {
        "id_log": "1953",
        "id_user": "2",
        "id_material": "1",
        "quantity": "12961",
        "libchange": "",
        "time_stamp": "2022-07-06 21:45:28"
    },
    {
        "id_log": "1954",
        "id_user": "2",
        "id_material": "1",
        "quantity": "13491",
        "libchange": "",
        "time_stamp": "2022-07-09 22:18:23"
    },
    {
        "id_log": "1955",
        "id_user": "2",
        "id_material": "1",
        "quantity": "13651",
        "libchange": "",
        "time_stamp": "2022-07-09 22:46:44"
    },
    {
        "id_log": "1956",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14071",
        "libchange": "",
        "time_stamp": "2022-07-10 15:06:13"
    },
    {
        "id_log": "1957",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14146",
        "libchange": "",
        "time_stamp": "2022-07-10 19:26:15"
    },
    {
        "id_log": "1958",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14546",
        "libchange": "",
        "time_stamp": "2022-07-10 22:48:37"
    },
    {
        "id_log": "1959",
        "id_user": "2",
        "id_material": "1",
        "quantity": "14946",
        "libchange": "",
        "time_stamp": "2022-07-11 13:14:06"
    },
    {
        "id_log": "1960",
        "id_user": "2",
        "id_material": "1",
        "quantity": "15301",
        "libchange": "",
        "time_stamp": "2022-07-13 15:50:06"
    },
    {
        "id_log": "1961",
        "id_user": "2",
        "id_material": "1",
        "quantity": "15021",
        "libchange": "",
        "time_stamp": "2022-07-13 21:40:09"
    },
    {
        "id_log": "1962",
        "id_user": "2",
        "id_material": "1",
        "quantity": "15471",
        "libchange": "",
        "time_stamp": "2022-07-13 22:30:35"
    },
    {
        "id_log": "1963",
        "id_user": "2",
        "id_material": "1",
        "quantity": "15811",
        "libchange": "",
        "time_stamp": "2022-07-14 13:18:39"
    },
    {
        "id_log": "1964",
        "id_user": "2",
        "id_material": "1",
        "quantity": "15901",
        "libchange": "",
        "time_stamp": "2022-07-15 14:54:33"
    },
    {
        "id_log": "1965",
        "id_user": "2",
        "id_material": "1",
        "quantity": "16421",
        "libchange": "",
        "time_stamp": "2022-07-19 00:03:44"
    },
    {
        "id_log": "1966",
        "id_user": "2",
        "id_material": "1",
        "quantity": "16586",
        "libchange": "",
        "time_stamp": "2022-07-19 19:25:23"
    },
    {
        "id_log": "1967",
        "id_user": "2",
        "id_material": "1",
        "quantity": "16636",
        "libchange": "",
        "time_stamp": "2022-07-19 20:14:11"
    },
    {
        "id_log": "1968",
        "id_user": "2",
        "id_material": "1",
        "quantity": "16686",
        "libchange": "",
        "time_stamp": "2022-07-19 20:53:06"
    },
    {
        "id_log": "1969",
        "id_user": "2",
        "id_material": "1",
        "quantity": "16836",
        "libchange": "",
        "time_stamp": "2022-07-20 14:20:12"
    },
    {
        "id_log": "1970",
        "id_user": "2",
        "id_material": "1",
        "quantity": "17116",
        "libchange": "",
        "time_stamp": "2022-07-21 13:50:46"
    },
    {
        "id_log": "1971",
        "id_user": "2",
        "id_material": "1",
        "quantity": "17146",
        "libchange": "",
        "time_stamp": "2022-07-21 14:28:48"
    },
    {
        "id_log": "1972",
        "id_user": "2",
        "id_material": "1",
        "quantity": "17356",
        "libchange": "",
        "time_stamp": "2022-07-22 13:30:28"
    },
    {
        "id_log": "1973",
        "id_user": "2",
        "id_material": "1",
        "quantity": "17516",
        "libchange": "",
        "time_stamp": "2022-07-22 21:54:05"
    },
    {
        "id_log": "1974",
        "id_user": "2",
        "id_material": "1",
        "quantity": "19201",
        "libchange": "",
        "time_stamp": "2022-08-01 00:28:14"
    },
    {
        "id_log": "1975",
        "id_user": "2",
        "id_material": "1",
        "quantity": "19651",
        "libchange": "",
        "time_stamp": "2022-08-01 01:11:38"
    },
    {
        "id_log": "1976",
        "id_user": "2",
        "id_material": "1",
        "quantity": "22651",
        "libchange": "",
        "time_stamp": "2022-08-11 12:04:42"
    },
    {
        "id_log": "1977",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3611",
        "libchange": "",
        "time_stamp": "2022-08-11 12:07:24"
    },
    {
        "id_log": "1978",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3611",
        "libchange": "",
        "time_stamp": "2022-08-11 12:07:30"
    },
    {
        "id_log": "1979",
        "id_user": "2",
        "id_material": "1",
        "quantity": "3626",
        "libchange": "",
        "time_stamp": "2022-08-11 12:11:46"
    },
    {
        "id_log": "1980",
        "id_user": "2",
        "id_material": "1",
        "quantity": "266",
        "libchange": "",
        "time_stamp": "2022-08-11 12:39:18"
    },
    {
        "id_log": "1981",
        "id_user": "2",
        "id_material": "1",
        "quantity": "281",
        "libchange": "",
        "time_stamp": "2022-08-11 12:39:23"
    },
    {
        "id_log": "1982",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1",
        "libchange": "",
        "time_stamp": "2022-08-11 12:52:23"
    },
    {
        "id_log": "1983",
        "id_user": "2",
        "id_material": "1",
        "quantity": "86",
        "libchange": "",
        "time_stamp": "2022-08-11 12:52:27"
    },
    {
        "id_log": "1984",
        "id_user": "2",
        "id_material": "1",
        "quantity": "796",
        "libchange": "",
        "time_stamp": "2022-08-11 14:16:20"
    },
    {
        "id_log": "1985",
        "id_user": "2",
        "id_material": "8",
        "quantity": "1656",
        "libchange": "",
        "time_stamp": "2022-08-14 19:13:11"
    },
    {
        "id_log": "1986",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1656",
        "libchange": "",
        "time_stamp": "2022-08-14 19:13:18"
    },
    {
        "id_log": "1987",
        "id_user": "2",
        "id_material": "1",
        "quantity": "256",
        "libchange": "",
        "time_stamp": "2022-08-14 19:17:19"
    },
    {
        "id_log": "1988",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1666",
        "libchange": "",
        "time_stamp": "2022-08-20 15:45:50"
    },
    {
        "id_log": "1989",
        "id_user": "2",
        "id_material": "1",
        "quantity": "266",
        "libchange": "",
        "time_stamp": "2022-08-20 16:03:41"
    },
    {
        "id_log": "1990",
        "id_user": "2",
        "id_material": "1",
        "quantity": "411",
        "libchange": "",
        "time_stamp": "2022-08-20 16:03:52"
    },
    {
        "id_log": "1991",
        "id_user": "2",
        "id_material": "1",
        "quantity": "511",
        "libchange": "",
        "time_stamp": "2022-08-20 19:19:41"
    },
    {
        "id_log": "1992",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1516",
        "libchange": "",
        "time_stamp": "2022-08-24 17:13:31"
    },
    {
        "id_log": "1993",
        "id_user": "2",
        "id_material": "1",
        "quantity": "116",
        "libchange": "",
        "time_stamp": "2022-08-24 17:14:53"
    },
    {
        "id_log": "1994",
        "id_user": "2",
        "id_material": "1",
        "quantity": "1131",
        "libchange": "",
        "time_stamp": "2022-08-31 22:37:35"
    }
]

