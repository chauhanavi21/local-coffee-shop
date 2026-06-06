import { cafe } from "./cafe";

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  image: string;
  features: string[];
}

export const locations: Location[] = [
  {
    id: "wolf-road",
    name: cafe.name,
    address: cafe.address.street,
    city: `${cafe.address.city}, ${cafe.address.state} ${cafe.address.zip}`,
    hours: cafe.hours.summary,
    phone: cafe.phone,
    image: "/images/location-downtown.jpg",
    features: [
      "On-site coffee roasting",
      "House-baked pastries",
      "Breakfast & lunch",
      "Catering available",
      "Shoppers Park",
    ],
  },
];
