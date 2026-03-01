import { Button } from "@/components/ui/button";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"

export default function Error() {
  const error = useRouteError()
  console.log(error);
  let title = "Something went wrong"
  let message = "We couldn’t load this page in Smart Stock."
  let status = ""

  if (isRouteErrorResponse(error)) {
    status = String(error.status)

    if (error.status === 404) {
      title = "Page not found"
      message = "The page you are looking for does not exist."
    } else if (error.status === 401 || error.status === 403) {
      title = "Access denied"
      message = "You do not have permission to view this page."
    } else if (error.status >= 500) {
      title = "Server error"
      message = "Smart Stock is having trouble right now. Please try again."
    } else {
      message = error.statusText || message
    }
  } else if (error instanceof Error) {
    message = error.message || message
  } else { // development fallback for non-error thrown values
    message = String(error) || message
  }

  return (
    <div
      className="min-h-svh bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/auth-bg.png')" }}
    >
      <div className="min-h-svh bg-background/70 dark:bg-background/10 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border bg-card/95 p-6 text-card-foreground shadow-lg backdrop-blur">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Smart Stock {status ? `• ${status}` : ""}
          </p>

          <h1 className="mt-2 text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>

          <div className="mt-6 flex gap-3">
            <Button
              variant="link"
              onClick={() => window.history.back()}
              className=""
            >
              Go Back
            </Button>
            <Button>
              <Link
                to="/"
              >
                Go Home
              </Link>
            </Button>
            <Button variant="outline">
              <Link
                to="/stock"
              >
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}