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

export default function BrandCard({ brand, onEdit }) {
    const { deleteStockData } = useStockCall();

    const handleDelete = async (id) => {
        await deleteStockData('brands', id)
    }
    return (
        <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden shadow-lg" key={brand._id}>
            <CardHeader className="">
                <CardTitle className={'text-center text-2xl'}>{brand.name}</CardTitle>
            </CardHeader>
            <img
                src={brand.image}
                alt={brand.name}
                className="relative z-20 aspect-video w-full object-cover brightness-70 dark:brightness-60"
            />
            <CardFooter className="mt-auto flex gap-2 justify-center">
                <Button variant="outline" size='sm' onClick={() => onEdit?.(brand)}>Edit</Button>
                <Button variant="destructive" size='sm' onClick={() => handleDelete(brand._id)}>Delete</Button>
            </CardFooter>
        </Card>
    )
}
