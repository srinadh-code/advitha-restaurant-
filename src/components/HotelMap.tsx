import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const hotelIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const touristIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function HotelMap() {
  const hotelPosition: [number, number] = [
    18.1955085,
    79.9405633,
  ];

  const touristPlaces = [
    {
      name: "Ramappa Temple",
      position: [18.2591, 79.9436],
    },
    {
      name: "Laknavaram Lake",
      position: [18.2065, 80.0924],
    },
    {
      name: "Bogatha Waterfall",
      position: [17.9305, 80.6235],
    },
    {
      name: "Medaram",
      position: [18.3227, 80.3534],
    },
  ];

  return (
    <MapContainer
      center={hotelPosition}
      zoom={10}
      style={{ height: "288px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Hotel Marker */}
      <Marker
        position={hotelPosition}
        icon={hotelIcon}
      >
        <Popup>
          <strong>Mulugu Hotel</strong>
          <br />
          Main Road, Mulugu
        </Popup>
      </Marker>

      {/* Tourist Markers */}
      {touristPlaces.map((place, index) => (
        <Marker
          key={index}
          position={place.position as [number, number]}
          icon={touristIcon}
        >
          {/* <Popup>
            <strong>{place.name}</strong>
            <br />
            Tourist Attraction
          </Popup> */}
          {/* <Popup>
   <div>
     <h3>Ramappa Temple</h3>
     <a
       href="https://maps.google.com/?q=18.2591,79.9436"
       target="_blank"
     >
       Get Directions
     </a>
   </div> */}
{/* </Popup>  */}
<Popup>
       <div>
     <h3>{place.name}</h3>
     <a
      href={`/tourism?place=${encodeURIComponent(place.name)}`}
    >
      Click to Explore
    </a>
   </div>
</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}