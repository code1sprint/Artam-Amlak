import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (propertyId: string, propertyTitle?: string) => void;
  isFavorite: (propertyId: string) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'artam_favorite_properties';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (propertyId: string, propertyTitle?: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(propertyId);
      if (exists) {
        toast.info(propertyTitle ? `«${propertyTitle}» از علاقه‌مندی‌ها حذف شد` : 'از علاقه‌مندی‌ها حذف شد');
        return prev.filter((id) => id !== propertyId);
      } else {
        toast.success(propertyTitle ? `«${propertyTitle}» به علاقه‌مندی‌ها افزوده شد` : 'به علاقه‌مندی‌ها افزوده شد');
        return [...prev, propertyId];
      }
    });
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
