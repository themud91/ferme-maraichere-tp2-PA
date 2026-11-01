"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createParcelle(formData: FormData) {
  const nom = String(formData.get("nom") ?? "").trim();
  const superficie = Number(formData.get("superficie"));
  const typeSol = String(formData.get("typeSol") ?? "").trim();
  const localisation = String(formData.get("localisation") ?? "").trim();

  // validation: tous les champs doivent d'etre remplis
  if (!nom || !typeSol || !localisation) {
    return;
  }

  await prisma.parcelle.create({
    data: { nom, superficie, typeSol, localisation },
  });

  revalidatePath("/parcelles");
}
