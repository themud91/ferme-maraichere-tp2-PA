// Server Action cree un employe dans sqLite

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEmploye(formData: FormData) {

  const nom = String(formData.get("nom") ?? "").trim();
  const prenom = String(formData.get("prenom") ?? "").trim();
  const specialite = String(formData.get("specialite") ?? "").trim();

  // validation 
  if (!prenom || !nom || !specialite) {
    return;
  }

  await prisma.employe.create({
    data: { nom, prenom, specialite },
  });

  revalidatePath("/employes");
}
