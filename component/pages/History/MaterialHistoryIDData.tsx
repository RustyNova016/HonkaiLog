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
import {MaterialContext} from "../../../features/Material/contexts/MaterialContext";
import {useMaterialLogs} from "../../../features/Material/hooks/useMaterialLogs";
import logger from "../../../tools/Logger";
import {useMaterialLogORM} from "../../../features/Material/hooks/useMaterialLogORM";

export interface MaterialHistoryIDDataProps {
    materialID: number;
}

/** The actual MaterialHistoryIDPage content. Here the user is sure to be logged in */
export function MaterialHistoryIDData(props: MaterialHistoryIDDataProps) {
    // Get the material data from the API
    const [material, setMaterial] = useState<Material>(new Material(-1, ""));
    const [isLoading, setLoading] = useState(false)


    /////////////////////////////////////////////////////

    const data = useMaterialLogs(props.materialID)
    useEffect(() => {
        return () => {
            logger.info("Object Value: ", "useMaterialLogs test", data)
        };
    }, [data]);

    /////////////////////////////////////////////////////

    const d = useMaterialLogORM(props.materialID);

    useEffect(() => {
        return () => {
            logger.info("Object Value: ", "ORM Object test", d)

            if (d !== undefined) {
                logger.info("Latest log Value: ", "ORM Object test", d.getInGameCount())
                logger.info("Number of logs: ", "ORM Object test", d.logs.logs.length)
            }
        };
    }, [d]);

    /////////////////////////////////////////////////////

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
        {/*<MaterialLogContextProvider materialId={props.materialID}>
            <MaterialHistoryIDContext material={}></MaterialHistoryIDContext>
        </MaterialLogContextProvider>*/}

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