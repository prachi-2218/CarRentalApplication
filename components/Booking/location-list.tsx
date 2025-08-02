type Location = {
  id: string
  locationName: string
  locationAddress: string
  locationImageUrl: string
}

type LocationListProps = {
  locations: Location[]
  onSelect: (location: Location) => void
  selectedLocationId?: string
}

export default function LocationList({ locations, onSelect, selectedLocationId }: LocationListProps) {
  return (
    <div className="py-1 bg-cream-50 rounded-md">
      {locations.map((location) => (
        <div
          key={location.id}
          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
            selectedLocationId === location.id ? "bg-black text-white" : ""
          }`}
          onClick={() => onSelect(location)}
        >
          {location.locationName}
        </div>
      ))}
    </div>
  )
}
