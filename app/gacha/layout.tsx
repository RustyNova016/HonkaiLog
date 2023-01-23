import {PropsWithChildren} from "react";
import {Navigation} from "@/components/UI/Navigation/Navigation";
import {FadingIn} from "@/components/Animators/FadingIn";

export default function (props: PropsWithChildren) {
    return <>
        <div style={{display: "flex", flexFlow: "column", height: "inherit"}}>
            <FadingIn direction={"down"} cascade={true} duration={500} style={{flex: "0 1 auto"}}>
                <Navigation/>
            </FadingIn>


            <FadingIn delay={500} style={{flex: "1 1 auto", overflow: "auto"}}>
                {props.children}
            </FadingIn>
        </div>

    </>
}