import styles from "../../styles/footer.module.scss";
import Image from "next/image";
import {Col, Container, Row} from "react-bootstrap";

export function Footer() {
    return <footer className={styles.footer}>
        <Container>
            <Row>
                <Col md={6}>
                    <a href="https://honkaiimpact3.mihoyo.com/global/en-us/home">
                        <Image src="/images/Honkai.png" alt="logo" width={100} height={100}/>
                    </a>
                </Col>
                <Col md={6}>
                    <h3>Links</h3>
                    <p>
                        <i className="bi bi-github"></i> Github page:
                        <a href="https://github.com/VelionaVollerei/HonkaiLog"> VelionaVollerei/HonkaiLog</a>
                    </p>
                    <p>
                        <i className="fas fa-laptop"></i>
                        <a href="https://honkaiimpact3.mihoyo.com/global/en-us/home">Honkai Impact official site</a>
                    </p>
                </Col>
            </Row>
        </Container>
    </footer>;
}