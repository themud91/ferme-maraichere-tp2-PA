// Page Employes: permet d'afficher la liste des employes

import { prisma } from "@/lib/prisma";
import { createEmploye } from "./actions";

export default async function Employes() {
  const employes = await prisma.employe.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <section>
      <h1> Employés </h1>
      <p>
        Consultez les employés de la ferme et les cultures auxquelles ils
        participent.
      </p>

      <form action={createEmploye}>
        <input name="prenom" placeholder="Prenom" required />
        <input name="nom" placeholder="Nom" required />
        <input name="specialite" placeholder="Specialité" required />
        <button type="submit">Ajouter</button>
      </form>

      <div>
        {employes.map((employe) => (
          <article key={employe.id}>
            <h2>
              {employe.prenom} {employe.nom}
            </h2>
            <p>Spécialite: {employe.specialite}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
