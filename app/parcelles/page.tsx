//page Parcelles qui permet  afficher la liste de parceles de la ferme

import { prisma } from "@/lib/prisma";
import { createParcelle } from "./actions";

export default async function Parcelles() {
  const parcelles = await prisma.parcelle.findMany({
    include: { capteur: true, cultures: true },
    orderBy: { id: "desc" },
  });

  return (
    <section className="page">
      <h1> Parcelles </h1>
      <p>
        Consultez les parcelles agricoles de la ferme et ajoutez des nouvelles.
      </p>

      <form className="form" action={createParcelle}>
        <input name="nom" placeholder="Nom" required />
        {/* type="number... le navigateur refuse strings */}
        <input
          name="superficie"
          type="number"
          step="any"
          placeholder="Superficie (hectares)"
          required
        />
        <input name="typeSol" placeholder="Type de sol" required />
        <input name="localisation" placeholder="Localisation" required />
        <button type="submit">Ajouter</button>
      </form>

      <div className="cards">
        {parcelles.map((parcelle) => (
          <article className="card" key={parcelle.id}>
            <h2>{parcelle.nom}</h2>
            <p>Superficie : {parcelle.superficie} hectares</p>
            <p>Type de sol : {parcelle.typeSol}</p>
            <p>Localisation : {parcelle.localisation}</p>

            {/* Affiche le code du capteur de la parcelle...  "Aucun capteur" s'il n' a pas, 
            comme vu dans  Bio: {etudiant.profil?.bio ?? "Aucun profil"} */}
            <p>Capteur : {parcelle.capteur?.code ?? "Aucun capteur"}</p>

            {/* cultures est un tableau (relation 1:N... parcourt avec map */}
            <p>Cultures :</p>
            {parcelle.cultures.length === 0 ? (
              <p>Aucune culture</p>
            ) : (
              <ul>
                {parcelle.cultures.map((culture) => (
                  <li key={culture.id}>
                    {culture.nom} ({culture.statut})
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
