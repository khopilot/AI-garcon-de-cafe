'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type MenuItem = {
  plat_id: string;
  type: string;
  nom: string;
  prix_euro: number;
  description: string;
  allergenes: string[];
  suggestion_vin?: string;
  volume?: string;
  image: string;
};

const defaultMenu: MenuItem[] = [
  {
    plat_id: "E01",
    type: "entrees",
    nom: "Soupe à l&apos;Oignon Gratinée",
    prix_euro: 12.50,
    description: "Soupe traditionnelle aux oignons, gratinée au fromage",
    allergenes: ["gluten", "lait"],
    suggestion_vin: "Verre de Chablis",
    image: "/menu/soupe-oignon.jpg"
  },
  {
    plat_id: "E02",
    type: "entrees",
    nom: "Escargots de Bourgogne",
    prix_euro: 14.00,
    description: "6 escargots au beurre persillé",
    allergenes: ["lait", "fruits à coque"],
    suggestion_vin: "Verre de Bourgogne blanc",
    image: "/menu/escargots.jpg"
  },
  {
    plat_id: "P01",
    type: "plats",
    nom: "Steak-Frites",
    prix_euro: 24.50,
    description: "Steak de bœuf, frites maison, sauce béarnaise",
    allergenes: ["œuf", "lait", "moutarde"],
    suggestion_vin: "Verre de Bordeaux rouge",
    image: "/menu/steak-frites.jpg"
  },
  {
    plat_id: "P02",
    type: "plats",
    nom: "Confit de Canard",
    prix_euro: 26.00,
    description: "Cuisse de canard confite, pommes sarladaises",
    allergenes: ["sulfites"],
    suggestion_vin: "Verre de Cahors",
    image: "/menu/confit-canard.jpg"
  },
  {
    plat_id: "P03",
    type: "plats",
    nom: "Choucroute Garnie",
    prix_euro: 23.50,
    description: "Choucroute, saucisses assorties, lard fumé",
    allergenes: ["sulfites", "gluten"],
    suggestion_vin: "Bière pression alsacienne",
    image: "/menu/choucroute.jpg"
  },
  {
    plat_id: "D01",
    type: "desserts",
    nom: "Crème Brûlée",
    prix_euro: 9.50,
    description: "À la vanille de Madagascar",
    allergenes: ["lait", "œuf"],
    suggestion_vin: "Verre de Sauternes",
    image: "/menu/creme-brulee.jpg"
  },
  {
    plat_id: "D02",
    type: "desserts",
    nom: "Tarte Tatin",
    prix_euro: 10.00,
    description: "Servie tiède avec crème fraîche",
    allergenes: ["gluten", "lait", "œuf"],
    suggestion_vin: "Verre de Champagne",
    image: "/menu/tarte-tatin.jpg"
  },
  {
    plat_id: "B01",
    type: "boissons",
    nom: "Vin Rouge Maison",
    prix_euro: 6.50,
    description: "Verre 15cl - Côtes du Rhône",
    allergenes: ["sulfites"],
    volume: "15cl",
    image: "/menu/vin-rouge.jpg"
  },
  {
    plat_id: "B02",
    type: "boissons",
    nom: "Kronenbourg 1664",
    prix_euro: 7.00,
    description: "Pression",
    allergenes: ["gluten"],
    volume: "25cl",
    image: "/menu/biere.jpg"
  },
  {
    plat_id: "B03",
    type: "boissons",
    nom: "Evian",
    prix_euro: 4.50,
    description: "Eau minérale naturelle",
    allergenes: [],
    volume: "50cl",
    image: "/menu/eau.jpg"
  }
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('tout');
  const [showAllergenes, setShowAllergenes] = useState<boolean>(false);

  const filteredMenu = selectedCategory === 'tout'
    ? defaultMenu
    : defaultMenu.filter(item => item.type === selectedCategory);

  const categories = [
    { id: 'tout', label: 'Tout' },
    { id: 'entrees', label: 'Entrées' },
    { id: 'plats', label: 'Plats' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'boissons', label: 'Boissons' }
  ];

  const formatAllergenes = (allergenes: string[]) => {
    if (allergenes.length === 0) return 'Aucun allergène';
    return allergenes.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(', ');
  };

  const renderMenuItem = (item: MenuItem) => (
    <div key={item.plat_id} className="bg-[#fcfaf7] rounded-lg border border-[#f5e9c0] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={item.image}
          alt={item.nom}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg font-serif">{item.nom}</h3>
          <span className="text-lg font-semibold text-[#722F37]">{item.prix_euro.toFixed(2)}€</span>
        </div>
        <p className="text-gray-600 text-sm">{item.description}</p>
        {item.volume && (
          <p className="text-sm text-gray-500">Volume: {item.volume}</p>
        )}
        {item.suggestion_vin && (
          <p className="text-sm text-[#9c575e]">
            <span className="font-medium">Suggestion:</span> {item.suggestion_vin}
          </p>
        )}
        {showAllergenes && (
          <p className="text-xs text-gray-500 mt-2">
            <span className="font-medium">Allergènes:</span> {formatAllergenes(item.allergenes)}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20 px-4 max-w-7xl mx-auto pb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-serif">
          Notre Carte
        </h1>
        
        <div className="bg-[#fcfaf7] p-6 md:p-8 rounded-lg border border-[#f5e9c0] shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#722F37] font-serif relative pb-3 elegant-border mb-4 sm:mb-0">
              Découvrez nos spécialités
            </h2>
            <button
              onClick={() => setShowAllergenes(!showAllergenes)}
              className="inline-flex items-center px-4 py-2 border border-[#f5e9c0] rounded-md shadow-sm text-sm font-medium text-[#722F37] bg-white hover:bg-[#fff9f0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#722F37] transition-colors"
            >
              {showAllergenes ? 'Masquer les allergènes' : 'Afficher les allergènes'}
            </button>
          </div>

          {/* Filtres de catégories - Style amélioré */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${selectedCategory === category.id
                      ? 'bg-[#722F37] text-white'
                      : 'bg-white text-gray-700 border border-[#f5e9c0] hover:bg-[#fff9f0]'
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Liste des plats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map(renderMenuItem)}
        </div>
      </div>

      {/* Style pour l'élément de design */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .elegant-border::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 2px;
          background-color: #d4af37;
        }
      `}</style>
    </div>
  );
} 