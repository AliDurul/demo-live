import { useParams } from 'react-router-dom'


export default function SaleDetailPage() {

    const { saleId } = useParams();

    return (
        <section className="pt-3 space-y-4">
            {saleId}
        </section>
    )
}
