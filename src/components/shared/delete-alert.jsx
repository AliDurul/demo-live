import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import useStock from "@/features/stock/useStock";
import { Delete } from "lucide-react";
import { Trash2Icon } from "lucide-react"
import { useState } from "react"

export function DeleteAlert({ url, id, className, showIcon=false }) {

    const [open, setOpen] = useState(false);
    const { deleteStock } = useStock();

    const handleSubmit = () => {
        deleteStock(url, id)
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button className={className}>
                        Delete

                        {showIcon && <Delete className="ml-2" />}
                    </Button>
                }
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete {url}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete. View{" "}
                        <a href="#">Settings</a> delete any items saved during this session.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit} variant="destructive">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
