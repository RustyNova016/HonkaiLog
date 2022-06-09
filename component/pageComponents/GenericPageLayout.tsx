// React component for the generic page layout
import {Background} from "./background";
import {Footer} from "./footer";
import {getCommonHead} from "./getCommonHead";
import styles from '../../styles/background.module.scss'
import {ErrorFallback, ErrorHandler} from "../App Components/ErrorFallback";
import {ErrorBoundary} from "react-error-boundary";

export function GenericPageLayout(props: { children: React.ReactNode, hideFooter?: boolean, pushFooter?: boolean;}) {
    return (
        <>
            {getCommonHead()}
            <Background>
                <div className={props.pushFooter? styles.footerPush : ""}>
                    <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                        {props.children}
                    </ErrorBoundary>

                </div>
                {
                    props.hideFooter ? null : <Footer/>
                }
            </Background>
        </>
    );
}