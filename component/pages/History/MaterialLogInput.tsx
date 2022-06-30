import {Col, FormFloating, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {MaterialContext} from "../../Contexts/MaterialContext";
import {Material} from "../../../tools/Models/Material";

export interface MaterialLogInputForm {
    count: number;
}

export interface MaterialLogInputProps {}

export function MaterialLogInput(props: MaterialLogInputProps) {
    const [loading, setLoading] = useState(false);

    // Get the material
    const material = useContext(MaterialContext)
    const {register, handleSubmit, watch, formState: {errors}} = useForm<MaterialLogInputForm>();

    const loadCallback = (mat: Material) => {
        setLoading(false)
    }

    material.loadCallbacks.push(loadCallback);

    const onSubmit = async (data: MaterialLogInputForm) => {
        setLoading(true)
        await material.addNewLog(data.count)
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
                    <button type="submit" className={"btn btn-primary"}>
                        Submit
                        {loading ?
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : null}
                    </button>
                </Col>
            </Row>
        </form>
    </>
}