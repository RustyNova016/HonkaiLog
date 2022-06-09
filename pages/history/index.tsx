import {useSession} from "next-auth/react";
import {GenericPageLayout} from "../../component/pageComponents/GenericPageLayout";
import {Navigation} from "../../component/pageComponents/header/Navigation";

export default function MatHistory () {
    const session = useSession();
    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        }
    }

    return <>
        <GenericPageLayout pushFooter={true}>
            <Navigation/>
        </GenericPageLayout>
    </>
}