import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {PageTitle} from "../../pageComponents/Theme/Theme";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback, ErrorHandler} from "../../App Components/ErrorFallback";
import {MaterialUsageData} from "./Material Usage Data/MaterialUsageData";
import {Material} from "../../../tools/Models/Material";
import {LoggerComponent} from "./LoggerComponent";
import {GachaData} from "./GachaData";
import {Fade} from "react-awesome-reveal";
import {PageLoadingComponent} from "../../App Components/PageLoadingComponent";
import { MaterialContext } from "../../Contexts/MaterialContext";

export interface MaterialHistoryIDDataProps {
    materialID: number;
}

/** The actual MaterialHistoryIDPage content. Here the user is sure to be logged in */
export function MaterialHistoryIDData(props: MaterialHistoryIDDataProps) {
    // Get the material data from the API
    const [material, setMaterial] = useState<Material>(new Material(-1, ""));
    const [isLoading, setLoading] = useState(false)

    const fetchMaterial = async () => {
        setLoading(true)
        const mat = await Material.getMaterialFromId(props.materialID)
        await mat.fetchLogs()
        setMaterial(mat)
        setLoading(false)
    };

    useEffect(() => {fetchMaterial()}, [props.materialID])

    if (isLoading || material.id === -1) return <PageLoadingComponent subtext={"Preparing material data..."}/>

    return <>
        <Fade>
            <MaterialContext.Provider value={material}>
                <Container>
                    <PageTitle title={material.name + " history"}></PageTitle>

                    <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                        <LoggerComponent/>
                    </ErrorBoundary>

                    <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                        <MaterialUsageData/>
                    </ErrorBoundary>

                    <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                        <GachaData/>
                    </ErrorBoundary>
                </Container>
            </MaterialContext.Provider>
        </Fade>
    </>
}