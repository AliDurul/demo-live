import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import useStockCall from "@/hooks/useStockCall"

export default function FirmDetail() {
    const { id } = useParams()
    const { getStockDataById } = useStockCall()
    const [firm, setFirm] = useState(null)


    useEffect(() => {
        const fetchFirm = async () => {
            const res = await getStockDataById('firms', id)
            setFirm(res.data)
        }
        
        if (id) {
            fetchFirm()
        }
    }, [id, getStockDataById])



    return (
        <section className="pt-3 space-y-4">
            <Card className="overflow-hidden">
                <img
                    src={firm?.image}
                    alt={firm?.name}
                    className="aspect-14/5 w-full object-cover"
                />
                <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                        <CardTitle>{firm?.name}</CardTitle>
                        <Badge variant="outline">
                            <a href={`tel:${firm?.phone}`}>{firm?.phone}</a>
                        </Badge>
                    </div>
                    <CardDescription className={'flex justify-between'}>
                        <p>{firm?.address}</p>
                        <p>{firm?.createdAt}</p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="outline">
                        <Link to="/stock/firms">Back to Firms</Link>
                    </Button>
                </CardContent>
            </Card>
        </section>
    )
}