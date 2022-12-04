import Link from "next/link";
import {CenterContent} from "@/components/Layouts/CenterContent";
import FramedDiv from "../../component/Layout/FramedDiv";

export default function Page() {
    return <>
        <CenterContent>
            <FramedDiv sides={true}>
                <Link href={"/history/1"} className={"btn btn-primary"}>Go to crystal page</Link>

            </FramedDiv>
        </CenterContent>
    </>
}