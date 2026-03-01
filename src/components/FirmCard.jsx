import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import useStockCall from '@/hooks/useStockCall'
import { useTransition } from 'react'

export default function FirmCard({ firm, onEdit }) {
    const { deleteStockData } = useStockCall()
    const [isPending, startTransition] = useTransition()

    const handleDelete = async (id) => {
        startTransition(async () => {
            await deleteStockData('firms', id)
        })
    }
    return (
        <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden pt-0 shadow-lg" key={firm._id}>
            <img
                src={firm.image}
                alt={firm.name}
                className="relative z-20 aspect-video w-full object-cover brightness-70 dark:brightness-60"
            />
            <CardHeader className="flex-1">
                <div className="flex justify-between">
                    <CardTitle>{firm.name}</CardTitle>
                    <Badge variant="outline">
                        <a href={`tel:${firm.phone}`}>{firm.phone}</a>
                    </Badge>
                </div>
                <CardDescription className="w-full min-h-15  overflow-hidden text-ellipsis ">
                    {firm.address}
                </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto flex gap-2">
                <Link to={`/stock/firms/${firm._id}`} className="flex-1">
                    <Button className="w-full" size='sm'>View Details</Button>
                </Link>
                <Button variant="outline" size='sm' onClick={() => onEdit?.(firm)}>Edit</Button>
                <Button
                    variant="destructive"
                    size='sm'
                    disabled={isPending}
                    onClick={() => handleDelete(firm._id)}
                >
                    {isPending ? 'Deleting...' : 'Delete'}
                </Button>
            </CardFooter>
        </Card>
    )
}
