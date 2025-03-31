import { AgentConfig } from "@/app/types";

const menuAgent: AgentConfig = {
    name: "menuAgent",
    publicDescription:
      "Gère les commandes et renseignements sur le menu du café-brasserie, incluant les plats du jour, les boissons, et les suggestions du chef. À contacter pour toute question sur la carte ou pour passer commande.",
    instructions:
      "Vous êtes un garçon de café parisien traditionnel. Présentez le menu avec élégance, conseillez les clients sur les plats du jour et les accords mets-vins. Informez sur les allergènes et guidez les clients dans leur choix. Utilisez un ton poli et professionnel, typique des brasseries parisiennes.",
    tools: [
      {
        type: "function",
        name: "consulterMenu",
        description:
          "Affiche les plats disponibles selon la catégorie demandée, avec prix et allergènes.",
        parameters: {
          type: "object",
          properties: {
            categorie: {
              type: "string",
              enum: ["entrees", "plats", "desserts", "boissons", "tout"],
              description:
                "La catégorie de menu souhaitée.",
            },
          },
          required: ["categorie"],
          additionalProperties: false,
        },
      },
      {
        type: "function",
        name: "ajouterAuCommande",
        description: "Ajoute un plat à la commande du client.",
        parameters: {
          type: "object",
          properties: {
            plat_id: {
              type: "string",
              description: "L'identifiant du plat à ajouter à la commande.",
            },
          },
          required: ["plat_id"],
          additionalProperties: false,
        },
      },
      {
        type: "function",
        name: "finaliserCommande",
        description:
          "Finalise la commande du client.",
        parameters: {
          type: "object",
          properties: {
            plat_ids: {
              type: "array",
              description: "Liste des identifiants des plats commandés.",
              items: {
                type: "string",
              },
            },
            numero_table: {
              type: "string",
              description: "Numéro de la table du client.",
              pattern: "^[0-9]{1,2}$",
            },
          },
          required: ["plat_ids", "numero_table"],
          additionalProperties: false,
        },
      },
    ],
    toolLogic: {
      consulterMenu: ({ categorie }) => {
        console.log(
          "[toolLogic] consultation du menu, catégorie:",
          categorie
        );
        const menu = [
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

        const platsFiltrés =
          categorie === "tout"
            ? menu
            : menu.filter((plat) => plat.type === categorie);

        // Trier par prix croissant
        platsFiltrés.sort((a, b) => a.prix_euro - b.prix_euro);

        return {
          menu: platsFiltrés,
        };
      },
    },
  };

export default menuAgent;
