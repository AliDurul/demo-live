import { selectError, selectFirms, selectFirmsStatus } from '@/features/stockSlice'
import useStockCall from '@/hooks/useStockCall'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Card,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import FirmCard from '@/components/FirmCard'
import { FirmCardsSkeleton } from '@/components/shared/Skeletons'
import { FirmModal } from '@/components/FirmModal'
import { ErrorCard, NotFoundCard } from '@/components/shared/InfoCards'

export default function Firms() {
  const { getStockData } = useStockCall()
  const firms = useSelector(selectFirms)
  const firmsStatus = useSelector(selectFirmsStatus)
  const error = useSelector(selectError)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFirm, setSelectedFirm] = useState(null)

  useEffect(() => {
    getStockData('firms')
  }, [getStockData])

  const handleOpenCreate = () => {
    setSelectedFirm(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (firm) => {
    setSelectedFirm(firm)
    setModalOpen(true)
  }

  const handleModalChange = (isOpen) => {
    setModalOpen(isOpen)
    if (!isOpen) {
      setSelectedFirm(null)
    }
  }

  const showLoadingSkeleton = firmsStatus === 'idle' || (firmsStatus === 'loading' && firms.length === 0)


  return (
    <section className="space-y-4 pt-3 px-5">
      <Button variant="outline" onClick={handleOpenCreate}>Create New Firm</Button>

      <FirmModal
        open={modalOpen}
        onOpenChange={handleModalChange}
        selectedFirm={selectedFirm}
      />

      {error && <ErrorCard error={error} />}

      {
        showLoadingSkeleton
          ? <FirmCardsSkeleton />
          : firms.length === 0
            ? <NotFoundCard />
            :
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              {
                firms.map((firm) => (<FirmCard key={firm._id} firm={firm} onEdit={handleOpenEdit} />))
              }
            </div>
      }
    </section>
  )
}
