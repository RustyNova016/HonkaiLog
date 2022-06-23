import {useSession} from "next-auth/react";
import {PageSkeleton} from "../../component/pageComponents/GenericPageLayout";
import {useRouter} from "next/router";
import {MaterialHistoryIDData} from "../../component/pages/History/MaterialHistoryIDData";
import {PageLoadingComponent} from "../../component/App Components/PageLoadingComponent";


export default function MaterialHistoryIDPage() {
    const session = useSession();
    const router = useRouter()

    if (session.status === "unauthenticated") {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        }
    } else if (session.status === "loading") return <PageLoadingComponent></PageLoadingComponent>;


    // TODO: Remove failsafe and actually tell that it's not valid
    let id = router.query.id;
    if (typeof id !== "string") {
        id = "1";
    }

    return <>
        <PageSkeleton navbar={true}>
            <MaterialHistoryIDData MaterialID={parseInt(id)}/>
        </PageSkeleton>
    </>
}


