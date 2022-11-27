import styles from "./Navbar.module.scss";
import Link from "next/link";

export function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <Link href={"/"}>HonkaiLog</Link>
            </div>
            <div className={styles.right}>
                <Link href={"account/login"}>Login</Link>
            </div>
        </div>
    )
}