// page Cultures qui permet d'afficher la liste des cultures et creer une

import { prisma } from "@/lib/prisma";
import { createCulture } from "./actions";

export default async function Cultures() {
  // toutes les parcelles
  const parcelles = await prisma.parcelle.findMany({
    orderBy: { id: "desc" },
  });

  // charger la parcelle liee a chaque culture
  const cultures = await prisma.culture.findMany({
    include: { parcelle: true },
    orderBy: { id: "desc" },
  });

  return (
    <section>
      <h1> Cultures </h1>
      <p>Consultez les cultures de la ferme et ajoutez des nouvelles.</p>

      <form action={createCulture}>
        <input name="nom" placeholder="Nom" required />
        <input name="dateSemis" type="date" required />
        <input name="dateRecoltePrevue" type="date" required />
        <input name="statut" placeholder="Statut" required />

        <select name="parcelleId" required>
          {parcelles.map((parcelle) => (
            <option key={parcelle.id} value={parcelle.id}>
              {parcelle.nom}
            </option>
          ))}
        </select>

        <button type="submit">Ajouter</button>
      </form>

      <div>
        {cultures.map((culture) => (
          <article key={culture.id}>
            <h2>{culture.nom}</h2>
            <p>Semis: {culture.dateSemis.toLocaleDateString("fr-CA")}</p>
            <p>
              Recolte prevue :{" "}
              {culture.dateRecoltePrevue.toLocaleDateString("fr-CA")}
            </p>
            <p>Statut: {culture.statut}</p>
            <p>Parcelle: {culture.parcelle.nom}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
