import { AgentConfig } from "@/app/types";

const reclamations: AgentConfig = {
  name: "suggestions",
  publicDescription:
    "Agent spécialisé dans les suggestions personnalisées basées sur les préférences des clients.",
  instructions: `
# Personnalité et Ton
## Identité
Vous êtes un expert en suggestions gastronomiques, capable d'analyser les préférences des clients pour proposer les plats et boissons les plus adaptés.

## Mission
Votre mission est de :
1. Analyser les informations collectées sur les préférences du client
2. Consulter le menu pour identifier les options les plus pertinentes
3. Proposer des suggestions personnalisées en tenant compte :
   - Des restrictions alimentaires
   - Des préférences de goût
   - Du type de repas souhaité (léger, copieux, etc.)
4. Suggérer des accords mets-vins appropriés
5. Adapter les suggestions en fonction du feedback du client

## Comportement
Vous êtes attentif aux détails et capable de faire des suggestions précises :
- "Compte tenu de votre préférence pour les plats légers, je vous suggère..."
- "Puisque vous appréciez les vins rouges, je peux vous recommander..."
- "Pour accompagner ce plat, voici ce que je vous conseille..."

## Ton
Parlez d'une voix posée et respectueuse, en utilisant un français soigné. Votre ton doit refléter le prestige de l'établissement tout en restant accessible.

## Niveau de Formalité
Conservez un niveau de formalité élevé, caractéristique des grands établissements parisiens. Utilisez systématiquement le vouvoiement et les formules de politesse appropriées.

## Expression des Émotions
Faites preuve d'empathie et de compréhension, tout en restant professionnel. Validez les préoccupations du client sans pour autant compromettre les standards de l'établissement.

## Expressions Typiques
- "Je comprends tout à fait votre préoccupation, Madame/Monsieur"
- "Permettez-moi de vous proposer une solution"
- "Nous allons remédier à cela immédiatement"
- "Je vous prie de nous excuser pour ce désagrément"

## Rythme
Adoptez un rythme posé et réfléchi, donnant au client le sentiment d'être écouté et pris au sérieux.

# Étapes
1. Commencez par identifier la table du client et vérifier les détails de sa commande
2. Écoutez attentivement la nature de la réclamation
3. Consultez les politiques de l'établissement avant de proposer une solution
4. Voir "Détermination de la Solution Appropriée" pour le traitement

## Accueil
- Présentez-vous en tant que maître d'hôtel responsable du service client
- Montrez que vous êtes au courant du contexte de la réclamation
  - Exemple : "Je comprends que vous souhaitez nous faire part d'une préoccupation concernant {}, permettez-moi de vous aider."

# Détermination de la Solution Appropriée
- Vérifiez d'abord les détails de la commande avec 'consulterCommande()'
- Écoutez attentivement la description du problème
- Consultez toujours les politiques avec 'consulterPolitiques()' AVANT d'appeler verifierEligibiliteEtProposerSolution()
- Utilisez 'verifierEligibiliteEtProposerSolution()' pour valider la solution proposée
- Si de nouvelles informations apparaissent, demandez des précisions au client
- Restez prudent dans vos promesses et attendez la confirmation avant de vous engager
- Une fois la solution validée, expliquez clairement les détails et les prochaines étapes

# Informations Générales
- Date du jour : 26/12/2024
`,
  tools: [
    {
      type: "function",
      name: "consulterCommande",
      description:
        "Récupère les détails d'une commande en utilisant le numéro de table.",
      parameters: {
        type: "object",
        properties: {
          numeroTable: {
            type: "string",
            description: "Le numéro de la table du client.",
            pattern: "^[0-9]{1,2}$"
          },
        },
        required: ["numeroTable"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "consulterPolitiques",
      description:
        "Consulte les politiques de l'établissement concernant les réclamations et les solutions possibles.",
      parameters: {
        type: "object",
        properties: {
          typeReclamation: {
            type: "string",
            enum: ["qualite", "temperature", "service", "temps_attente", "autre"],
            description: "Le type de réclamation du client."
          },
          categoriePlat: {
            type: "string",
            enum: ["entrees", "plats", "desserts", "boissons"],
            description: "La catégorie du plat concerné."
          },
        },
        required: ["typeReclamation", "categoriePlat"],
        additionalProperties: false,
      },
    },
    {
      type: "function",
      name: "verifierEligibiliteEtProposerSolution",
      description: "Vérifie l'éligibilité d'une solution proposée et la met en œuvre si appropriée.",
      parameters: {
        type: "object",
        properties: {
          solutionProposee: {
            type: "string",
            description: "La solution que vous souhaitez proposer au client."
          },
          question: {
            type: "string",
            description: "La question spécifique pour laquelle vous avez besoin d'une validation."
          },
        },
        required: ["solutionProposee", "question"],
        additionalProperties: false,
      },
    },
  ],
  toolLogic: {
    consulterCommande: ({ numeroTable }) => {
      console.log(`[toolLogic] consultation de la commande pour la table ${numeroTable}`);
      return {
        commandes: [
          {
            commande_id: "CMD-261224-001",
            heure_commande: "2024-12-26T19:30:00Z",
            heure_service: "2024-12-26T19:45:00Z",
            statut: "servie",
            montant_total_euro: 98.50,
            plats: [
              {
                plat_id: "E01",
                nom: "Soupe à l'Oignon Gratinée",
                prix_euro: 12.50,
                statut: "servi",
                heure_service: "2024-12-26T19:45:00Z"
              },
              {
                plat_id: "P01",
                nom: "Steak-Frites",
                prix_euro: 24.50,
                cuisson_demandee: "à point",
                statut: "servi",
                heure_service: "2024-12-26T20:00:00Z"
              },
              {
                plat_id: "B01",
                nom: "Vin Rouge Maison",
                prix_euro: 6.50,
                quantite: 2,
                statut: "servi",
                heure_service: "2024-12-26T19:35:00Z"
              }
            ],
          }
        ],
      };
    },
    consulterPolitiques: () => {
      return `
Au Café-Brasserie Le Parisien, nous nous engageons à offrir une expérience gastronomique d'excellence :

1. POLITIQUE GÉNÉRALE DE SATISFACTION
• Temps de Service : Nous nous engageons à servir les entrées dans les 15 minutes et les plats principaux dans les 25 minutes.
• Température : Tous nos plats doivent être servis à la température appropriée.
• Qualité : Nous garantissons la fraîcheur et la qualité de tous nos produits.

2. GESTION DES RÉCLAMATIONS
• Réactivité : Toute réclamation doit être traitée immédiatement par le maître d'hôtel.
• Solutions : 
  - Plat non satisfaisant : Proposition de remplacement immédiat
  - Température incorrecte : Réchauffage ou remplacement selon préférence
  - Erreur de commande : Correction immédiate
  - Temps d'attente excessif : Compensation appropriée (dessert ou café offert)

3. CAS PARTICULIERS
• Allergies : En cas de problème lié aux allergènes, traitement prioritaire et immédiat
• Cuisson de la viande : Remplacement systématique si la cuisson ne correspond pas à la demande
• Vins : Remplacement possible en cas de défaut constaté (bouchonné, etc.)

4. COMPENSATIONS
• Autorisation du maître d'hôtel pour :
  - Offrir un dessert
  - Offrir les cafés
  - Appliquer une réduction sur l'addition
  - Offrir une bouteille de vin lors d'une prochaine visite

5. SUIVI CLIENT
• Enregistrement systématique des incidents
• Suivi personnalisé pour les clients réguliers
• Contact de suivi possible pour les cas significatifs

Notre objectif est de transformer chaque incident en une opportunité de démontrer notre engagement envers la satisfaction de nos clients.`;
    },
    verifierEligibiliteEtProposerSolution: async (args, transcriptLogs) => {
      console.log(
        "verifierEligibiliteEtProposerSolution()",
        args,
      );
      const nMostRecentLogs = 10;
      const messages = [
        {
          role: "system",
          content:
            "Vous êtes un maître d'hôtel expert dans l'évaluation des situations délicates et la proposition de solutions appropriées, tout en respectant les standards de l'établissement.",
        },
        {
          role: "user",
          content: `Évaluez attentivement le contexte fourni et déterminez si la solution proposée est appropriée selon nos politiques. Fournissez une explication concise de votre décision.

<contexteModele>
${JSON.stringify(args, null, 2)}
</contexteModele>

<contexteConversation>
${JSON.stringify(transcriptLogs.slice(nMostRecentLogs), args, 2)}
</contexteConversation>

<format_reponse>
# Raisonnement
// Brève description expliquant la décision

# Demande Client
// La préoccupation ou demande du client

# Solution Éligible
vrai/faux/besoin_plus_info
// "vrai" si vous êtes confiant que la solution est appropriée
// "besoin_plus_info" si vous avez besoin d'informations supplémentaires

# Informations Supplémentaires Nécessaires
// Autres informations nécessaires pour prendre une décision. "Aucune" si non applicable

# Prochaines Étapes
// Expliquez les prochaines étapes au client. Uniquement si solution_eligible=vrai, sinon "Aucune"
</format_reponse>
`,
        },
      ];

      const model = "o1-mini";
      console.log(`vérification de l'éligibilité avec model=${model}`);

      const response = await fetch("/api/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model, messages }),
      });

      if (!response.ok) {
        console.warn("Le serveur a retourné une erreur:", response);
        return { error: "Une erreur s'est produite." };
      }

      const completion = await response.json();
      console.log(completion.choices[0].message.content);
      return { resultat: completion.choices[0].message.content };
    },
  },
};

export default reclamations;
