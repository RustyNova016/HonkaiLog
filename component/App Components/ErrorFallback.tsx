import {Alert, Button} from "react-bootstrap";

export function ErrorFallback({error, resetErrorBoundary}: { error: Error, resetErrorBoundary: () => void }) {
    return (
        <Alert variant={"danger"}>
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <Button variant={"secondary"} onClick={resetErrorBoundary}>Try again</Button>
        </Alert>
    )
}

export const ErrorHandler = (error: Error, info: { componentStack: string }) => {
    console.error(error);
}