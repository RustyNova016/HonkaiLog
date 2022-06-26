import styles from './CSS/BackgroundPicture.module.scss'
import React, {CSSProperties, ReactNode, useState} from "react";

export interface BackgroundPictureProps {
    children?: ReactNode;
    style?: CSSProperties;
}

export const backgroundPics = [
    "3rd_anniversary.png",
    "the_deep.png",
    "haxxor_bunny.png",
    "honkai_quest.png",
    "stygian_hall.png",
    "dark_lord.png"
]

export function BackgroundPicture(props: BackgroundPictureProps) {
    const [backgroundPicture, setBackgroundPicture] = useState(backgroundPics[Math.floor(Math.random() * backgroundPics.length)]);

    return (
        <div style={{...props.style, backgroundImage: `url(/images/background/` + backgroundPicture + `)`}}
             className={styles.backgroundPicture}>
            <div className={styles.backgroundPictureOverlay}>
                {props.children}
            </div>
        </div>
    );
}