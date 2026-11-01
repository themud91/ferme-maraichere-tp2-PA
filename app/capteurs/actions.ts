// cree un capteur lie a une parcelle existante

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCapteur(formData: FormData) {
  const code = String(formData.get("code") ?? "").trim();
  const humidite = Number(formData.get("humidite"));
  const temperature = Number(formData.get("temperature"));
  const parcelleId = Number(formData.get("parcelleId"));

  // validation
  if (!code) {
    return;
  }

  await prisma.capteur.create({
    data: { code, humidite, temperature, parcelleId },
  });

  revalidatePath("/capteurs");
  // la page Parcelles affiche le capteur
  revalidatePath("/parcelles");
}
