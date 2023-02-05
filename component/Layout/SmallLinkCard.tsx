"use client"
import Link from "next/link";
import style from "./CSS/SmallLinkCard.module.scss";
import {Col, Row} from "react-bootstrap";
import Image from "next/image";

export function SmallLinkCard(props: { title: string, description?: string, link: string, imagelink?: string }) {
    return <Link href={props.link} style={{height: "max-content"}}>
        <div className={style.card}>
            <Row>
                {props.imagelink ? <Col md={3}>
                    <div className={style.cardPicDiv}>
                        <Image src={props.imagelink} width={150} height={150} alt={""}/>
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