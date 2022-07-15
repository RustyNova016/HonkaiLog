import {useRouter} from "next/router";
import {MaterialIDContext} from "../../features/Material/contexts/MaterialIDContext";
import {Page} from "../../layout/components/page";
import {Fade} from "react-awesome-reveal";
import {MaterialInfoPageContent} from "../../features/MaterialInfoPageContent";

/** A page to display information about a material and create material logs*/
export default function MaterialInfo() {
    // Get the material ID
    const router = useRouter()
    let id_string = router.query.id;

    if (typeof id_string !== "string") {
        id_string = "1"; // TODO: Remove failsafe and actually tell that it's not valid
    }

    return <>
        <Page userNeeded={true} useNavbar={true}>
            <MaterialIDContext.Provider value={parseInt(id_string)}>
                <Fade>
                    <MaterialInfoPageContent></MaterialInfoPageContent>
                </Fade>
            </MaterialIDContext.Provider>
        </Page>
    </>
}

