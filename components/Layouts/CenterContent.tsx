import {PropsWithChildren} from "react";

export function CenterContent(props: PropsWithChildren) {
    return <div className={"flex flex-col overflow-scroll"} style={{height: "inherit", justifyContent: "center", alignItems: "center"}}>
        {props.children}
    </div>
}