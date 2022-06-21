import {Button, Col, FormFloating, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {HistoryContext} from "./MaterialHistoryIDData";
import {useContext} from "react";
import {PageLoadingComponent} from "../../App Components/PageLoadingComponent";

export interface MaterialLogInputForm {
    count: number;
}

export interface MaterialLogInputProps {
}

export function MaterialLogInput(props: MaterialLogInputProps) {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<MaterialLogInputForm>();
    const history = useContext(HistoryContext);

    if (history === undefined) { return <PageLoadingComponent/> }

    // TODO: Send request to server to update count
    const onSubmit = (data: MaterialLogInputForm) => {}

    return <>
        <form onSubmit={handleSubmit(onsubmit)}>
            <Row>
                <Col lg={8}>
                    <FormFloating className={"mb-3"}>
                        <input className="form-control"
                               defaultValue={history.getCurrentCount()} {...register("count")} />
                        <label>{history.name} count</label>
                    </FormFloating>
                </Col>
                <Col lg={2}>
                    <Button>
                        Save
                    </Button>
                </Col>
            </Row>
        </form>
    </>
}