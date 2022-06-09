import {ResponsiveLine, Serie} from "@nivo/line";
import {MaterialCountPointToolTip} from "../../Graphs/Tooltips/MaterialCountPointToolTip";

export interface MaterialHistoryGraphProps {
    series: Serie[]
}

export function MaterialHistoryGraph(props: MaterialHistoryGraphProps) {

    return <ResponsiveLine
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
            stacked: true,
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
    ></ResponsiveLine>;
}