import {DivProps} from "@/components/UI/Cards/Card";

export function Col(props: DivProps) {
    return <div className={"flex col justify-content-center align-items-center" + props.className} style={props.style}>
        {props.children}
    </div>
}

export function Row(props: DivProps) {
    return <div className={"flex row justify-content-center align-items-center" + props.className} style={props.style}>
        {props.children}
    </div>
}