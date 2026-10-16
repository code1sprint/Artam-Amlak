import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Property } from '@/types/schema';
import { withBase } from '@/lib/base';
import { formatPrice, toPersianDigits } from '@/lib/formatters';

export interface PropertyMapViewProps {
  properties: Property[];
  className?: string;
}

export function PropertyMapView({ properties, className = '' }: PropertyMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on Shemiranat / North Tehran
    const defaultCenter: [number, number] = [35.805, 51.435];
    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 12.5,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Luxury CartoDB Voyager or OpenStreetMap Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    const markersGroup = L.featureGroup();

    properties.forEach((property) => {
      if (!property.lat || !property.lng) return;

      const priceLabel = formatPrice(
        property.dealType === 'rent' ? property.rent : property.price,
        { readableUnit: true }
      );

      // Custom Persian luxury price pill marker
      const customIcon = L.divIcon({
        className: 'custom-property-price-pill',
        html: `
          <div style="
            background: #0F2A47;
            color: #ffffff;
            font-weight: 700;
            font-size: 11px;
            font-family: 'Vazirmatn Variable', sans-serif;
            padding: 4px 10px;
            border-radius: 9999px;
            border: 2px solid #C9A24B;
            box-shadow: 0 4px 14px rgba(15, 42, 71, 0.25);
            white-space: nowrap;
            text-align: center;
            direction: rtl;
            cursor: pointer;
            transition: all 0.2s ease;
          " onmouseover="this.style.background='#C9A24B'; this.style.color='#0F2A47';" onmouseout="this.style.background='#0F2A47'; this.style.color='#ffffff';">
            ${priceLabel}
          </div>
        `,
        iconSize: [84, 30],
        iconAnchor: [42, 15],
      });

      // Mini popup card in Persian
      const popupHtml = `
        <div style="direction: rtl; text-align: start; font-family: 'Vazirmatn Variable', sans-serif; width: 220px; overflow: hidden; border-radius: 12px;">
          <img src="${property.images[0]}" alt="${property.title}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <div style="font-size: 11px; font-weight: 700; color: #C9A24B; margin-bottom: 2px;">${property.district}، ${property.city}</div>
          <div style="font-size: 13px; font-weight: 800; color: #0F2A47; line-height: 1.35; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${property.title}</div>
          <div style="font-size: 11px; color: #64748B; margin-bottom: 8px;">
            ${toPersianDigits(property.area)} متر مربع | ${toPersianDigits(property.bedrooms)} خواب
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #E8E6E1; padding-top: 6px;">
            <div style="font-weight: 800; font-size: 12px; color: #0F2A47;">${priceLabel}</div>
            <a href="${withBase(`/properties/${property.slug}`)}" style="font-size: 11px; font-weight: 700; color: #C9A24B; text-decoration: none;">جزئیات &larr;</a>
          </div>
        </div>
      `;

      const marker = L.marker([property.lat, property.lng], { icon: customIcon }).bindPopup(popupHtml);
      markersGroup.addLayer(marker);
    });

    markersGroup.addTo(map);

    if (properties.length > 0) {
      map.fitBounds(markersGroup.getBounds(), { padding: [40, 40], maxZoom: 14 });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [properties]);

  return (
    <div
      className={`relative w-full h-[620px] rounded-3xl overflow-hidden border border-border shadow-card bg-muted ${className}`}
    >
      <div ref={mapContainerRef} className="w-full h-full z-10" />
      <div className="absolute bottom-4 end-4 z-20 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-border shadow-soft text-xs text-primary-900 font-semibold pointer-events-none">
        {toPersianDigits(properties.length)} ملک روی نقشه شمیرانات
      </div>
    </div>
  );
}
