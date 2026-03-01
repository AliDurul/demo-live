import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react"
import { Link, useLocation } from "react-router-dom"

const formatSegment = (segment) => {
  const decodedSegment = decodeURIComponent(segment)

  return decodedSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function BreadCrumb() {
  const { pathname } = useLocation()
  const rawSegments = pathname.split("/").filter(Boolean)
  const segments = rawSegments[0] === "stock" ? rawSegments.slice(1) : rawSegments

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/stock">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, idx) => {
          const href = `/${rawSegments[0] === "stock" ? "stock/" : ""}${segments
            .slice(0, idx + 1)
            .join("/")}`
          const isLast = idx === segments.length - 1
          const label = formatSegment(segment)

          return (
            <Fragment key={`${href}-${idx}`}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
