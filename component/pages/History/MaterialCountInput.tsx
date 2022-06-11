import {Button, FormControl, InputGroup} from "react-bootstrap";

export interface MaterialCountInputForm {
    count: number;
}

export function MaterialCountInput() {


    return <InputGroup className="mb-3">
        <FormControl></FormControl>
        <Button>
            Save
        </Button>
    </InputGroup>;
}