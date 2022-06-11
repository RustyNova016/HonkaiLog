import {signIn, signOut, useSession} from "next-auth/react";
import {Container, Nav, Navbar} from "react-bootstrap";
import Link from "next/link";
import {Session} from "next-auth";
import styles from "./Navigation.module.scss";

export function Navigation() {
    const {data: session, status} = useSession()
    const loading = status === "loading"

    return <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="http://localhost:3000/">HonkaiLog</Navbar.Brand>
                <Nav className="me-auto">
                    <Link href={"http://localhost:3000/model/add"} >Ajouter un model</Link>
                </Nav>
                <div>
                    {/*{NotSignedIn(session)}
                    {SignedIn(session)}*/}
                </div>
            </Container>
        </Navbar>
    </>;
}

function NotSignedIn(session: Session | null) {
    return <>
        {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
                <a
                    href={`/api/auth/signin`}
                    className={styles.buttonPrimary}
                    onClick={(e) => {
                        e.preventDefault()
                        signIn()
                    }}
                >
                    Login
                </a>
                <a
                    href={`http://localhost:3000/account/register`}
                    className={styles.buttonPrimary}
                    onClick={(e) => {
                    }}
                >
                    Register
                </a>
            </>
        )}
    </>;
}

function SignedIn(session: Session | null) {
    return <>
        {session?.user && (
            <>
                {session.user.image && (
                    <span
                        style={{backgroundImage: `url('${session.user.image}')`}}
                        className={styles.avatar}
                    />
                )}
                <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br/>
                <strong>{session.user.name}</strong>
                </span>
                <a
                    href={`/api/auth/signout`}
                    className={styles.button}
                    onClick={(e) => {
                        e.preventDefault()
                        signOut()
                    }}
                >
                    Sign out
                </a>
            </>
        )}
    </>;
}