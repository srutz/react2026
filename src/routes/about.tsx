import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = Route.useNavigate()
    return (
        <div className="flex flex-col gap-2">
            About this app
            <Button onClick={() => {
                navigate({ to: '/imprint' })
            }}>Go to imprint</Button>
        </div>
    )
}
