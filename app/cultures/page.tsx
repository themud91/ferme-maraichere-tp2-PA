// affiche la liste des cultures et cree une

import { prisma } from "@/lib/prisma";
import { createCulture, assignEmployes } from "./actions";

export default async function Cultures() {
  
  const parcelles = await prisma.parcelle.findMany({
    orderBy: { id: "desc" },
  });

  // lu a chaque chargement de la page... justification: un employe embauche plus tard apparait dans le select
  const employes = await prisma.employe.findMany();

  // charger la parcelle liee a chaque culture
  const cultures = await prisma.culture.findMany({
    include: { parcelle: true, employes: true },
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

      <form action={assignEmployes}>
        <select name="cultureId" required>
          {cultures.map((culture) => (
            <option key={culture.id} value={culture.id}>
              {culture.nom}
            </option>
          ))}
        </select>

        <select name="employeIds" multiple required>
          {employes.map((employe) => (
            <option key={employe.id} value={employe.id}>
              {employe.prenom} {employe.nom}
            </option>
          ))}
        </select>

        <button type="submit">Affecter</button>
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

            <p>Employés:</p>
            {culture.employes.length === 0 ? (
              <p>Aucun employé</p>
            ) : (
              <ul>
                {culture.employes.map((employe) => (
                  <li key={employe.id}>
                    {employe.prenom} {employe.nom}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
