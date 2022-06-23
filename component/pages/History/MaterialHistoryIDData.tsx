import {createContext, useContext, useState} from "react";
import {Container} from "react-bootstrap";
import {PageTitle} from "../../pageComponents/Theme/Theme";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback, ErrorHandler} from "../../App Components/ErrorFallback";
import {DataCharts} from "./DataCharts";
import {MaterialCollection} from "../../../tools/Models/MaterialCollection";
import {Material} from "../../../tools/Models/Material";
import {LoggerComponent} from "./LoggerComponent";
import {PageLoadingComponent} from "../../App Components/PageLoadingComponent";

export interface MaterialHistoryIDDataProps {
    MaterialID: number;
}

export const MaterialContext = createContext<Material | undefined>(undefined)

export function MaterialHistoryIDData(props: MaterialHistoryIDDataProps) {
    const [material, setMaterial] = useState<Material>();
    MaterialCollection.getCollection().findMaterialById(1, true).then(fetchedMaterial => {
        setMaterial(fetchedMaterial)
    })

    if (material === undefined || material.logs === "loading") return <PageLoadingComponent/>;

    return <>
        <MaterialContext.Provider value={material}>
            <Container>
                <PageTitle title={material.name + " history"}></PageTitle>

                <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                    <LoggerComponent/>
                </ErrorBoundary>

                <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                    <DataCharts/>
                </ErrorBoundary>

                {/*<ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                    <GachaData/>
                </ErrorBoundary>*/}
            </Container>
        </MaterialContext.Provider>

    </>
}