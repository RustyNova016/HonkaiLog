import styles from '../../styles/background.module.scss'

export function Background(props: {
    style?: React.CSSProperties;
    children: React.ReactNode;
}) {
    const backgroundPics = ["3rd_anniversary.png",
        "the_deep.png",
        "haxxor_bunny.png",
        "honkai_quest.png",
        "stygian_hall.png",
        "dark_lord.png"
    ]

    return (
        <div
            style={{
                ...props.style,
                backgroundImage: `url(/images/background/` + backgroundPics[Math.floor(Math.random() * backgroundPics.length)] + `)`,
                width: "100%",
                height: "100%",
            }}
            className={styles.backgroundDiv}
        >
            <div className={`${styles.backgroundColorTrans} ${styles.footerWarper}`}>
                {props.children}
            </div>

        </div>
    );
}