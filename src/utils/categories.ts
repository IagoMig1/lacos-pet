// Centralized category mapping
export const categories = {
  lacos: {
    name: "Laços",
    slug: "lacos",
    image: "/imagens/categorias/laco.jpg"
  },
  gravatas: {
    name: "Gravatas",
    slug: "gravatas",
    image: "/imagens/categorias/gravata.jpg"
  },
  babadores: {
    name: "Babadores",
    slug: "babadores",
    image: "/imagens/categorias/babador.jpg"
  },
  bandanas: {
    name: "Bandanas",
    slug: "bandanas",
    image: "/imagens/categorias/bandana.jpg"
  },
  acessorios: {
    name: "Acessórios",
    slug: "acessorios",
    image: "/imagens/categorias/acessorios.jpg"
  },
  adesivos: {
    name: "Adesivos",
    slug: "adesivos",
    image: "/imagens/categorias/adesivos.jpg"
  },
  gargantilhas: {
    name: "Gargantilhas",
    slug: "gargantilhas",
    image: "/imagens/categorias/gargantilha.jpg"
  }
} as const;
export type CategorySlug = keyof typeof categories;
export const getCategoryName = (slug: string): string => {
  return (categories as any)[slug]?.name || slug;
};