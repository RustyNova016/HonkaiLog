import {PageSkeleton} from "../../component/pageComponents/GenericPageLayout";
import {useRouter} from "next/router";
import {MaterialHistoryIDData} from "../../component/pages/History/MaterialHistoryIDData";
import {UserRedirect} from "../../component/App Components/userRedirect";
import {useEffect, useState} from "react";
import {Material} from "../../tools/Models/Material";
import {PageLoadingComponent} from "../../component/App Components/PageLoadingComponent";
import {Fade} from "react-awesome-reveal";

/** A page to display and create material logs */
export default function MaterialHistoryIDPage() {
    // Get the material ID
    const router = useRouter()
    let id_string = router.query.id;
    if (typeof id_string !== "string") {
        id_string = "1"; // TODO: Remove failsafe and actually tell that it's not valid
    }
    const id = parseInt(id_string)


    // Get the material data from the API
    const [material, setMaterial] = useState<Material>();
    const [isLoading, setLoading] = useState(false)

    const fetchMaterial = async () => {
        setLoading(true)
        const mat = await Material.getMaterialFromId(id)
        await mat.fetchLogs()
        setMaterial(mat)
        setLoading(false)
    };

    useEffect(() => {fetchMaterial()}, [id])

    return <>
        <PageSkeleton navbar={true}>
            <UserRedirect>
                {isLoading || !material ?
                    <PageLoadingComponent subtext={"Preparing material data..."}/> :
                    <Fade>
                        <MaterialHistoryIDData material={material} MaterialID={parseInt(id_string)}/>
                    </Fade>
                }
            </UserRedirect>
        </PageSkeleton>
    </>
}

