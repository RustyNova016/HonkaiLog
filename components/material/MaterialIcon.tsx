import styles from "@/components/material/SmallMaterialCard.module.scss";
import {MaterialRarityUI} from "@/utils/entities/Material/MaterialRarity";

export function MaterialIcon({material}: { material: { imageLink: string, name: string } }) {
    return <img className={styles["materialIconImage"]}
                src={material.imageLink}
                alt={material.name}
                width={128}
                height={128}/>;
}

export function MaterialIconWithBackground(props: {
    rarityUI: MaterialRarityUI
    material: { imageLink: string, name: string }
}) {
    return <div className={styles["materialIconBackground"]}
                style={{
                    backgroundImage: `url(${props.rarityUI.backgroundImage})`,
                    borderColor: props.rarityUI.borderColor
                }}>
        <MaterialIcon material={props.material}/>
    </div>;
}

export function MaterialIconWithOutline(props: {
    rarityUI: MaterialRarityUI
    material: { imageLink: string, name: string }
}) {
    return <div className={styles["iconOutline"]}>
        <MaterialIconWithBackground rarityUI={props.rarityUI} material={props.material}/>
    </div>;
}

export function MaterialIconWithQuantity(props: {
    rarityUI: MaterialRarityUI
    material: { imageLink: string, name: string },
    count: number | undefined
}) {
    return <>
        <div className={styles["MaterialIconWithQuantity"]}>
            <div className={styles["topIcon"]}>
                <MaterialIconWithOutline rarityUI={props.rarityUI} material={props.material}/>
            </div>
            {props.count !== undefined ?
                <div className={styles["bottomLabel"]}>
                    x{props.count}
                </div> : null
            }
        </div>
    </>
}

