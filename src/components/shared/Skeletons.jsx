import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function FirmCardSkeleton() {
	return (
		<Card className="relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden pt-0 shadow-lg">
			<Skeleton className="aspect-video w-full rounded-none" />

			<CardHeader className="flex-1 space-y-4 px-2">
				<div className="flex items-center justify-between gap-3">
					<Skeleton className="h-6 w-20" />
					<Skeleton className="h-6 w-24" />
				</div>
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-2/3" />
				</div>
			</CardHeader>

			<CardFooter className="flex flex-col gap-2 px-2">
				<Skeleton className="w-full h-6" />
				<Skeleton className="w-full h-6" />
				<Skeleton className="w-full h-6" />
			</CardFooter>
		</Card>
	)
}

export function FirmCardsSkeleton({ count = 8 }) {
	return (
		<div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
			{Array.from({ length: count }).map((_, idx) => (
				<FirmCardSkeleton key={idx} />
			))}
		</div>
	)
}

export function BrandCardsSkeleton({ count = 8 }) {
	return (
		<div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
			{Array.from({ length: count }).map((_, idx) => (
				<FirmCardSkeleton key={idx} />
			))}
		</div>
	)
}

export function TableSkeleton() {
	return (
		<div className="space-y-3">
			{Array.from({ length: 5 }).map((_, idx) => (
				<Skeleton key={idx} className="h-10 rounded" />
			))}
		</div>
	)
}