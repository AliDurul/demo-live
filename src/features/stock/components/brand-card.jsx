import { Button } from "@/components/ui/button"
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DeleteAlert } from "@/components/shared/delete-alert";


export function BrandCard({ brand, setOpen, setSelectedBrand }) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 ">
            <CardHeader>
                <CardTitle className="text-center text-2xl pt-3">{brand.name}</CardTitle>
            </CardHeader>
            <img
                src={brand.image}
                alt={brand.name}
                className="relative z-20 aspect-video w-full object-cover brightness-70 dark:brightness-40"
            />
            <CardFooter className="flex gap-1">
                <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => { setOpen(true); setSelectedBrand(brand) }}>
                    Edit
                </Button>
                <DeleteAlert url='brands' id={brand._id} />
            </CardFooter>
        </Card>
    )
}
