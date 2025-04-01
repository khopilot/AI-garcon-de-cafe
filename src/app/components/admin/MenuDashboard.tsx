"use client";

import { useState, useEffect } from "react";
import MenuItemEditor from "./MenuItemEditor";

// Define menu item type based on the structure in sales.ts
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

export default function MenuDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [filterType, setFilterType] = useState<string>("tout");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load menu items from API
    const loadMenuItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Call the API to get menu items
        const response = await fetch('/api/admin/menu', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load menu: ${response.statusText}`);
        }
        
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error loading menu items:", error);
        setError("Impossible de charger le menu. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  const handleSave = async (item: MenuItem) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Call the API to add/update item
      const response = await fetch('/api/admin/menu', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(item)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save menu item: ${response.statusText}`);
      }
      
      // Refresh the menu list
      const updatedResponse = await fetch('/api/admin/menu', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      
      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        setMenuItems(updatedData);
      }
      
      setIsEditing(false);
      setIsAdding(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error saving menu item:", error);
      setError("Impossible de sauvegarder l'élément. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      try {
        setIsLoading(true);
        setError(null);
        
        // Call the API to delete item
        const response = await fetch(`/api/admin/menu?platId=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to delete menu item: ${response.statusText}`);
        }
        
        // Update local state
        setMenuItems(menuItems.filter(item => item.plat_id !== id));
      } catch (error) {
        console.error("Error deleting menu item:", error);
        setError("Impossible de supprimer l'élément. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleAdd = () => {
    // Create a new empty item with a unique ID
    const newItemId = generateNewId();
    setSelectedItem({
      plat_id: newItemId,
      type: "plats",
      nom: "",
      prix_euro: 0,
      description: "",
      allergenes: []
    });
    setIsAdding(true);
    setIsEditing(true);
  };

  const generateNewId = () => {
    // Generate a unique ID based on the type
    const existingIds = menuItems.map(item => item.plat_id);
    let newId = "";
    let counter = 1;
    
    do {
      newId = `NEW${counter.toString().padStart(2, '0')}`;
      counter++;
    } while (existingIds.includes(newId));
    
    return newId;
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    setSelectedItem(null);
  };

  const exportMenu = () => {
    const jsonData = JSON.stringify(menuItems, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "menu_export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Filter the menu items by type
  const filteredItems = filterType === "tout" 
    ? menuItems 
    : menuItems.filter(item => item.type === filterType);

  if (isLoading) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {isEditing ? (
        <MenuItemEditor 
          item={selectedItem} 
          onSave={handleSave} 
          onCancel={handleCancel}
          isNew={isAdding}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Gestion du Menu</h2>
            <div className="flex space-x-3">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Ajouter un Élément
              </button>
              <button
                onClick={exportMenu}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Exporter le Menu
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="filterType" className="mr-2 font-medium">
              Filtrer par catégorie:
            </label>
            <select
              id="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="tout">Tous les éléments</option>
              <option value="entrees">Entrées</option>
              <option value="plats">Plats</option>
              <option value="desserts">Desserts</option>
              <option value="boissons">Boissons</option>
            </select>
          </div>

          {menuItems.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Aucun élément dans le menu.</p>
              <button
                onClick={handleAdd}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Ajouter votre premier élément
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix (€)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allergènes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredItems.map((item) => (
                    <tr key={item.plat_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.plat_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.type === "entrees" && "Entrées"}
                        {item.type === "plats" && "Plats"}
                        {item.type === "desserts" && "Desserts"}
                        {item.type === "boissons" && "Boissons"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nom}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.prix_euro.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.allergenes.length > 0 ? item.allergenes.join(", ") : "Aucun"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(item.plat_id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
} 