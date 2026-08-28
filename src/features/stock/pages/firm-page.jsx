import { selectFirms, selectFirmsStatus } from '@/features/stock/stockSlice';
import { useSelector } from 'react-redux';
import useStock from '../useStock';
import { useEffect } from 'react';
import { FirmCard } from '../components/firm-card';
import { FirmCardsSkeleton } from '@/components/shared/Skeletons';
import { FirmModal } from '../components/firm-modal';
import { useState } from 'react';

export default function FirmPage() {

    const { getStock } = useStock();
    const [open, setOpen] = useState(false);
    const [selectedFirm, setSelectedFirm] = useState(null)
    const firms = useSelector(selectFirms);

    const firmsStatus = useSelector(selectFirmsStatus);
    const isLoading = firmsStatus === 'idle' || (firmsStatus === 'loading' && firms.length === 0);


    const handleModalChange = (isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
            setSelectedFirm(null)
        }
    }

    const handleEdit = (firm) => {
        setOpen(true)
        setSelectedFirm(firm)
    }

    useEffect(() => {
        getStock('firms')
    }, [])

    return (
        <section className='space-y-4 p-4'>

            <FirmModal open={open} onOpenChange={handleModalChange} selectedFirm={selectedFirm} />

            {
                isLoading
                    ? <FirmCardsSkeleton />
                    : (
                        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {firms.map((firm) => (
                                <FirmCard key={firm.id} firm={firm} handleEdit={handleEdit} />
                            ))}
                        </div>
                    )
            }

        </section>
    )
}
