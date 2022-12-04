import {PropsWithChildren} from "react";
import {Navigation} from "@/components/UI/Navigation/Navigation";

export default function (props: PropsWithChildren) {
    return <>
        <Navigation/>
        {props.children}
    </>
}