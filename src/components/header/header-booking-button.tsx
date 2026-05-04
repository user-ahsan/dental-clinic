import React, { memo } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const HeaderBookingButton: React.FC<{ className?: string }> = memo(function HeaderBookingButton({
  className,
}) {
  return (
    <Link href="/booking">
      <Button
        type="button"
        size="lg"
        className={className}
      >
        <Calendar className="size-4" />
        Book Appointment
      </Button>
    </Link>
  )
})

export default HeaderBookingButton