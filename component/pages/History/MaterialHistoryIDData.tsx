import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {PageTitle} from "../../pageComponents/Theme/Theme";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback, ErrorHandler} from "../../App Components/ErrorFallback";
import {MaterialUsageData} from "./Material Usage Data/MaterialUsageData";
import {Material} from "../../../tools/Models/Material";
import {MaterialLogger} from "./MaterialLogger";
import {GachaData} from "./GachaData";
import {Fade} from "react-awesome-reveal";
import {PageLoadingComponent} from "../../App Components/PageLoadingComponent";
import {MaterialContext} from "../../Contexts/MaterialContext";
import {useMaterialLogs} from "../../../tools/Database/Data Hooks/useMaterialLogs";

export interface MaterialHistoryIDDataProps {
    materialID: number;
}

/** The actual MaterialHistoryIDPage content. Here the user is sure to be logged in */
export function MaterialHistoryIDData(props: MaterialHistoryIDDataProps) {
    // Get the material data from the API
    const [material, setMaterial] = useState<Material>(new Material(-1, ""));
    const [isLoading, setLoading] = useState(false)

    const data = useMaterialLogs(props.materialID)
    console.log(data)

    const fetchMaterial = async () => {
        setLoading(true)
        const mat = await Material.getMaterialFromId(props.materialID)
        await mat.fetchLogs()
        mat.materialHooks.addHook(setMaterial)
        //mat.loadingHooks.addHook(setLoading)
        setMaterial(mat)
        setLoading(false)
    };

    useEffect(() => {fetchMaterial()}, [props.materialID])

    if (isLoading || material.id === -1) return <PageLoadingComponent subtext={"Preparing material data..."}/>

    return <>
        <Fade>
            <MaterialHistoryIDContext material={material}></MaterialHistoryIDContext>
        </Fade>
    </>
}

export function MaterialHistoryIDContext(props: { material: Material }) {
    return <MaterialContext.Provider value={props.material}>
        <Container>
            <PageTitle title={props.material.name + " history"}></PageTitle>

            <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                <MaterialLogger/>
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                <MaterialUsageData/>
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                <GachaData/>
            </ErrorBoundary>
        </Container>
    </MaterialContext.Provider>
}