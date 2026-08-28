import { useState } from "react";
import useStock from "../useStock";
import { useSelector } from "react-redux";
import { selectBrands, selectBrandsStatus } from "../stockSlice";
import { useEffect } from "react";
import { BrandCardsSkeleton } from "@/components/shared/Skeletons";
import { BrandCard } from "../components/brand-card";
import { BrandModal } from "../components/brand-modal";

export default function BrandPage() {


    const { getStock } = useStock();
    const [open, setOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null)
    const brands = useSelector(selectBrands);
    const brandsStatus = useSelector(selectBrandsStatus);
    const isLoading = brandsStatus === 'idle' || (brandsStatus === 'loading' && brands.length === 0);


    const handleModalChange = (isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
            setSelectedBrand(null)
        }
    }

    useEffect(() => {
        getStock('brands')
    }, [])

    return (
        <section className='space-y-4 p-4'>

            <BrandModal open={open} onOpenChange={handleModalChange} selectedBrand={selectedBrand} />

            {
                isLoading
                    ? <BrandCardsSkeleton />
                    : (
                        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {brands.map((brand) => (
                                <BrandCard key={brand.id} brand={brand} setOpen={setOpen} setSelectedBrand={setSelectedBrand} />
                            ))}
                        </div>
                    )
            }

        </section>
    )
}
