import {PropsWithChildren} from "react";

/** Return the children props as a JSX Element, preventing type conflicts */
export function ReturnChildren(props: PropsWithChildren): JSX.Element {
    return <>{props.children}</>;
}