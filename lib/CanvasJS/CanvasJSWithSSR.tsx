"use client"
import {useEffect, useState} from "react";
import {CanvasJSChartProps} from "@/lib/CanvasJS/TS/canvasjs.react";

export function CanvasJSWithSSR(props: CanvasJSChartProps) {
    const [showGraph, setShowGraph] = useState(false);
    // Detect if the component is on the client
    useEffect(() => {
        console.log("using the effect");
        if (typeof window === 'object') {
            console.log("We have a window!");
            // Check if document is finally loaded
            setShowGraph(true)
        }
    }, []);
    if (!showGraph) {return <>CanvasJS cannot load on serverside</>}

    const {CanvasJSChart} = require('@/lib/CanvasJS/TS/canvasjs.react');
    return (<CanvasJSChart options={props.options}/>);
}