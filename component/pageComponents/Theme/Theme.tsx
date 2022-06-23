import style from './CSS/theme.module.scss';

export function SectionTitle(props: { title: string }) {
    return <h1 className={style.sectionTitle}>{props.title}</h1>;
}

export function PageTitle(props: { title: string }) {
    return <h1 className={style.pageTitle}>
        <b>⪡ {props.title} ⪢</b>
    </h1>;
}