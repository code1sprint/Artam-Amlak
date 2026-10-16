import React from 'react';

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
}

export interface PersonAvatarProps {
  name: string;
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
}

export function PersonAvatar({
  name,
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  loading = 'lazy',
}: PersonAvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? name}
        loading={loading}
        className={`${imgClassName} ${className}`.trim()}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt ?? name}
      className={`flex items-center justify-center bg-primary-100 text-primary-800 font-bold select-none ${className}`.trim()}
    >
      {getInitials(name)}
    </div>
  );
}
