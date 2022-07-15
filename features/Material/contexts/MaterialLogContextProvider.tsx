import {useMaterialLogs} from "../hooks/useMaterialLogs";
import {useEffect, useState} from "react";
import {Material} from "../../../tools/Models/Material";
import {PageLoadingComponent} from "../../../component/App Components/PageLoadingComponent";
import {ChildrenProps} from "../../../tools/Types";
import {forEach} from "react-bootstrap/ElementChildren";
import {useMaterialLogORM} from "../hooks/useMaterialLogORM";

export interface MaterialLogContextProviderProps extends ChildrenProps{
    materialId: number
}

export function MaterialLogContextProvider(props: MaterialLogContextProviderProps) {
    // Get the material data
    const {data, isError, isLoading} = useMaterialLogs(props.materialId)
    const [material, setMaterial] = useState<Material>();
    const d = useMaterialLogORM(props.materialId);

    useEffect(() => {
        return () => {
            console.log(d)
        };
    }, [d]);


    // Put an effect to recreate the object each time the data change
    useEffect(() => {
        return () => {
            if (data !== undefined){
                console.info("Reloading Data")
                setMaterial(Material.createMaterialFromAPIResponse(data))
            }
        };
    }, [data]);

    // If it's loading, do not provide context
    if (isLoading || material === undefined || material?.id === -1) return <PageLoadingComponent subtext={"Preparing material data..."}/>

    // If everything is good, return the childrens
    return <>
        {}
    </>
}