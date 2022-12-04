import {PropsWithChildren} from "react";
import {Navigation} from "@/components/UI/Navigation/Navigation";
import {FadingIn} from "@/components/Animators/FadingIn";

export default function (props: PropsWithChildren) {
    return <>
        <FadingIn direction={"down"} cascade={true} duration={500}>
            <Navigation/>
        </FadingIn>
        <FadingIn delay={500} className={"size-inherit"}>
            {props.children}
        </FadingIn>
    </>
}