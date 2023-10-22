export { default } from "next-auth/middleware";

// Esse middleware serve para impedir acessos diretamente aos links
export const config = {
  matcher: ["/issues/new", "/issue/edit/:id+"],
};
