import styles from '../styles/Home.module.scss'
import pageStyles from '../styles/page.module.scss'
import {GenericPageLayout} from "../component/pageComponents/GenericPageLayout";
import {Fade} from "react-awesome-reveal";
import {SmallLinkCard} from "../component/pageComponents/smallLinkCard";


function Home() {
    return (<>
            <GenericPageLayout pushFooter={true}>
                <main className={pageStyles.main}>

                    <Fade direction={"down"} cascade={true}>
                        <h1 className={pageStyles.title}>
                            <b>Welcome to HonkaiLog!</b>
                        </h1>

                        <p className={styles.description}>
                            A website to keep track of your progress in the game Honkai Impact 3rd
                        </p>
                    </Fade>
                    <Fade direction={"up"} cascade={true} className={styles.grid} delay={1000}>
                        <SmallLinkCard link={"404"}
                                       title={"Material History"}
                                       description={"Keep an history of your materials to see how many you are making over a period of time"}
                                       imagelink={"/images/icons/HonkaiCube.png"}/>
                        <SmallLinkCard link={"/battlepass"}
                                       title={"Battlepass Checker"}
                                       description={"Not sure if you can finish the battlepass in time? Use this tool to find out"}
                                       imagelink={"/images/icons/BP.png"}/>
                    </Fade>
                </main>
            </GenericPageLayout>
        </>
    )
}

export default Home
