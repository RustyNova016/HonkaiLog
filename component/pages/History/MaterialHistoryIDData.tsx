import {
    JSXElementConstructor,
    ReactElement,
    ReactFragment,
    ReactPortal,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
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

export interface MaterialHistoryIDDataProps {
    materialID: number;
}

/** The actual MaterialHistoryIDPage content. Here the user is sure to be logged in */
export function MaterialHistoryIDData(props: MaterialHistoryIDDataProps) {
    // Get the material data from the API
    const [material, setMaterial] = useState<Material>(new Material(-1, ""));
    const [isLoading, setLoading] = useState(false)

    const loadCallback = (mat: Material) => {
        setMaterial(mat);
        setLoading(false)
    }

    const fetchMaterial = async () => {
        setLoading(true)
        const mat = await Material.getMaterialFromId(props.materialID)
        await mat.fetchLogs()
        mat.stateHooks.push(setMaterial)
        mat.loadCallbacks.push(loadCallback);
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

                    <StateTest></StateTest>

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
        </Fade>
    </>
}

/** This component handles the context of the page */
export function MaterialHistoryIDDataLayer(props: { materialID: number; }) {
    const [material, setMaterial] = useState<Material>(new Material(-1, ""));
    const [isLoading, setLoading] = useState(false)


}

function StateTest() {
    const [material, setMaterial] = useState<Material>(new Material(1, "test 1"));

    const changeState = (e: any) => {
        const material1 = new Material(1, "test 2");
        const material2 = new Material(1, "test 1");

        console.log("Is equal? ", material2 === material1)
        console.log("Old Id? ", material.id)

        if (material.id === 1) {
            setMaterial(material1)
        } else if (material.id === 2) {
            setMaterial(material2)
        }
    }

    return <>
        <MaterialContext.Provider value={material}>
            <button onClick={changeState}>Change state!</button>

            <Counter message={"Lol"}></Counter>
        </MaterialContext.Provider>

    </>
}

export function Counter(props: { message: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
    const renderCounter = useRef(0);
    renderCounter.current = renderCounter.current + 1;

    return <>
        <h1>Renders: {renderCounter.current}, {props.message}</h1>;
        <DysplayID></DysplayID>
    </>
}

function DysplayID() {
    const mat = useContext(MaterialContext)

    return <>
        <PageTitle title={mat.id + mat.name}></PageTitle>
    </>
}