"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createParcelle(formData: FormData) {
  const nom = String(formData.get("nom"));
  const superficie = Number(formData.get("superficie"));
  const typeSol = String(formData.get("typeSol"));
  const localisation = String(formData.get("localisation"));

  await prisma.parcelle.create({
    data: { nom, superficie, typeSol, localisation },
  });

  revalidatePath("/parcelles");
}
