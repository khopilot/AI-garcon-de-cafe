import React, { useState } from 'react';
import MenuCard from './MenuCard';

interface MenuItem {
  plat_id: string;
  type: string;
  nom: string;
  prix_euro: number;
  description: string;
  allergenes: string[];
  suggestion_vin?: string;
  volume?: string;
}

interface MenuGridProps {
  items: MenuItem[];
  onItemSelect?: (platId: string) => void;
  activeCategory?: string;
}

const MenuGrid: React.FC<MenuGridProps> = ({ 
  items, 
  onItemSelect,
  activeCategory = 'tout'
}) => {
  const filteredItems = activeCategory === 'tout' 
    ? items 
    : items.filter(item => item.type === activeCategory);

  return (
    <div className="w-full">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6 px-4 md:px-0">
        {['tout', 'entrees', 'plats', 'desserts', 'boissons'].map((category) => (
          <button
            key={category}
            onClick={() => onItemSelect?.(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeCategory === category 
                ? 'bg-[#722F37] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 md:px-0">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.plat_id}
            item={item}
            onSelect={onItemSelect}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Aucun plat trouvé dans cette catégorie
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuGrid; 