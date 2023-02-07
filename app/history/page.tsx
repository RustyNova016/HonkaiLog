import Link from "next/link";
import {CenterContent} from "@/components/Layouts/CenterContent";
import FramedDiv from "../../component/Layout/FramedDiv";
import prisma from "@/lib/prismadb";
import {MaterialJSONZod} from "@/utils/Objects/Material/validations/Material.JSONZod";
import {z} from "zod";
import _ from "lodash";
import Image from "next/image";
import {MaterialCollection} from "@/utils/Objects/Material/MaterialCollection";
import {Material} from "@/utils/Objects/Material/Material";
import {routes} from "@/lib/routes";

export async function getMaterials() {
    return MaterialCollection.parse(await prisma.material.findMany())
}

export default async function Page() {
    const materials = await getMaterials()

    return <>
        <CenterContent>
            <>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "75%"
                }}>
                    {
                        materials.collection.map((mat, index) => {
                            return <FramedDiv sides={true} style={{height: "25%", width: "25%"}}>
                                <p className={"text-2xl"}>
                                    <u>
                                        {mat.toString(false, true)}
                                    </u>
                                </p>
                                <Image src={routes.materialIcons + mat.imageLink} alt={mat.toString()} width={128} height={128}></Image>
                                <Link href={"/history/" + mat.id} className={"btn btn-primary"}>Go to material
                                    page</Link>
                            </FramedDiv>
                        })
                    }
                </div>


                <FramedDiv sides={true}>
                    <Link href={"/history/1"} className={"btn btn-primary"}>Go to crystal page</Link>

                </FramedDiv>
            </>
        </CenterContent>

    </>
}