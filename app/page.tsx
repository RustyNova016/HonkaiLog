import styles from '../styles/Home.module.scss'
import {SmallLinkCard} from "../component/Layout/SmallLinkCard";
import {PageContainer} from "../component/Layout/PageContainer";
import {PageTitle} from "../component/pageComponents/Theme/Theme";
import {FadingIn} from "@/components/Animators/FadingIn";
import {CenterContent} from "@/components/Layouts/CenterContent";


export default function Home() {
    return <>
        <CenterContent>
            <FadingIn direction={"down"} cascade={true}>
                <PageTitle title={"Welcome to HonkaiLog!"}/>

                <p className={styles.description}>
                    A website to keep track of your progress in Honkai Impact 3rd
                </p>
            </FadingIn>
            <FadingIn direction={"up"} cascade={true} className={styles.grid} delay={1000}>
                <SmallLinkCard link={"history"} title={"Material History"}
                               description={"Keep an history of your materials to see how many you are making over a period of time"}
                               imagelink={"/images/icons/HonkaiCube.png"}/>
                <SmallLinkCard link={"404"} title={"Battlepass Checker"}
                               description={"Not sure if you can finish the battlepass in time? Use this tool to find out"}
                               imagelink={"/images/icons/BP.png"}/>
            </FadingIn>
        </CenterContent>
    </>
}
