import {PropsWithChildren} from "react";
import {GLOBAL_COLORS} from "../../../component/Styling/GLOBAL_COLORS";
import {PropsWithClass, PropsWithStyle} from "../../../tools/Types";

export interface DivProps extends PropsWithChildren, PropsWithClass, PropsWithStyle{

}

export function Card(props: DivProps) {
    return <div className={"flex flex-col justify-content-center align-items-center p-2 " + props.className} style={{backgroundColor: GLOBAL_COLORS.lighter, borderRadius: 25, ...props.style}}>
        {props.children}
    </div>
}