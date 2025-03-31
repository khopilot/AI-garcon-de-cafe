import React from 'react';

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

interface MenuCardProps {
  item: MenuItem;
  onSelect?: (platId: string) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect?.(item.plat_id)}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{item.nom}</h3>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-[#722F37] font-medium">{item.prix_euro}€</span>
          {item.suggestion_vin && (
            <span className="text-sm text-gray-500">
              🍷 {item.suggestion_vin}
              {item.volume && ` (${item.volume})`}
            </span>
          )}
        </div>
        {item.allergenes.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-500">
              Allergènes: {item.allergenes.join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard; 