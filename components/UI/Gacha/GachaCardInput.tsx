import {Form} from "react-bootstrap";
import {z} from "zod";

export function GachaCardInput(props: {
    value: number,
    setter: (number: number) => void,
    min: number,
    max: number,
    label: string
}) {
    return <Form>
        <Form.Group className="mb-3">
            <Form.Label label="Guarranty" className="mb-3">
                {props.label}
            </Form.Label>
            <Form.Control type="number"
                          placeholder="name@example.com"
                          value={props.value}
                          onChange={event => {
                              let num = z.number().parse(parseInt(event.target.value));
                              if (num < props.min) {
                                  props.setter(props.min);
                                  return
                              }
                              if (num > props.max) {
                                  props.setter(props.max);
                                  return
                              }
                              props.setter(num)
                          }
                          }/>
        </Form.Group>
    </Form>;
}