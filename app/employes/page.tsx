// Page Employes: permet d'afficher la liste des employes

import { prisma } from "@/lib/prisma";
import { createEmploye } from "./actions";

export default async function Employes() {
  const employes = await prisma.employe.findMany({
    include: { cultures: true },
    orderBy: { id: "desc" },
  });

  return (
    <section className="page">
      <h1> Employés </h1>
      <p>
        Consultez les employés de la ferme et les cultures auxquelles ils
        participent.
      </p>

      <form className="form" action={createEmploye}>
        <input name="prenom" placeholder="Prenom" required />
        <input name="nom" placeholder="Nom" required />
        <input name="specialite" placeholder="Specialité" required />
        <button type="submit">Ajouter</button>
      </form>

      <div className="cards">
        {employes.map((employe) => (
          <article className="card" key={employe.id}>
            <h2>
              {employe.prenom} {employe.nom}
            </h2>
            <p>Spécialite: {employe.specialite}</p>

            {/* ! message si l'employe na aucune culture  */}
            <p>Cultures:</p>
            {employe.cultures.length === 0 ? (
              <p>Aucune culture</p>
            ) : (
              <ul>
                {employe.cultures.map((culture) => (
                  <li key={culture.id}>{culture.nom}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
