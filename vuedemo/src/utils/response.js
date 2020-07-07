const data = {
    train_model: {
        "totalSize": 10,
        "data": [
            {
                "id": "1",
                "model_name": "相似度匹配",
                "remark": "基于bert，主要用于事理图谱中相似度匹配的模型",
                "create_date": "2020-07-01",
                "status": "训练中",
            },
            {
                "id": "2",
                "model_name": "关系存在性判定",
                "remark": "基于bert，主要用于事理图谱中关系存在性分析的模型",
                "create_date": "2020-07-01",
                "status": "训练中",
            },
            {
                "id": "3",
                "model_name": "关系抽取",
                "remark": "基于bert，主要用于事理图谱中关系抽取的模型",
                "create_date": "2020-07-01",
                "status": "训练中",
            },
            {
                "id": "4",
                "model_name": "事件抽取",
                "remark": "基于bert，主要用于事理图谱中事件抽取的模型",
                "create_date": "2020-07-01",
                "status": "已完成",
            },
            {
                "id": "5",
                "model_name": "事件抽取",
                "remark": "基于roberta，主要用于事理图谱中事件抽取的模型",
                "create_date": "2020-05-21",
                "status": "已完成",
            },
            {
                "id": "6",
                "model_name": "事件抽取",
                "remark": "基于roberta，主要用于事理图谱中事件抽取的模型",
                "create_date": "2020-05-21",
                "status": "已完成",
            },
            {
                "id": "7",
                "model_name": "相似度匹配",
                "remark": "基于reberta，主要用于事理图谱中相似度匹配的模型",
                "create_date": "2020-05-21",
                "status": "已完成",
            },
            {
                "id": "8",
                "model_name": "关系存在性判定",
                "remark": "基于roberta，主要用于事理图谱中关系存在性分析的模型",
                "create_date": "2020-05-21",
                "status": "已完成",
            },
            {
                "id": "9",
                "model_name": "关系抽取",
                "remark": "基于roberta，主要用于事理图谱中关系抽取的模型",
                "create_date": "2020-05-21",
                "status": "已完成",
            },
            {
                "id": "10",
                "model_name": "事件抽取",
                "remark": "基于nerza，主要用于事理图谱中事件抽取的模型",
                "create_date": "2020-04-11",
                "status": "已完成",
            }
        ]
    },
    nestdetail: {
        "eventInfo": [
            {
                "event_name": "0",
                "xlj": 839,
                "csj": 0
            },
            {
                "event_name": "11000",
                "xlj": 3,
                "csj": 3
            },
            {
                "event_name": "11044",
                "xlj": 1,
                "csj": 0
            },
            {
                "event_name": "11099",
                "xlj": 1,
                "csj": 0
            },
            {
                "event_name": "11154",
                "xlj": 1,
                "csj": 1
            },
            {
                "event_name": "11209",
                "xlj": 12,
                "csj": 0
            },
            {
                "event_name": "11418",
                "xlj": 4,
                "csj": 0
            },
            {
                "event_name": "11638",
                "xlj": 1,
                "csj": 0
            }
        ],
        "eventList": [
            {
                "event_name": "11000"
            },
            {
                "event_name": "11154"
            }
        ],
        "modelInfo": {
            "evaluation_start_date": "2018-05-07",
            "tables_name": "data_xlshuju_1,data_xlshuju_2",
            "tran_start_date": "2016-01-01",
            "tran_finish_time": "10:56:10",
            "dr_max": 6,
            "neure_num": 128,
            "create_time": "10:55:54",
            "tran_finish_date": "2020-05-26",
            "epoch": 3,
            "model_id": "5978",
            "evaluation_end_date": "2018-09-18",
            "tran_end_date": "2018-05-31",
            "train_batch_no": 64,
            "event_type": "2 ",
            "model_name": "test0526",
            "delay_max_day": 28,
            "size": 5,
            "dr_min": 3,
            "delay_min_day": 20,
            "days": 5,
            "create_date": "2020-05-26",
            "status": "2"
        },
        "modelTotInfo": [
            {
                "recall_rate": "0.0",
                "score": "0.4969",
                "false_rate": "0.0",
                "model_name": "test0526-20-5-3",
                "false_alarm_rate": "0.0",
                "bleu": "0.9688"
            },
            {
                "recall_rate": "0.0",
                "score": "0.4969",
                "false_rate": "0.0",
                "model_name": "test0526-25-5-3",
                "false_alarm_rate": "0.0",
                "bleu": "0.9688"
            }
        ]
    },
    getModelDteailByEvent: [
        {
            "tier_precision": "0.2",
            "num": 3,
            "detail_id": "70b529109efc11eabecdfa163e6d1aa9",
            "score": 0.4255,
            "tier_recall": "0.6667",
            "model_name": "test0526-20-5-3",
            "false_alarm_rate": "0.0",
            "bleu": "0.955",
            "recall_rate": "0.0",
            "event_name": "11000",
            "false_rate": "0.0",
            "test_id": "724554e49efc11eabecdfa163e6d1aa9",
            "status": "1"
        },
        {
            "tier_precision": "0.3",
            "num": 3,
            "detail_id": "70b52ab49efc11eabecdfa163e6d1aa9",
            "score": 0.4255,
            "tier_recall": "1.0",
            "model_name": "test0526-25-5-3",
            "false_alarm_rate": "0.0",
            "bleu": "0.955",
            "recall_rate": "0.0",
            "event_name": "11000",
            "false_rate": "0.0",
            "test_id": "741675e69efc11eabecdfa163e6d1aa9",
            "status": "1"
        }
    ]
}

export default data