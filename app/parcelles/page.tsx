//page Parcelles qui permet  afficher la liste de parceles de la ferme

import { prisma } from "@/lib/prisma";
import { createParcelle } from "./actions";

export default async function Parcelles() {
  const parcelles = await prisma.parcelle.findMany({
    include: { capteur: true, cultures: true },
    orderBy: { id: "desc" },
  });

  return (
    <section>
      <h1> Parcelles </h1>
      <p>
        Consultez les parcelles agricoles de la ferme et ajoutez des nouvelles.
      </p>

      <form action={createParcelle}>
        <input name="nom" placeholder="Nom" required />
        <input name="superficie" placeholder="Superficie" required />
        <input name="typeSol" placeholder="Type de sol" required />
        <input name="localisation" placeholder="Localisation" required />
        <button type="submit">Ajouter</button>
      </form>

      <div>
        {parcelles.map((parcelle) => (
          <article key={parcelle.id}>
            <h2>{parcelle.nom}</h2>
            <p>Superficie : {parcelle.superficie}</p>
            <p>Type de sol : {parcelle.typeSol}</p>
            <p>Localisation : {parcelle.localisation}</p>

            {/* Affiche le code du capteur de la parcelle, ou "Aucun capteur" s'il n'y en a pas, 
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
