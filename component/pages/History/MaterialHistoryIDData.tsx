import {createContext} from "react";
import {Container} from "react-bootstrap";
import {PageTitle} from "../../pageComponents/Theme/Theme";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback, ErrorHandler} from "../../App Components/ErrorFallback";
import {DataCharts} from "./DataCharts";
import {Material} from "../../../tools/Models/Material";
import {LoggerComponent} from "./LoggerComponent";
import {GachaData} from "./GachaData";

export interface MaterialHistoryIDDataProps {
    MaterialID: number;
    material: Material
}

export const MaterialContext = createContext<Material | undefined>(undefined)

export function MaterialHistoryIDData(props: MaterialHistoryIDDataProps) {
    const {material} = props;

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

                <ErrorBoundary FallbackComponent={ErrorFallback} onError={ErrorHandler}>
                    <GachaData/>
                </ErrorBoundary>
            </Container>
        </MaterialContext.Provider>

    </>
}