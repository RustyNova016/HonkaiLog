import {PropsWithChildren} from "react";
import {RequireUser, UserGateProps} from "./requireUser";
import {PageHead} from "./pageHead";
import {BackgroundPicture} from "../../component/Layout/BackgroundPicture";
import {Footer} from "../../component/pageComponents/footer";
import {ReturnChildren} from "../../component/returnChildren";
import {Navigation} from "../../components/UI/Navigation/Navigation";

export interface PageProps extends PropsWithChildren, UserGateProps {
    useFooter?: boolean
    useNavbar?: boolean
}

export function Page(props: PageProps) {
    return <>
        <PageHead/>

        <BackgroundPicture>
            {props.useNavbar ? <Navigation/> : null}

            <RequireUser userNeeded={props.userNeeded}>
                <ReturnChildren {...props}/>
            </RequireUser>

            {props.useFooter ? <Footer/> : null}
        </BackgroundPicture>
    </>
}