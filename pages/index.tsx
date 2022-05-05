import type {NextPage} from 'next'
import styles from '../styles/Home.module.scss'
import {GenericPageLayout} from "../component/pageComponents/GenericPageLayout";
import {Fade} from "react-awesome-reveal";


const Home: NextPage = () => {
    return (<>
            <GenericPageLayout pushFooter={true}>
                <main className={styles.main}>

                    <Fade direction={"down"} cascade={true}>
                        <h1 className={styles.title}>
                            <b>Welcome to HonkaiLog!</b>
                        </h1>

                        <p className={styles.description}>
                            A website to keep track of your progress in the game Honkai Impact 3rd
                        </p>
                    </Fade>


                    <div className={styles.grid}>
                        <a href="https://nextjs.org/docs" className={styles.card}>
                            <h2>Documentation &rarr;</h2>
                            <p>Find in-depth information about Next.js features and API.</p>
                        </a>

                        <a href="https://nextjs.org/learn" className={styles.card}>
                            <h2>Learn &rarr;</h2>
                            <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>

                        <a
                            href="https://github.com/vercel/next.js/tree/canary/examples"
                            className={styles.card}
                        >
                            <h2>Examples &rarr;</h2>
                            <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>

                        <a
                            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            className={styles.card}
                        >
                            <h2>Deploy &rarr;</h2>
                            <p>
                                Instantly deploy your Next.js site to a public URL with Vercel.
                            </p>
                        </a>
                    </div>
                </main>
            </GenericPageLayout>
        </>

    )
}

export default Home
