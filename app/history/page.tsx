import prisma from "@/lib/prismadb";
import {MaterialCollection} from "@/utils/Objects/Material/MaterialCollection";
import {MaterialCard} from "@/components/UI/Material/MaterialCard";
import {FadingIn} from "@/components/Animators/FadingIn";
import MaterialListStyle from "./HistoryPage.module.scss"

export async function getMaterials() {
    return MaterialCollection.parse(await prisma.material.findMany())
}

export default async function Page() {
    const materials = await getMaterials()

    return <div className={MaterialListStyle["MaterialList"]}>
        <FadingIn delay={1} duration={400} style={{width: "30%"}}>
            {
                materials.collection.map((mat, index) => {
                    return <>
                        <MaterialCard key={index} material={mat}/>
                    </>
                })
            }
        </FadingIn>
    </div>
}