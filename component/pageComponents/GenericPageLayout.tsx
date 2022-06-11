// React component for the generic page layout
import {BackgroundPicture} from "../Layout/BackgroundPicture";
import {Footer} from "./footer";
import {getCommonHead} from "./getCommonHead";
import styles from '../Layout/CSS/BackgroundPicture.module.scss'
import {ErrorFallback, ErrorHandler} from "../App Components/ErrorFallback";
import {ErrorBoundary} from "react-error-boundary";
import {Navigation} from "./header/Navigation";

export function GenericPageLayout(props: { children: React.ReactNode, hideFooter?: boolean, pushFooter?: boolean; }) {


    return (
        <>
            {getCommonHead()}
            <BackgroundPicture>

                <div style={{height: "100%"}} className={props.pushFooter ? styles.footerPush : ""}>
                    <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                        {props.children}
                    </ErrorBoundary>

                </div>
                {
                    props.hideFooter ? null : <Footer/>
                }
            </BackgroundPicture>
        </>
    );
}

export interface PageSkeletonProps {
    footer?: boolean;
    navbar?: boolean;
    children?: React.ReactNode;
}

export function PageSkeleton(props: PageSkeletonProps) {
    return <>
        {getCommonHead()}
        <BackgroundPicture>
            {props.navbar ? <Navigation/> : null}

            {props.children}

            {props.footer ? <Footer/> : null}
        </BackgroundPicture>
    </>
}