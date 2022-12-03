"use client";
//TODO: Make most server component. Maybe encapsulate <Fade>?
import type {NextPage} from 'next'
import styles from '../styles/Home.module.scss'
import {GenericPageLayout} from "../component/pageComponents/GenericPageLayout";
import {Fade} from "react-awesome-reveal";
import {SmallLinkCard} from "../component/Layout/SmallLinkCard";
import {PageContainer} from "../component/Layout/PageContainer";
import {PageTitle} from "../component/pageComponents/Theme/Theme";


const Home: NextPage = () => {
    return (<>
                <PageContainer>
                    <Fade direction={"down"} cascade={true}>
                        <PageTitle title={"Welcome to HonkaiLog!"}/>

                        <p className={styles.description}>
                            A website to keep track of your progress in the game Honkai Impact 3rd
                        </p>
                    </Fade>
                    <Fade direction={"up"} cascade={true} className={styles.grid} delay={1000}>
                        <SmallLinkCard link={"history"} title={"Material History"}
                                       description={"Keep an history of your materials to see how many you are making over a period of time"}
                                       imagelink={"/images/icons/HonkaiCube.png"}/>
                        <SmallLinkCard link={"404"} title={"Battlepass Checker"}
                                       description={"Not sure if you can finish the battlepass in time? Use this tool to find out"}
                                       imagelink={"/images/icons/BP.png"}/>
                    </Fade>
                </PageContainer>
        </>
    )
}

export default Home
