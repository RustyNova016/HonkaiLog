import {GenericPageLayout} from "../../component/pageComponents/GenericPageLayout";
import {Fade} from "react-awesome-reveal";
import pageStyles from "../../styles/page.module.scss";
import {Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {Parser} from "acorn";

export default function Battlepass() {
    const [BPXP, setBPXP] = useState(0);


    const data = {
        maxLevel: 70,
        currentLevel: 1
    }


    return (
        <GenericPageLayout>
            <Fade>
                <main className={pageStyles.main}>
                    <h1 className={pageStyles.title}>Battlepass</h1>

                    <Container>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Current Level</Form.Label>
                                        <Form.Control type={"number"} placeholder="Current Level" onChange={event => {
                                            //parse target value to int
                                            const parsed = parseInt(event.target.value);
                                            setBPXP((parsed) * 1000)
                                        }}/>
                                    </Form.Group>2

                                    {BPXP}

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Max Level</Form.Label>
                                        <Form.Control type="number" placeholder="Max Level" value={data.maxLevel}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>

                </main>
            </Fade>
        </GenericPageLayout>
    )
}