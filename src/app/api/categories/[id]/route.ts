import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { categorySchema } from "@/schemas/category.schema";

// PUT - modifier une catégorie
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // Validation Zod
    const result = categorySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Données invalides",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, description } = result.data;

    // Vérifier si une autre catégorie porte le même nom
    const existingCategory = await Category.findOne({
      name: name.trim(),
      isArchived: false,
      _id: { $ne: id },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Cette catégorie existe déjà" },
        { status: 409 }
      );
    }

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return NextResponse.json(
        { message: "Catégorie introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("PUT category error:", error);

    return NextResponse.json(
      { message: "Erreur lors de la modification" },
      { status: 500 }
    );
  }
}

// DELETE - archiver une catégorie
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const category = await Category.findByIdAndUpdate(
      id,
      { isArchived: true },
      { new: true }
    );

    if (!category) {
      return NextResponse.json(
        { message: "Catégorie introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Catégorie archivée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE category error:", error);

    return NextResponse.json(
      { message: "Erreur lors de l'archivage" },
      { status: 500 }
    );
  }
}