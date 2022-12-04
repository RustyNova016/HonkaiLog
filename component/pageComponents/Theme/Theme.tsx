"use client";
import style from './CSS/theme.module.scss';
import {Row} from "react-bootstrap";

export function SectionTitle(props: { title: string }) {
    return <Row>
        <h1 className={style.sectionTitle}>{props.title}</h1>
    </Row>
}

export function PageTitle(props: { title: string }) {
    return <Row>
        <h1 className={style.pageTitle}>
            <b>⪡ {props.title} ⪢</b>
        </h1>
    </Row>
}