import { useState } from 'react';
import { useParams } from 'react-router-dom'
import useStock from '../useStock';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FirmDetailPage() {

    const [firm, setFirm] = useState(null);
    const { firmId } = useParams();
    const { getStockById } = useStock();


    useEffect(() => {
        getStockById('firms', firmId)
            .then(({ data }) => { setFirm(data) })
    }, [firmId])


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
