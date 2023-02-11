import {MaterialEntity} from "@/utils/entities/Material/MaterialEntity";
import MaterialCardStyles from "./MaterialCard.module.scss"
import {routes} from "@/lib/routes";
import Image from "next/image";
import React from "react";
import {LinkButton} from "@/components/theme/button/LinkButton";

export function MaterialCard({material}: { material: MaterialEntity }) {
    return <div className={MaterialCardStyles["materialCard"]}>
        <div className={MaterialCardStyles["imgContainer"]}>
            <Image src={routes.materialIcons + material.imageLink} alt={material.toString()} width={128}
                   height={128}></Image>
        </div>

        <span className={MaterialCardStyles["name"]}>{material.toString(true, true)}</span>
        <div className={MaterialCardStyles["LinkContainer"]}>
            <LinkButton href={"/history/" + material.id} style={{margin: "10px"}}>
                Go to material page
            </LinkButton>
        </div>
    </div>
}