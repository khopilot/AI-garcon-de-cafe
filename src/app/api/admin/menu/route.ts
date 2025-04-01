import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// This simulates server-side authentication check
// In a production app, use a proper auth system
const isAuthenticated = (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')?.split(' ')[1];
  return authToken === process.env.ADMIN_TOKEN || authToken === 'temp_admin_token';
};

// Path to the menu data file - in production, use a database
const menuFilePath = path.join(process.cwd(), 'data', 'menu.json');

// Ensure the data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Initial menu data from sales.ts
const getInitialMenu = () => {
  return [
    {
      plat_id: "E01",
      type: "entrees",
      nom: "Soupe à l'Oignon Gratinée",
      prix_euro: 12.50,
      description: "Soupe traditionnelle aux oignons, gratinée au fromage",
      allergenes: ["gluten", "lait"],
      suggestion_vin: "Verre de Chablis"
    },
    {
      plat_id: "E02",
      type: "entrees",
      nom: "Escargots de Bourgogne",
      prix_euro: 14.00,
      description: "6 escargots au beurre persillé",
      allergenes: ["lait", "fruits à coque"],
      suggestion_vin: "Verre de Bourgogne blanc"
    },
    {
      plat_id: "P01",
      type: "plats",
      nom: "Steak-Frites",
      prix_euro: 24.50,
      description: "Steak de bœuf, frites maison, sauce béarnaise",
      allergenes: ["œuf", "lait", "moutarde"],
      suggestion_vin: "Verre de Bordeaux rouge"
    },
    {
      plat_id: "P02",
      type: "plats",
      nom: "Confit de Canard",
      prix_euro: 26.00,
      description: "Cuisse de canard confite, pommes sarladaises",
      allergenes: ["sulfites"],
      suggestion_vin: "Verre de Cahors"
    },
    {
      plat_id: "P03",
      type: "plats",
      nom: "Choucroute Garnie",
      prix_euro: 23.50,
      description: "Choucroute, saucisses assorties, lard fumé",
      allergenes: ["sulfites", "gluten"],
      suggestion_vin: "Bière pression alsacienne"
    },
    {
      plat_id: "D01",
      type: "desserts",
      nom: "Crème Brûlée",
      prix_euro: 9.50,
      description: "À la vanille de Madagascar",
      allergenes: ["lait", "œuf"],
      suggestion_vin: "Verre de Sauternes"
    },
    {
      plat_id: "D02",
      type: "desserts",
      nom: "Tarte Tatin",
      prix_euro: 10.00,
      description: "Servie tiède avec crème fraîche",
      allergenes: ["gluten", "lait", "œuf"],
      suggestion_vin: "Verre de Champagne"
    },
    {
      plat_id: "B01",
      type: "boissons",
      nom: "Vin Rouge Maison",
      prix_euro: 6.50,
      description: "Verre 15cl - Côtes du Rhône",
      allergenes: ["sulfites"],
      volume: "15cl"
    },
    {
      plat_id: "B02",
      type: "boissons",
      nom: "Kronenbourg 1664",
      prix_euro: 7.00,
      description: "Pression",
      allergenes: ["gluten"],
      volume: "25cl"
    },
    {
      plat_id: "B03",
      type: "boissons",
      nom: "Evian",
      prix_euro: 4.50,
      description: "Eau minérale naturelle",
      allergenes: [],
      volume: "50cl"
    }
  ];
};

// Get the menu items
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if menu file exists
    if (!fs.existsSync(menuFilePath)) {
      ensureDataDir();
      
      // If not, return the initial menu from the sales.ts file
      const initialMenu = getInitialMenu();
      
      // Save the initial menu
      fs.writeFileSync(menuFilePath, JSON.stringify(initialMenu, null, 2));
      
      return NextResponse.json(initialMenu);
    }
    
    // Read the menu file
    const menuData = fs.readFileSync(menuFilePath, 'utf-8');
    const menu = JSON.parse(menuData);
    
    return NextResponse.json(menu);
  } catch (error) {
    console.error('Error getting menu:', error);
    return NextResponse.json({ error: 'Failed to get menu' }, { status: 500 });
  }
}

// Update the menu
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    
    // Validate the data
    if (!Array.isArray(data)) {
      return NextResponse.json({ error: 'Invalid menu data' }, { status: 400 });
    }
    
    // Ensure data directory exists
    ensureDataDir();
    
    // Save the menu data
    fs.writeFileSync(menuFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json({ error: 'Failed to update menu' }, { status: 500 });
  }
}

// Add a single menu item
export async function PUT(request: NextRequest) {
  try {
    // Check if user is authenticated
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const newItem = await request.json();
    
    // Validate the new item
    if (!newItem.plat_id || !newItem.type || !newItem.nom) {
      return NextResponse.json({ error: 'Invalid menu item data' }, { status: 400 });
    }
    
    // Ensure data directory exists
    ensureDataDir();
    
    // Read existing menu or create empty array
    let menu = [];
    if (fs.existsSync(menuFilePath)) {
      const menuData = fs.readFileSync(menuFilePath, 'utf-8');
      menu = JSON.parse(menuData);
    }
    
    // Check if item with this ID already exists
    const existingItemIndex = menu.findIndex((item: any) => item.plat_id === newItem.plat_id);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      menu[existingItemIndex] = newItem;
    } else {
      // Add new item
      menu.push(newItem);
    }
    
    // Save the updated menu
    fs.writeFileSync(menuFilePath, JSON.stringify(menu, null, 2));
    
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error adding/updating menu item:', error);
    return NextResponse.json({ error: 'Failed to add/update menu item' }, { status: 500 });
  }
}

// Delete a menu item
export async function DELETE(request: NextRequest) {
  try {
    // Check if user is authenticated
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const platId = searchParams.get('platId');
    
    if (!platId) {
      return NextResponse.json({ error: 'Missing plat_id parameter' }, { status: 400 });
    }
    
    // Check if menu file exists
    if (!fs.existsSync(menuFilePath)) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
    }
    
    // Read the menu file
    const menuData = fs.readFileSync(menuFilePath, 'utf-8');
    const menu = JSON.parse(menuData);
    
    // Filter out the item to delete
    const updatedMenu = menu.filter((item: any) => item.plat_id !== platId);
    
    // Save the updated menu
    fs.writeFileSync(menuFilePath, JSON.stringify(updatedMenu, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
} 