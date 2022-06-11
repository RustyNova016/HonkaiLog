import style from './theme.module.scss';

export function SectionTitle(props: { title: string }) {
    return <h1 className={style.sectionTitle}>{props.title}</h1>;
}

export function PageTitle(props: { title: string }) {
    return <h1 className={style.pageTitle}>
        <b>Welcome to HonkaiLog!</b>
    </h1>;
}