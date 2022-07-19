import {ResponsiveLine, Serie} from "@nivo/line";
import {MaterialLogPointToolTip} from "../../../../../component/Graphs/Tooltips/MaterialLogPointToolTip";
import {NoDataErrorComponent} from "../../../../../component/App Components/Errors/NoDataErrorComponent";
import {LogsProp} from "../Summary/HistoryDataSummary";
import {MaterialHistoryGraphData} from "../../../../../tools/MaterialLogsGraph";
import {MaterialGraphTypes} from "../../../../../data/MaterialGraphTypes";
import _ from "lodash";
import {useEffect, useState} from "react";
import {PageLoadingComponent} from "../../../../../component/App Components/PageLoadingComponent";

export interface HistoryDataGraphProps extends LogsProp {
    materialGraphType: MaterialGraphTypes
}

export function HistoryDataGraph(props: HistoryDataGraphProps) {
    if (props.logs.empty()) return <NoDataErrorComponent/>
    const [dataSerie, setDataSerie] = useState<Serie[]>([MaterialHistoryGraphData.generateMaterialHistoryGraphData(props.logs, props.materialGraphType)]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("is", props.materialGraphType)
        setLoading(true)
        setDataSerie([])
        _.delay((args) => {
            setDataSerie([MaterialHistoryGraphData.generateMaterialHistoryGraphData(props.logs, props.materialGraphType)]);
            setLoading(false)
        }, 500)
    }, [props]);

    if (loading) {
        return <div style={{height: "75vh"}}>
            <PageLoadingComponent subtext={"Crunching the latest data"}></PageLoadingComponent>
        </div>
    }

    return <div style={{height: "75vh"}}>
        <ResponsiveLine
            data={dataSerie}
            margin={{top: 50, right: 110, bottom: 50, left: 60}}
            xScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
            }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Date',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 7,
                tickPadding: 7,
                tickRotation: -18,
                legend: _.capitalize(props.materialGraphType),
                legendOffset: -44,
                legendPosition: 'middle'
            }}
            colors={{scheme: 'category10'}}
            lineWidth={5}
            pointSize={10}
            pointColor={{theme: 'background'}}
            pointBorderWidth={2}
            pointBorderColor={{from: 'serieColor', modifiers: []}}
            pointLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0.15}
            useMesh={true}
            theme={{
                "textColor": 'rgba(255, 255, 255)'
            }}
            tooltip={MaterialLogPointToolTip}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(255, 255, 255)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(255, 255, 255, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            motionConfig="stiff"
        />
    </div>;
}