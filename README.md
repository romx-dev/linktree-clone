# Linktree Clone

Aplicação SaaS estilo Linktree construída do zero com assistência de IA. Permite que usuários criem uma página única com links, personalizem o visual e gerenciem suas integrações — tudo pensado para ser simples, escalável e fácil de hospedar.

## Stacks / Tecnologias
- Frontend: Next.js (App Router)
- UI: shadcn/ui + Tailwind CSS
- Autenticação: Clerk
- ORM / Banco: Prisma ORM + PostgreSQL
- IA: (assistência para geração de conteúdo/UX — especificar provedor conforme for usado)
- Deploy: Vercel (recomendado)

## Principais recursos
- Autenticação de usuários (Clerk)
- CRUD de links e ordenação
- Personalização de perfil (cores, foto, bio)
- Integração com banco PostgreSQL via Prisma
- Otimizado para performance com Next.js e Tailwind
- Assistência com IA para criação de texto/descrições (opcional)

## Rodando localmente

Instale as dependências e rode o servidor de desenvolvimento:

```bash
npm install
npm run dev
# ou
yarn
yarn dev
# ou
pnpm install
pnpm dev
```

Abra http://localhost:3000 no seu navegador.

Edite a página inicial em `app/page.tsx` — o Next.js recarrega automaticamente.

## Configurações importantes
- Configure a variável de ambiente `DATABASE_URL` apontando para seu banco PostgreSQL.
- Configure as chaves do Clerk no painel da aplicação (frontend + backend).
- Configure qualquer chave/endpoint do provedor de IA se for utilizar geração automática de conteúdo.

## Links úteis
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk](https://clerk.com)
- [Prisma](https://www.prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## Deploy
Recomenda-se o deploy no [Vercel](https://vercel.com) para melhor compatibilidade com Next.js. Consulte a documentação do Next.js para instruções detalhadas de deploy.
