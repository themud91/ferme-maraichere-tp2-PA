// action ... creer une culture liee a une parcelle existante

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCulture(formData: FormData) {
  const nom = String(formData.get("nom"));
  const statut = String(formData.get("statut"));

  const dateSemis = new Date(String(formData.get("dateSemis")));
  const dateRecoltePrevue = new Date(String(formData.get("dateRecoltePrevue")));

  const parcelleId = Number(formData.get("parcelleId"));

  await prisma.culture.create({
    data: { nom, dateSemis, dateRecoltePrevue, statut, parcelleId },
  });

  revalidatePath("/cultures");
  revalidatePath("/parcelles");
}

export async function assignEmployes(formData: FormData) {
  const cultureId = Number(formData.get("cultureId"));

  const ids = formData.getAll("employeIds").map((id) => Number(id));

  // la culture existe deja: update au lieu de create
  await prisma.culture.update({
    where: { id: cultureId },
   
    
    data: { employes: { connect: ids.map((id) => ({ id })) } },
  });

  revalidatePath("/cultures");
}
