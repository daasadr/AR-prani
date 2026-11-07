// Jediné místo, které dělí web na veřejnou a soukromou zónu (viz openspec foundation-by-design).
export const PRIVATE_PREFIXES = ["/p", "/hotovo", "/admin", "/api"] as const;

// Veřejné stránky, které už existují. Sitemap a llms.txt se skládají odsud,
// novou stránku přidej až ve chvíli, kdy má skutečný obsah.
export const PUBLIC_ROUTES = [
  { path: "/", title: "Přání s talismanem", summary: "Online přání, ve kterém příjemce sfoukne svíčku a dostane talisman štěstí." },
] as const;

export function isPrivatePath(pathname: string): boolean {
  return PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
