import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type DateTimePickerProps = {
  onSave: (pickupDate: Date, pickupTime: string, dropoffDate: Date, dropoffTime: string) => void
  onCancel: () => void
   /** booking’s existing pick-up (to show as selected) */
  defaultPickupDate?: Date | null
  /** when true, ignore clicks on the left calendar */
 disablePickup?: boolean
}

export default function DateTimePicker({ onSave, onCancel, defaultPickupDate ,  disablePickup = false  }: DateTimePickerProps) {
  // Get current date and next month
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // State for selected dates and times
  const [selectedPickupDate, setSelectedPickupDate] = useState<Date | null>(defaultPickupDate || null)
  const [selectedDropoffDate, setSelectedDropoffDate] = useState<Date | null>(null)
  const [pickupTime, setPickupTime] = useState("10:00")
  const [dropoffTime, setDropoffTime] = useState("16:00")

  // State for displayed months
  const [leftMonthDate, setLeftMonthDate] = useState(new Date(currentYear, currentMonth))
  const [rightMonthDate, setRightMonthDate] = useState(new Date(currentYear, currentMonth + 1))

  // State for validation error
  const [validationError, setValidationError] = useState(false)

  // Navigate months
  const navigateMonths = (direction: number) => {
    setLeftMonthDate(new Date(leftMonthDate.getFullYear(), leftMonthDate.getMonth() + direction))
    setRightMonthDate(new Date(rightMonthDate.getFullYear(), rightMonthDate.getMonth() + direction))
  }

  // Generate days for a month
  const generateDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const prevMonthDays = new Date(year, month, 0).getDate()

    const days = []

    // Previous month days
    for (let i = firstDay === 0 ? 6 : firstDay - 1; i > 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i + 1),
        isCurrentMonth: false,
        isSelectable: false,
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      days.push({
        date,
        isCurrentMonth: true,
        isSelectable: date >= today,
      })
    }

    // Next month days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isSelectable: false,
      })
    }

    return days
  }

  // Check if a date is selected
  const isDateSelected = (date: Date) => {
    if (!selectedPickupDate && !selectedDropoffDate) return false

    const dateStr = date.toDateString()
    return (
      (selectedPickupDate && dateStr === selectedPickupDate.toDateString()) ||
      (selectedDropoffDate && dateStr === selectedDropoffDate.toDateString())
    )
  }

  // Check if a date is in the selected range
  const isInRange = (date: Date) => {
    if (!selectedPickupDate || !selectedDropoffDate) return false
    return date > selectedPickupDate && date < selectedDropoffDate
  }

  // Handle date selection
  const handleDateClick = (date: Date) => {
    // if this click is on the left calendar AND disablePickup, ignore it
   const isLeftCalendar =
      date.getMonth() === leftMonthDate.getMonth() &&
      date.getFullYear() === leftMonthDate.getFullYear()
    if (disablePickup && isLeftCalendar) {
      return
    }
    if (!selectedPickupDate || (selectedPickupDate && selectedDropoffDate)) {
      // Start new selection
      setSelectedPickupDate(date)
      setSelectedDropoffDate(null)
    } else {
      // Complete selection
      if (date < selectedPickupDate) {
        setSelectedPickupDate(date)
        setSelectedDropoffDate(selectedPickupDate)
      } else {
        setSelectedDropoffDate(date)
      }
    }
    setValidationError(false)
  }

  // Handle save
  const handleSave = () => {
    if (selectedPickupDate && selectedDropoffDate && pickupTime && dropoffTime) {
      onSave(selectedPickupDate, pickupTime, selectedDropoffDate, dropoffTime)
    } else {
      setValidationError(true)
    }
  }

  // Format month name
  const formatMonth = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" })
  }

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigateMonths(-1)} className="p-1">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex space-x-4">
          <div className="text-center font-medium">{formatMonth(leftMonthDate)}</div>
          <div className="text-center font-medium">{formatMonth(rightMonthDate)}</div>
        </div>
        <button onClick={() => navigateMonths(1)} className="p-1">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left calendar */}
        <div>
          <div className="grid grid-cols-7 mb-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <div key={i} className="text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {generateDays(leftMonthDate.getFullYear(), leftMonthDate.getMonth()).map((day, i) => (
              <div
                key={i}
                className={`
                  h-8 w-8 flex items-center justify-center text-sm rounded-full
                  ${!day.isCurrentMonth ? "text-gray-300" : ""}
                  ${!day.isSelectable ? "cursor-not-allowed" : "cursor-pointer"}
                  ${isDateSelected(day.date) ? "bg-black text-white" : ""}
                  ${isInRange(day.date) ? "bg-gray-200" : ""}
                  ${day.isSelectable && !isDateSelected(day.date) && !isInRange(day.date) ? "hover:bg-gray-100" : ""}
                `}
                onClick={() => day.isSelectable && handleDateClick(day.date)}
              >
                {day.date.getDate()}
              </div>
            ))}
          </div>
        </div>

        {/* Right calendar */}
        <div>
          <div className="grid grid-cols-7 mb-2">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <div key={i} className="text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {generateDays(rightMonthDate.getFullYear(), rightMonthDate.getMonth()).map((day, i) => (
              <div
                key={i}
                className={`
                  h-8 w-8 flex items-center justify-center text-sm rounded-full
                  ${!day.isCurrentMonth ? "text-gray-300" : ""}
                  ${!day.isSelectable ? "cursor-not-allowed" : "cursor-pointer"}
                  ${isDateSelected(day.date) ? "bg-black text-white" : ""}
                  ${isInRange(day.date) ? "bg-gray-200" : ""}
                  ${day.isSelectable && !isDateSelected(day.date) && !isInRange(day.date) ? "hover:bg-gray-100" : ""}
                `}
                onClick={() => day.isSelectable && handleDateClick(day.date)}
              >
                {day.date.getDate()}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-500 block mb-1">Pick-up time</label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="text-sm text-gray-500 block mb-1">Drop-off time</label>
          <input
            type="time"
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      {validationError && (
        <p className="text-red-500 text-sm mt-2">Please select both pickup and drop-off dates and times</p>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md">
          Save
        </button>
      </div>
    </div>
  )
}


