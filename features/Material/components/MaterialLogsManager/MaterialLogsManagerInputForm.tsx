"use client"
import {Button, Col, FormFloating, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useState} from "react";
import logger from "../../../../tools/Logger";
import {useSWRConfig} from "swr";
import {useMaterialWithLogsFromRouter} from "../../hooks/useMaterialWithLogsFromRouter";
import {getMaterialLogsAPIKey} from "../../hooks/useMaterialLogsAPI";
import {LoadingComponent} from "../../../../component/UI Components/Loading Icons/LoadingComponent";

export interface IMaterialLogInputForm {
    count: number;
}

export interface MaterialLogsManagerInputFormProps {}

export function MaterialLogsManagerInputForm(props: MaterialLogsManagerInputFormProps) {
    const [loading, setLoading] = useState(false);
    const {mutate} = useSWRConfig()

    // Get the material
    const material = useMaterialWithLogsFromRouter();
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    // Handle form
    const {register, handleSubmit, watch, formState: {errors}} = useForm<IMaterialLogInputForm>();

    const onSubmit = async (data: IMaterialLogInputForm) => {
        logger.info("User submitting log for material " + material.name + " with value " + data.count, "MaterialLogInput")

        setLoading(true)
        await material.logCollection.makeLog(data.count)
        await mutate(getMaterialLogsAPIKey(material.id))
        setLoading(false)
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col lg={8}>
                    <FormFloating className={"mb-3"}>
                        <input className="form-control"
                               defaultValue={material.logCollection.getCurrentCount()} {...register("count")} />
                        <label>{material.name} count</label>
                    </FormFloating>
                </Col>
                <Col lg={2}>
                    <Button type={"submit"} variant={"primary"} size={"lg"} disabled={loading}>
                        {!loading ?
                            <>Submit</>
                            :
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                    </Button>
                </Col>
            </Row>
        </form>
    </>
}