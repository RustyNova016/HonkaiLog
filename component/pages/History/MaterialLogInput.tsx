import {Col, FormFloating, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useContext} from "react";
import axios from "axios";
import {MaterialContext} from "../../Contexts/MaterialContext";

export interface MaterialLogInputForm {
    count: number;
}

export interface MaterialLogInputProps {
}

export function MaterialLogInput(props: MaterialLogInputProps) {
    // Get the material
    const material = useContext(MaterialContext)
    const {register, handleSubmit, watch, formState: {errors}} = useForm<MaterialLogInputForm>();

    // TODO: Send request to server to update count
    const onSubmit = async (data: MaterialLogInputForm) => {

        axios.post("http://localhost:3000/api/material/logs", {...data, MaterialId: material.id})
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
                    <button type="submit">Submit</button>
                </Col>
            </Row>
        </form>
    </>
}