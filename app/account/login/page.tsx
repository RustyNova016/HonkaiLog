import {CenterContent} from "../../../components/layout/CenterContent/CenterContent";
import FramedDiv from "../../../components/layout/FramedDiv/FramedDiv";
import {LinkButtons} from "../../../components/utils/buttons/LinkButtons";
import {routes} from "../../../tools/routes";
import {LoginForm} from "./loginForm";

export default function Login() {

    return (
        <CenterContent>
            <FramedDiv className={"flex-col"} sides={true}>
                <h2>Login</h2>

                <LoginForm/>
            </FramedDiv>
        </CenterContent>
    )
}