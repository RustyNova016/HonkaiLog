import {PageSkeleton} from "../../component/pageComponents/GenericPageLayout";
import {useRouter} from "next/router";
import {MaterialHistoryIDData} from "../../component/pages/History/MaterialHistoryIDData";
import {UserRedirect} from "../../component/App Components/userRedirect";

/** A page to display and create material logs */
export default function MaterialHistoryIDPage() {
    // Get the material ID
    const router = useRouter()
    let id_string = router.query.id;
    if (typeof id_string !== "string") {
        id_string = "1"; // TODO: Remove failsafe and actually tell that it's not valid
    }

    return <>
        <PageSkeleton navbar={true}>
            <UserRedirect>
                <MaterialHistoryIDData materialID={parseInt(id_string)}/>
            </UserRedirect>
        </PageSkeleton>
    </>
}

