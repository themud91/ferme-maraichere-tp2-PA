// Accueil avec presentatino, et links

import Link from "next/link";

export default function Home() {
  return (
    <section className="page">
      <h1>Bienvenue aux Jardins du Soleil</h1>
      <p>Application de gestion de notre ferme maraîchère</p>
      <p>parcelles, cultures, employés et capteurs.</p>
      <ul>
        <li>
          <Link href="/parcelles">Parcelles</Link>
        </li>
        <li>
          <Link href="/cultures">Cultures</Link>
        </li>
        <li>
          <Link href="/employes">Employes</Link>
        </li>
        <li>
          <Link href="/capteurs">Capteurs</Link>
        </li>
      </ul>
    </section>
  );
}
