
# Etapa 1: instalar dependencias
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

# Etapa 2: producción
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

EXPOSE 3000

USER node

CMD ["npm", "start"]