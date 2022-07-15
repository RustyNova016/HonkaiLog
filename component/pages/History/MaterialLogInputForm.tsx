import {Button, Col, FormFloating, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {getUseMaterialLogsKey} from "../../../features/Material/hooks/useMaterialLogs";
import logger from "../../../tools/Logger";
import {LoadingComponent} from "../../App Components/PageLoadingComponent";
import {useMaterialLogORM} from "../../../features/Material/hooks/useMaterialLogORM";
import {useSWRConfig} from "swr";

export interface IMaterialLogInputForm {
    count: number;
}

export interface MaterialLogInputProps {}

export function MaterialLogInputForm(props: MaterialLogInputProps) {
    const [loading, setLoading] = useState(false);
    const {mutate} = useSWRConfig()

    // Get the material
    const material = useMaterialLogORM(1);
    if (material === undefined) return <LoadingComponent subtext={"Preparing material data..."}/>

    // Handle form
    const {register, handleSubmit, watch, formState: {errors}} = useForm<IMaterialLogInputForm>();

    const onSubmit = async (data: IMaterialLogInputForm) => {
        logger.info("User submitting log for material " + material.name + " with value " + data.count, "MaterialLogInput")

        setLoading(true)
        await material.addNewLog(data.count)
        await mutate(getUseMaterialLogsKey(material.id))
        setLoading(false)
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col lg={8}>
                    <FormFloating className={"mb-3"}>
                        <input className="form-control"
                               defaultValue={material.logs.getCurrentCount()} {...register("count")} />
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