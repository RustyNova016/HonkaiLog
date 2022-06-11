import {useSession} from "next-auth/react";
import {GenericPageLayout, PageSkeleton} from "../../component/pageComponents/GenericPageLayout";
import {Navigation} from "../../component/pageComponents/header/Navigation";
import {useRouter} from "next/router";
import {MaterialHistoryIDData} from "../../component/pages/History/MaterialHistoryIDData";


export default function MaterialHistoryIDPage() {
    const session = useSession();
    const router = useRouter()

    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        }
    }

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


