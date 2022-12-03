import {BackgroundPicture} from "../component/Layout/BackgroundPicture";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html>
        <head/>
        <body style={{margin: 0}}>
        <BackgroundPicture>
            {children}
        </BackgroundPicture>
        </body>
        </html>
    )
}
