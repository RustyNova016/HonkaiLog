import style from './theme.module.scss';

export function PageTitle(props: { title: string }) {
    return <h1 className={style.pageTitle}>{props.title}</h1>;
}