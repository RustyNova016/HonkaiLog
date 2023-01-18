import {Dropdown} from "react-bootstrap";

export function TimeframeSelection({
                                       nbrDaysBack,
                                       setNbrDaysBack
                                   }: { nbrDaysBack: number, setNbrDaysBack: (number: number) => void }) {
    return <div className={"flex flex-row align-content-center text-center"}>
        <span>Filter: Logs between</span>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {nbrDaysBack} day ago
            </Dropdown.Toggle>

            <Dropdown.Menu variant={"dark"}>
                <Dropdown.Item onClick={() => setNbrDaysBack(1)}>1 Days</Dropdown.Item>
                <Dropdown.Item onClick={event => setNbrDaysBack(7)}>7 Days</Dropdown.Item>
                <Dropdown.Item onClick={event => setNbrDaysBack(30)}>30 Days</Dropdown.Item>
                <Dropdown.Item onClick={event => setNbrDaysBack(90)}>3 Months</Dropdown.Item>
                <Dropdown.Item onClick={event => setNbrDaysBack(365)}>1 Year</Dropdown.Item>
                <Dropdown.Item onClick={event => setNbrDaysBack(99999)}>All Time</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <span>and today</span>
    </div>;
}