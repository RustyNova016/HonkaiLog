import Link from "next/link";
import {CenterContent} from "@/components/Layouts/CenterContent";

export default function Page() {
    return <>
        <CenterContent>
            <Link href={"/history/1"}>Go to crystal page</Link>
        </CenterContent>
    </>
}