//page Parcelles qui permet  afficher la liste de parceles de la ferme

import { prisma } from "@/lib/prisma";
import { createParcelle } from "./actions";

export default async function Parcelles() {
  const parcelles = await prisma.parcelle.findMany({
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
          </article>
        ))}
      </div>
    </section>
  );
}
