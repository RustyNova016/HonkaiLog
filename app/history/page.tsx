import Link from "next/link";
import {CenterContent} from "@/components/Layouts/CenterContent";
import FramedDiv from "../../component/Layout/FramedDiv";
import prisma from "@/lib/prismadb";
import {MaterialDataZod} from "@/lib/Zod/Validations/material";
import {z} from "zod";
import _ from "lodash";

export async function getMaterials() {
    const materials = await prisma.material.findMany()

    return z.array(MaterialDataZod).parse(materials);
}

export default async function Page() {
    const materials = await getMaterials();

    return <>
        <CenterContent>
            <>
                <div style={{display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between", width: "80%"}}>
                    {
                    materials.map((value, index) => {
                        return <FramedDiv sides={true} style={{height: "25%", width: "25%"}}>
                            <p className={"text-2xl"}>
                                <u>
                                    {_.startCase(value.name)}
                                </u>
                            </p>
                            <Link href={"/history/" + value.id} className={"btn btn-primary"}>Go to material page</Link>
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