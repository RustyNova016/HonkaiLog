// React component for the generic page layout
import {BackgroundPicture} from "../Layout/BackgroundPicture";
import {Footer} from "./footer";
import {PageHead} from "../../layout/components/pageHead";
import styles from '../Layout/CSS/BackgroundPicture.module.scss'
import {ErrorFallback, ErrorHandler} from "../App Components/ErrorFallback";
import {ErrorBoundary} from "react-error-boundary";

export function GenericPageLayout(props: { children: React.ReactNode, hideFooter?: boolean, pushFooter?: boolean; }) {
    return (
        <>
            {PageHead()}
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