# Intellux News

Aplicação full-stack para leitura de notícias, com:

- Autenticação via Google (OAuth) e JWT
- Favoritos do usuário
- Geração de resumos de notícias com LLM (Gemma 2:2b via Ollama)
- UI responsiva com feed, filtros e modal de resumo

## 1. Funcionamento

Fluxo:

1. Usuário acessa http://localhost:5173.
2. Faz login Google (backend Nest + Passport Google) → backend gera JWT.
3. Redireciona para /feed?token=...&user=...
4. Frontend salva token e dados no localStorage (via `useAuth`).
5. Feed mostra notícias, permite favoritar e gerar resumo.
6. Resumo chama backend que usa Ollama (modelo gemma2:2b) e persiste.

## 2. Tecnologias

Frontend: React, TypeScript, Vite, Axios, Bootstrap.  
Backend: NestJS, Passport (Google, JWT), TypeORM, MySQL, class-validator.  
Infra: Docker, Docker Compose, Ollama (Gemma 2:2b).

## 3. Rodando o projeto

Pré‑requisitos: Docker Compose, credenciais Google OAuth (Client ID/Secret).

### 3.1 Variáveis de ambiente backend (`backend/.env`)

```
DB_HOST=db
DB_PORT=3306
DB_USER=intellux
DB_PASSWORD=intellux
DB_NAME=intellux

JWT_SECRET=super-secret

GOOGLE_CLIENT_ID=SEU_CLIENT_ID
GOOGLE_CLIENT_SECRET=SEU_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

NEWS_API_KEY=SUA_API_KEY


OLLAMA_URL=http://ollama:11434
```

### 3.2 Como obter as chaves do .env (passo a passo)

- Google OAuth (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)

  1. Acesse https://console.cloud.google.com e crie um projeto.
  2. Publique a tela de consentimento (OAuth consent screen) como “External” (em Teste).
  3. Em APIs & Services → Credentials → Create Credentials → OAuth client ID.
  4. Tipo “Web application”.
  5. Authorized redirect URIs: adicione `http://localhost:3000/auth/google/callback`.
  6. (Opcional) Authorized JavaScript origins: `http://localhost:5173` e `http://localhost:3000`.
  7. Salve e copie o Client ID e o Client Secret para o `.env`.

- JWT_SECRET

  - Gere um segredo forte (Linux/Mac):
    ```
    openssl rand -hex 32
    ```
  - Ou com Node.js:
    ```
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```
  - Copie o valor para `JWT_SECRET`.

- NEWS_API_KEY

  1. Crie uma conta em https://newsapi.org/.
  2. Gere a chave no painel (“API Key”).
  3. Copie para `NEWS_API_KEY`.

- Variáveis do MySQL (DB_USER, DB_PASSWORD, DB_NAME, DB_ROOT_PASSWORD)
  - O docker-compose já inicializa o MySQL com os valores do `.env`.  
    Use os padrões sugeridos acima ou altere conforme preferir.
  - Se mudar aqui, mantenha compatível no `docker-compose.yml`.

### 3.3 Docker

```
docker-compose up --build
```

Serviços:

- MySQL
- Ollama (modelo gemma2:2b baixado automaticamente)
- Backend Nest (aguarda modelo)
- Frontend Vite

Acessos:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 4. Decisões técnicas

- Autenticação via Google OAuth + JWT simples no frontend.
- Token entregue via query string e tratado automaticamente por useUrlAuth.
- Favoritos e resumos com gerenciamento otimista para evitar atrasos de UI.
- Serviço de IA isolado no container do Ollama, com modelo baixado no start.
- DTOs e ValidationPipe garantindo entrada consistente no backend.
- Hooks especializados para separar lógica de autenticação, notícias e resumos.
- Backend estruturado em módulos (auth, news, favorites, summaries, users) para facilitar manutenção

## 5. Estrutura resumida

```
teste-intellux/
  frontend/
    src/
      assets/
      components/
      hooks/
      services/
      pages/
      styles/
      types/
    public/
  backend/
    src/
      modules/
        auth/
        favorites/
        news/
        summaries/
        users/
    ollama/

```

## 6. Limitações

- Armazenamento do token em LocalStorage (risco de XSS).
- Falta de refresh token e renovação transparente.
- Feed sem paginação ou cache.
- Tratamento de erro simples tanto no frontend quanto no backend.
- Execução do modelo local pode ser lenta em máquinas modestas.

## 7. Próximos passos

- Migrar autenticação para cookies httpOnly + refresh token.
- Adicionar paginação e caching (ex.: React Query).
- Criar logs estruturados, métricas e rate limiting.
- Melhorar UX de loading e mensagens de erro.
- Implementar testes unitários e E2E + CI.
- Otimizar processamento de resumos e integração com o modelo.
