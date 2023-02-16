import {MaterialCollection} from "@/utils/entities/Material/MaterialCollection";
import {MaterialCard} from "@/components/UI/Material/MaterialCard";
import {FadingIn} from "@/components/Animators/FadingIn";
import MaterialListStyle from "./HistoryPage.module.scss"
import {MaterialORM} from "@/prisma/ORMs/MaterialORM";

export async function getMaterials() {
    const data = await MaterialORM.getAllMaterials();
    console.log(data)
    return MaterialCollection.fromModels(data)
}

export default async function Page() {
    const materials = await getMaterials()
    console.log(materials);

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