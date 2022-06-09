import styles from "./PageContainer.module.scss";

export function PageContainer(props: { children: React.ReactNode }) {
    return (
        <>
            <div className={styles.main}>
                {props.children}
            </div>
        </>
    );
}