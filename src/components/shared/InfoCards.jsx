import { Card, CardTitle } from "../ui/card"

export function ErrorCard({ error }) {
    return (
        <Card className="border-destructive bg-destructive/10">
            <CardTitle className="p-5 text-center text-lg text-destructive">
                {error}
            </CardTitle>
        </Card>
    )
}

export function NotFoundCard({ message = "No data found." }) {
    return (
        <Card>
            <CardTitle className="p-5 text-center text-lg">
                {message}
            </CardTitle>
        </Card>
    )
}

