"use client";

import React from 'react';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const popularProducts: Product[] = [
  {
    id: '1',
    name: 'Croque Monsieur',
    description: 'Jambon, fromage gratiné',
    price: '12,50€',
    image: '/menu/croque-monsieur.jpg'
  },
  {
    id: '2',
    name: 'Café Gourmand',
    description: 'Café, mini desserts assortis',
    price: '9,50€',
    image: '/menu/cafe-gourmand.jpg'
  },
  {
    id: '3',
    name: 'Quiche Lorraine',
    description: 'Lardons, crème fraîche',
    price: '11,00€',
    image: '/menu/quiche-lorraine.jpg'
  },
  {
    id: '4',
    name: 'Salade Niçoise',
    description: 'Thon, olives, anchois',
    price: '14,50€',
    image: '/menu/salade-nicoise.jpg'
  }
];

export default function PopularProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200; // Reduced from 280 to match new card width
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(
          container.scrollWidth - container.clientWidth,
          scrollPosition + scrollAmount
        );

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScrollPosition(newPosition);
  };

  return (
    <div className="w-full py-4 bg-white">
      <div className="px-4 flex items-center justify-between mb-3">
        <h2 className="text-lg font-medium text-gray-800">
          Nos Produits Populaires
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            style={{ display: scrollPosition === 0 ? 'none' : 'block' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="relative px-4">
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {popularProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex-none w-44 snap-start bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-32 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 176px, 176px"
                  priority={index < 2}
                  className="object-cover"
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-2.5">
                <h3 className="font-medium text-sm mb-0.5 line-clamp-1">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-1.5 line-clamp-1">{product.description}</p>
                <p className="text-gray-900 text-sm font-semibold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 