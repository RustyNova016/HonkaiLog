/*export function SmallMaterialCard({material}: { material: Material }) {
    console.log(material.getRarityBackgroundImage())

    return <div className={styles["SmallMaterialCard"]}>
        <div className={styles["iconOutline"]}>
            <div className={styles["iconBackground"]} style={{backgroundImage: `url(${material.getRarityBackgroundImage()})`}}>
                <Image className={styles["iconImage"]} src={routes.materialIcons + material.imageLink} alt={material.toString()} width={128}
                   height={128}></Image>
            </div>

        </div>

        <div className={styles["bottomLabel"]}>
            <p>{material.name}</p>
        </div>
    </div>
}*/

interface testProps {
    rarityBackground: string,
    rarityColor: string
    imageLink: string
    count: number,
    materialName: string
}

