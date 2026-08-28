import { useEffect } from "react";
import { ChartAreaInteractive } from "../components/chart-area-interactive";
import { SectionCards } from "../components/section-cards";
import useStock from "@/features/stock/useStock";
import { selectPurchases, selectSales } from "@/features/stock/stockSlice";
import { useSelector } from "react-redux";

export default function OverviewPage() {

  const sales = useSelector(selectSales);
  const purchases = useSelector(selectPurchases);

  const { getStockResources } = useStock();


  useEffect(() => {
    // getStock('sales')
    // getStock('purchases')
    getStockResources(['sales', 'purchases'])
  }, [])



  return (
    <section className='space-y-5 pt-3 px-4'>
      <SectionCards sales={sales} purchases={purchases} />
      <ChartAreaInteractive sales={sales} purchases={purchases} />
    </section>
  )
}
