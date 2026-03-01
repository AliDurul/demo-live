import { selectBrands, selectBrandsStatus, selectError } from '@/features/stockSlice'
import useStockCall from '@/hooks/useStockCall'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { FirmCardsSkeleton } from '@/components/shared/Skeletons'
import BrandCard from '@/components/BrandCard'
import { BrandModal } from '@/components/BrandModal'
import { ErrorCard, NotFoundCard } from '@/components/shared/InfoCards'


export default function Brands() {
    const { getStockData } = useStockCall()
    const brands = useSelector(selectBrands)
    const brandsStatus = useSelector(selectBrandsStatus)
    const error = useSelector(selectError)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedBrand, setSelectedBrand] = useState(null)

    useEffect(() => {
        getStockData('brands')
    }, [getStockData])

    const handleOpenCreate = () => {
        setSelectedBrand(null)
        setModalOpen(true)
    }

    const handleOpenEdit = (brand) => {
        setSelectedBrand(brand)
        setModalOpen(true)
    }

    const handleModalChange = (isOpen) => {
        setModalOpen(isOpen)
        if (!isOpen) {
            setSelectedBrand(null)
        }
    }

    const showLoadingSkeleton = brandsStatus === 'idle' || (brandsStatus === 'loading' && brands.length === 0)


    return (
        <section className="space-y-4 pt-3 px-5">
            <Button variant="outline" onClick={handleOpenCreate}>Create New Brand</Button>

            <BrandModal
                open={modalOpen}
                onOpenChange={handleModalChange}
                selectedBrand={selectedBrand}
            />

            {error && <ErrorCard error={error} />}

            {
                showLoadingSkeleton
                    ? <FirmCardsSkeleton />
                    : brands.length === 0
                        ? <NotFoundCard />
                        : <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                            {
                                brands.map((brand) => (<BrandCard key={brand._id} brand={brand} onEdit={handleOpenEdit} />))
                            }
                        </div>
            }
        </section>
    )
}
