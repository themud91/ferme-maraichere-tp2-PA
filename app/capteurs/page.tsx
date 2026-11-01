// afficher la liste des capteurs

import { prisma } from "@/lib/prisma";
import { createCapteur } from "./actions";

export default async function Capteurs() {
  const parcelles = await prisma.parcelle.findMany({
    // afficher parcelles sans capteur
    where: { capteur: null },
    orderBy: { id: "desc" },
  });

  const capteurs = await prisma.capteur.findMany({
    include: { parcelle: true },
    orderBy: { id: "desc" },
  });

  return (
    <section>
      <h1> Capteurs </h1>
      <p>Consultez les capteurs installés sur les parcelles.</p>

      <form action={createCapteur}>
        <input name="code" placeholder="Code" required />
        {/* type="number... le navigateur refuse strings */}
        <input
          name="humidite"
          type="number"
          step="any"
          placeholder="Humidité"
          required
        />
        <input
          name="temperature"
          type="number"
          step="any"
          placeholder="Température"
          required
        />

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
        {capteurs.map((capteur) => (
          <article key={capteur.id}>
            <h2>{capteur.code}</h2>
            <p>Humidité : {capteur.humidite}</p>
            <p>Température : {capteur.temperature}</p>
            <p>Parcelle : {capteur.parcelle.nom}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
