import {BackgroundPicture} from "../component/Layout/BackgroundPicture";
import './globals.css';
import './globals.scss';

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html>
        <head/>
        <body>
        <BackgroundPicture>
            {children}
        </BackgroundPicture>
        </body>
        </html>
    )
}
