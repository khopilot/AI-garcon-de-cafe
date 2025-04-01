"use client";

import { useState, useEffect } from "react";

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

interface MenuItemEditorProps {
  item: MenuItem | null;
  onSave: (item: MenuItem) => void;
  onCancel: () => void;
  isNew: boolean;
}

// List of common allergenes for the checklist
const commonAllergenes = [
  "gluten",
  "crustacés",
  "œuf",
  "poisson",
  "arachides",
  "soja",
  "lait",
  "fruits à coque",
  "céleri",
  "moutarde",
  "sésame",
  "sulfites",
  "lupin",
  "mollusques"
];

export default function MenuItemEditor({ 
  item, 
  onSave, 
  onCancel,
  isNew 
}: MenuItemEditorProps) {
  const [formData, setFormData] = useState<MenuItem>({
    plat_id: "",
    type: "plats",
    nom: "",
    prix_euro: 0,
    description: "",
    allergenes: [],
  });
  const [newAllergene, setNewAllergene] = useState("");

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "prix_euro") {
      // Handle price as a number
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAllergeneToggle = (allergene: string) => {
    const updatedAllergenes = formData.allergenes.includes(allergene)
      ? formData.allergenes.filter(a => a !== allergene)
      : [...formData.allergenes, allergene];
    
    setFormData({
      ...formData,
      allergenes: updatedAllergenes,
    });
  };

  const handleAddCustomAllergene = () => {
    if (newAllergene && !formData.allergenes.includes(newAllergene)) {
      setFormData({
        ...formData,
        allergenes: [...formData.allergenes, newAllergene],
      });
      setNewAllergene("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a proper ID if it's a new item
    if (isNew) {
      const typePrefix = getTypePrefix(formData.type);
      const randomNum = Math.floor(Math.random() * 99) + 1;
      const newId = `${typePrefix}${randomNum.toString().padStart(2, '0')}`;
      
      onSave({
        ...formData,
        plat_id: newId,
      });
    } else {
      onSave(formData);
    }
  };

  const getTypePrefix = (type: string): string => {
    switch (type) {
      case "entrees":
        return "E";
      case "plats":
        return "P";
      case "desserts":
        return "D";
      case "boissons":
        return "B";
      default:
        return "X";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">
        {isNew ? "Ajouter un nouvel élément" : "Modifier l'élément"}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {!isNew && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID
              </label>
              <input
                type="text"
                name="plat_id"
                value={formData.plat_id}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="entrees">Entrées</option>
              <option value="plats">Plats</option>
              <option value="desserts">Desserts</option>
              <option value="boissons">Boissons</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix (€)
            </label>
            <input
              type="number"
              name="prix_euro"
              value={formData.prix_euro}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          {formData.type === "boissons" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Volume
              </label>
              <input
                type="text"
                name="volume"
                value={formData.volume || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="ex: 25cl"
              />
            </div>
          )}
          
          {formData.type !== "boissons" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Suggestion de vin
              </label>
              <input
                type="text"
                name="suggestion_vin"
                value={formData.suggestion_vin || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="ex: Verre de Bordeaux rouge"
              />
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Allergènes
          </label>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
            {commonAllergenes.map((allergene) => (
              <div key={allergene} className="flex items-center">
                <input
                  type="checkbox"
                  id={`allergene-${allergene}`}
                  checked={formData.allergenes.includes(allergene)}
                  onChange={() => handleAllergeneToggle(allergene)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label
                  htmlFor={`allergene-${allergene}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {allergene}
                </label>
              </div>
            ))}
          </div>
          
          <div className="flex items-center">
            <input
              type="text"
              value={newAllergene}
              onChange={(e) => setNewAllergene(e.target.value)}
              placeholder="Autre allergène"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={handleAddCustomAllergene}
              className="ml-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Ajouter
            </button>
          </div>
          
          {formData.allergenes.length > 0 && (
            <div className="mt-3">
              <span className="text-sm font-medium text-gray-700">Allergènes sélectionnés:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.allergenes.map((allergene) => (
                  <span
                    key={allergene}
                    className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                  >
                    {allergene}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
} 