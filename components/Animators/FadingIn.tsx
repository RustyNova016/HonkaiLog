"use client";
import {PropsWithChildren} from "react";
import {Fade, FadeProps} from "react-awesome-reveal";

export function FadingIn(props: PropsWithChildren & FadeProps) {
    return <Fade {...props}>
        {props.children}
    </Fade>
}