import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { categorySchema } from "@/schemas/category.schema";

// GET - récupérer les catégories
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({
      isArchived: false,
    }).sort({ createdAt: -1 });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("GET categories error:", error);

    return NextResponse.json(
      { message: "Erreur lors de la récupération des catégories" },
      { status: 500 }
    );
  }
}

// POST - créer une catégorie
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validation avec Zod
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

    // Vérifier si la catégorie existe déjà
    const existingCategory = await Category.findOne({
      name: name.trim(),
      isArchived: false,
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Cette catégorie existe déjà" },
        { status: 409 }
      );
    }

    const category = await Category.create({
      name: name.trim(),
      description,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("POST category error:", error);

    return NextResponse.json(
      { message: "Erreur lors de la création de la catégorie" },
      { status: 500 }
    );
  }
}