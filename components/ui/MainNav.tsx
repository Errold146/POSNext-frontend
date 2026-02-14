import { MainNavClient } from "./MainNavClient";
import { CategoriesResponseSchema } from "@/src/schemas";

async function getCategories() {
    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url)
    const json = await req.json()
    const categories = CategoriesResponseSchema.parse(json)
    return categories
}

export async function MainNav() {

    const categories = await getCategories()

    return (
        <MainNavClient categories={categories} />
    )
}