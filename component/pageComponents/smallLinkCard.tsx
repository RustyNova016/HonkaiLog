import Link from "next/link";
import HomeStyles from "../../styles/Home.module.scss";
import {Col, Row} from "react-bootstrap";
import Image from "next/image";

export function SmallLinkCard(props: { title: string, description?: string, link: string, imagelink?: string }) {
    return <Link href={props.link}>
        <div className={HomeStyles.card}>
            <Row>
                {props.imagelink ? <Col md={3}>
                    <div className={HomeStyles.cardPicDiv}>
                        <Image src={props.imagelink} width={150} height={150}/>
                    </div>

                </Col> : null}
                <Col>
                    <h2><u>{props.title}</u></h2>
                    {props.description ? <p>{props.description}</p> : null}
                </Col>
            </Row>

        </div>
    </Link>;
}