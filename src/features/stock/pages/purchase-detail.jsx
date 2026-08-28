import { useParams } from 'react-router-dom'


export default function PurchaseDetailPage() {

    const { purchaseId } = useParams();

    return (
        <section className="pt-3 space-y-4">
            {purchaseId}
        </section>
    )
}
