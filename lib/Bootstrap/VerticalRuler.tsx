import {PropsWithChildren} from "react";
import {ReturnChildren} from "../../component/returnChildren";

export function VerticalRuler(props: PropsWithChildren) {
    return <div className={"vr"}>
        <ReturnChildren {...props}/>
    </div>
}