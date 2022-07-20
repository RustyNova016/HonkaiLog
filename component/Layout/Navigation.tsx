import {signIn, signOut, useSession} from "next-auth/react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Session} from "next-auth";
import styles from "./CSS/Navigation.module.scss";
import {LoadingComponent} from "../App Components/PageLoadingComponent";

export function NavUser() {
    const {data: session, status} = useSession()

    // TODO: Prevent Navbar to expend when loading
    if (status === "loading") { return <LoadingComponent height={"1em"}/>}

    if (session === null) {
        return <LogIn/>;
    } else {
        return <></>
    }
}

export function LogIn() {
    return <>
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
}


export function Navigation() {


    return <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="http://localhost:3000/">HonkaiLog</Navbar.Brand>
                <Nav className="me-auto">
                </Nav>
                <NavUser/>
            </Container>
        </Navbar>
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