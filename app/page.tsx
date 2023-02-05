import styles from '../styles/Home.module.scss'
import {SmallLinkCard} from "../component/Layout/SmallLinkCard";
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
            <FadingIn direction={"up"} cascade={true} delay={1000}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <SmallLinkCard link={"history"} title={"Material History"}
                                   description={"Keep an history of your materials to see how many you are making over a period of time"}
                                   imagelink={"/images/icons/HonkaiCube.png"}/>
                    <SmallLinkCard link={"gacha"} title={"Gacha"}
                                   description={"Check how much you can complete a banner"}
                                   imagelink={"/images/icons/HonkaiCube.png"}/>
                    <SmallLinkCard link={"battlepass"} title={"Battlepass Checker"}
                                   description={"Not sure if you can finish the battlepass in time? Use this tool to find out"}
                                   imagelink={"/images/icons/BP.png"}/>
                </div>
            </FadingIn>
        </CenterContent>
    </>
}
