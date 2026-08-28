import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
import { DeleteAlert } from "@/components/shared/delete-alert"

export function FirmCard({ firm, handleEdit }) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 ">
            <img
                src={firm.image}
                alt={firm.name}
                className="relative z-20 aspect-video w-full object-cover brightness-70 dark:brightness-40"
            />
            <CardHeader>
                <div className="flex items-center justify-between flex-wrap">
                    <CardTitle>{firm.name}</CardTitle>
                    <Badge variant="secondary">{firm.phone}</Badge>
                </div>
                <CardDescription className='w-full overflow-hidden text-ellipsis min-h-15'>
                    {firm.address}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-1">
                <Link to={`/stock/firms/${firm._id}`}>
                    <Button variant="link" className="w-full">View Details</Button>
                </Link>
                <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => handleEdit(firm)}>
                    Edit
                </Button>
                {/* <FirmAlert firmId={firm._id} /> */}
                <DeleteAlert url='firms' id={firm._id} className="w-full" />

            </CardFooter>
        </Card>
    )
}
