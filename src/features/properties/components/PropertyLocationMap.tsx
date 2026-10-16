import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';
import { toPersianDigits } from '@/lib/formatters';

export interface PropertyLocationMapProps {
  lat: number;
  lng: number;
  title: string;
  district: string;
  address: string;
  className?: string;
}

export function PropertyLocationMap({
  lat,
  lng,
  title,
  district,
  address,
  className = '',
}: PropertyLocationMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 14.5,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Custom Luxury Gold Marker Icon
    const customMarkerIcon = L.divIcon({
      className: 'custom-property-pin',
      html: `
        <div style="
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          background: #0F2A47;
          border: 3px solid #C9A24B;
          color: #C9A24B;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(15, 42, 71, 0.35);
          animation: pulse 2s infinite;
        ">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });

    const popupHtml = `
      <div style="direction: rtl; text-align: start; font-family: 'Vazirmatn Variable', sans-serif; padding: 4px;">
        <div style="font-weight: 800; font-size: 13px; color: #0F2A47; margin-bottom: 4px;">${title}</div>
        <div style="font-size: 11px; color: #64748B;">${address}</div>
      </div>
    `;

    L.marker([lat, lng], { icon: customMarkerIcon }).addTo(map).bindPopup(popupHtml).openPopup();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [lat, lng, title, address]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent-600" />
          <h3 className="text-lg font-bold text-primary-900">موقعیت جغرافیایی ملک</h3>
        </div>
        <span className="text-xs text-muted-foreground font-semibold">
          {district}، شمیرانات
        </span>
      </div>

      <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-border shadow-soft bg-muted">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Address Bar */}
        <div className="absolute bottom-4 start-4 end-4 z-20 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-border shadow-soft flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-9 h-9 rounded-xl bg-primary-900 text-accent flex items-center justify-center shrink-0">
              <Navigation className="w-4 h-4" />
            </div>
            <div className="truncate text-start">
              <span className="text-xs font-bold text-primary-900 block truncate">{address}</span>
              <span className="text-[11px] text-muted-foreground">دسترسی عالی به شاهراه‌ها و مراکز دیپلماتیک</span>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl bg-accent-50 text-accent-800 border border-accent-300 text-xs font-bold shrink-0 hover:bg-accent-100 transition-colors"
          >
            مسیریابی در نقشه &larr;
          </a>
        </div>
      </div>
    </div>
  );
}
