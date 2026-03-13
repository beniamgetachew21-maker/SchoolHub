"use client";

import { useEffect, useRef } from "react";

// Sample Addis Ababa school bus routes with real-ish coordinates
const BUS_ROUTES = [
  {
    id: "R01",
    name: "Bole – Kirkos – School",
    color: "#f97316", // orange
    status: "On Route",
    stops: [
      { name: "Bole Atlas", lat: 9.0163, lng: 38.7947 },
      { name: "Bole Road Junction", lat: 9.0114, lng: 38.7912 },
      { name: "Megenagna", lat: 9.0252, lng: 38.8008 },
      { name: "CMC Road", lat: 9.0334, lng: 38.8072 },
      { name: "Kotebe", lat: 9.0430, lng: 38.8110 },
      { name: "School Campus", lat: 9.0500, lng: 38.8050 },
    ],
    busLat: 9.0252,
    busLng: 38.8008,
    students: 32,
    driver: "Alemayehu Tadesse",
  },
  {
    id: "R02",
    name: "Piassa – Sarbet – School",
    color: "#10b981", // emerald
    status: "On Route",
    stops: [
      { name: "Piassa", lat: 9.0355, lng: 38.7480 },
      { name: "Wavel", lat: 9.0270, lng: 38.7540 },
      { name: "Mexico Square", lat: 9.0202, lng: 38.7620 },
      { name: "Sarbet", lat: 9.0148, lng: 38.7740 },
      { name: "Lideta", lat: 9.0118, lng: 38.7820 },
      { name: "School Campus", lat: 9.0500, lng: 38.8050 },
    ],
    busLat: 9.0202,
    busLng: 38.7620,
    students: 28,
    driver: "Yohannes Girma",
  },
  {
    id: "R03",
    name: "Kaliti – Akaki – School",
    color: "#6366f1", // indigo
    status: "Delayed",
    stops: [
      { name: "Kaliti", lat: 8.9612, lng: 38.7835 },
      { name: "Akaki Market", lat: 8.9780, lng: 38.7900 },
      { name: "Lebu", lat: 8.9920, lng: 38.7950 },
      { name: "Gofa", lat: 9.0005, lng: 38.7990 },
      { name: "Mekanisa", lat: 9.0090, lng: 38.8010 },
      { name: "School Campus", lat: 9.0500, lng: 38.8050 },
    ],
    busLat: 8.9780,
    busLng: 38.7900,
    students: 17,
    driver: "Dawit Bekele",
  },
];

export function TransportMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dynamic import to avoid SSR issues
    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      // Destroy any pre-existing Leaflet instance on this container (HMR safe)
      if ((mapRef.current as any)._leaflet_id) {
        mapInstanceRef.current?.remove();
        mapInstanceRef.current = null;
      }

      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [9.02, 38.79],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      mapInstanceRef.current = map;

      // OpenStreetMap tiles (free, no key needed)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Draw each route
      BUS_ROUTES.forEach((route) => {
        const latlngs = route.stops.map((s) => [s.lat, s.lng] as [number, number]);

        // Polyline
        L.polyline(latlngs, {
          color: route.color,
          weight: 4,
          opacity: 0.85,
          dashArray: route.status === "Delayed" ? "8 6" : undefined,
        }).addTo(map);

        // Stop markers (small circles)
        route.stops.forEach((stop, i) => {
          const isSchool = i === route.stops.length - 1;
          L.circleMarker([stop.lat, stop.lng], {
            radius: isSchool ? 10 : 6,
            fillColor: isSchool ? "#172D13" : route.color,
            color: "#fff",
            weight: 2,
            fillOpacity: 1,
          })
            .addTo(map)
            .bindPopup(
              `<div style="font-family:sans-serif;min-width:140px">
                <b style="font-size:13px">${stop.name}</b><br/>
                <span style="font-size:11px;color:#666">Route ${route.id} • Stop ${i + 1}</span>
              </div>`
            );
        });

        // Animated bus marker (current position)
        const busIcon = L.divIcon({
          html: `<div style="
            background:${route.color};
            color:white;
            border-radius:50%;
            width:28px;height:28px;
            display:flex;align-items:center;justify-content:center;
            font-size:14px;
            border:3px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,0.35);
            animation: pulse-bus 2s infinite;
          ">🚌</div>`,
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        L.marker([route.busLat, route.busLng], { icon: busIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:sans-serif;min-width:160px;padding:4px 0">
              <b style="font-size:13px;color:${route.color}">${route.name}</b><br/>
              <span style="font-size:11px">🚌 ${route.driver}</span><br/>
              <span style="font-size:11px">👦 ${route.students} students aboard</span><br/>
              <span style="font-size:11px;font-weight:bold;color:${route.status === 'Delayed' ? '#ef4444' : '#10b981'}">⬤ ${route.status}</span>
            </div>`
          );
      });

      // School campus marker
      const schoolIcon = L.divIcon({
        html: `<div style="
          background:#172D13;
          color:white;
          border-radius:12px;
          padding:4px 8px;
          font-size:11px;
          font-weight:bold;
          border:2px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.4);
          white-space:nowrap;
        ">🏫 School Campus</div>`,
        className: "",
        iconAnchor: [60, 16],
      });
      L.marker([9.0500, 38.8050], { icon: schoolIcon }).addTo(map);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Inject Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <style>{`
        @keyframes pulse-bus {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(249,115,22,0); }
        }
      `}</style>
      <div ref={mapRef} style={{ height: "100%", width: "100%", borderRadius: "0 0 var(--radius) var(--radius)" }} />
    </>
  );
}
