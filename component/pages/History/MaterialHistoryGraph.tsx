import {ResponsiveLine, Serie} from "@nivo/line";
import {MaterialCountPointToolTip} from "../../Graphs/Tooltips/MaterialCountPointToolTip";
import {Alert} from "react-bootstrap";

export interface MaterialHistoryGraphProps {
    series: Serie[]
}

function NoDataErrorComponent() {
    return <Alert variant={"danger"} style={{margin: "10px"}}>No data to display.</Alert>;
}

export function MaterialHistoryGraph(props: MaterialHistoryGraphProps) {
    if (props.series === undefined) { return <NoDataErrorComponent/> }
    if (props.series.length === 0) { return <NoDataErrorComponent/> }
    if (props.series[0]?.data.length < 2) { return <NoDataErrorComponent/> }

    return <div style={{height: "75vh"}}>
        <ResponsiveLine
            data={props.series}
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
                legend: 'transportation',
                legendOffset: 36,

            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
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
            tooltip={MaterialCountPointToolTip}
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
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            motionConfig="stiff"
        ></ResponsiveLine></div>;
}