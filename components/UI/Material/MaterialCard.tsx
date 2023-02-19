import {Material} from "@/utils/entities/Material/Material";
import MaterialCardStyles from "./MaterialCard.module.scss"
import React from "react";
import {LinkButton} from "@/components/theme/button/LinkButton";
import {MaterialIconWithQuantity} from "@/components/material/MaterialIcon";
import {getMaterialRarity} from "../../../data/theme/getMaterialRarityBackground";

export function MaterialCard({material}: { material: Material }) {
    return <div className={MaterialCardStyles["materialCard"]}>
        <div className={MaterialCardStyles["imgContainer"]}>
            {/*            <Image src={routes.materialIcons + material.imageLink} alt={material.toString()} width={128}
                   height={128}></Image>*/}
            <MaterialIconWithQuantity material={{name: material.name, imageLink: material.imageLink}}
                                      rarityUI={getMaterialRarity(material)}
                                      count={undefined}/>
        </div>

        <span className={MaterialCardStyles["name"]}>{material.toString(true, true)}</span>
        <div className={MaterialCardStyles["LinkContainer"]}>
            <LinkButton href={"/history/" + material.id} style={{margin: "10px"}}>
                Go to material page
            </LinkButton>
        </div>
    </div>
}