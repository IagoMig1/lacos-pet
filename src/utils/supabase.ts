import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ecpaaqsexrpsxrpckclx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjcGFhcXNleHJwc3hycGNrY2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTY0ODUsImV4cCI6MjA1OTU3MjQ4NX0.c5XrrAHMkGZ0xUZSdq2hziWa9wi5SOIg60VHV0ozSBc";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export type Product = {
  id: number;
  nome: string;
  categoria: "lacos" | "gravatas" | "babadores" | "bandanas" | "acessorios" | "adesivos" | "gargantilhas";
  preco: number;
  descricao: string;
  imagem_url: string;
};
export async function getProducts(): Promise<Product[]> {
  const {
    data,
    error
  } = await supabase.from("produtos").select("*").order("id", {
    ascending: true
  });
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data || [];
}
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const {
    data,
    error
  } = await supabase.from("produtos").select("*").eq("categoria", category).order("id", {
    ascending: true
  });
  if (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
  return data || [];
}
export async function getProductById(id: number): Promise<Product | null> {
  const {
    data,
    error
  } = await supabase.from("produtos").select("*").eq("id", id).single();
  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
  return data;
}
export async function createProduct(product: Omit<Product, "id">): Promise<Product | null> {
  const {
    data,
    error
  } = await supabase.from("produtos").insert([product]).select().single();
  if (error) {
    console.error("Error creating product:", error);
    return null;
  }
  return data;
}
export async function updateProduct(id: number, product: Partial<Product>): Promise<Product | null> {
  const {
    data,
    error
  } = await supabase.from("produtos").update(product).eq("id", id).select().single();
  if (error) {
    console.error(`Error updating product with id ${id}:`, error);
    return null;
  }
  return data;
}
export async function deleteProduct(id: number): Promise<boolean> {
  const {
    error
  } = await supabase.from("produtos").delete().eq("id", id);
  if (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    return false;
  }
  return true;
}
export async function uploadProductImage(file: File): Promise<string | null> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `products/${fileName}`;
  const {
    error: uploadError
  } = await supabase.storage.from("product-images").upload(filePath, file);
  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    return null;
  }
  const {
    data: {
      publicUrl
    }
  } = supabase.storage.from("product-images").getPublicUrl(filePath);
  return publicUrl;
}