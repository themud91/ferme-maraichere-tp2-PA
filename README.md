# Les Jardins du Soleil

Guillermo Perez. Cours: Programmation avancée, TP2

## Description

Application Web de gestion d'une ferme maraîchère. 

Elle permet de gérer les parcelles, les cultures, les employés et les capteurs, et de visualiser les liens entre ces données.

Technologies: Next.js, TypeScript, Prisma, SQLite.

## Installation et démarrage

1. Installer les dépendances:

       npm install

2. Créer un fichier `.env` à la racine du projet avec ce contenu:

       DATABASE_URL="file:./dev.db"

3. Appliquer les migrations (crée la base SQLite):

       npx prisma migrate dev

4. Générer le client Prisma:

       npx prisma generate

5. Démarrer l'application:

       npm run dev

L'application est accessible à l'adresse http://localhost:3000

## Fonctionnalités

- Navigation entre les pages Accueil, Parcelles, Cultures, Employés et Capteurs.
- Parcelles: création et affichage, avec le capteur et les cultures de chaque parcelle.
- Employés: création et affichage, avec les cultures auxquelles chaque employé participe.
- Capteurs: création sur une parcelle existante, une seule parcelle par capteur.
- Cultures: création sur une parcelle existante et affectation de plusieurs
  employés, avec affichage des employés de chaque culture.
- Relations: Parcelle et Capteur (1 à 1), Parcelle et Culture (1 à N),
  Culture et Employé (N à N).
- Validation de base des formulaires.
