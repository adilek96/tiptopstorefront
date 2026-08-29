# Next.js 15 в режиме standalone. NEXT_PUBLIC_* инлайнятся в бандл на этапе
# сборки, поэтому все они объявлены как ARG и приходят из Coolify (переменные
# с галкой «Build variable»), а не из окружения контейнера.

FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_MEDUSA_REGION_ID
ARG NEXT_PUBLIC_MEDUSA_TOP_TAG_ID
ARG NEXT_PUBLIC_SHIPPING_OPTION_METRO_ID
ARG NEXT_PUBLIC_SHIPPING_OPTION_CITY_ID
ARG NEXT_PUBLIC_SHIPPING_OPTION_COUNTRY_ID
ARG NEXT_PUBLIC_IMAGE_HOSTS
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL \
    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY \
    NEXT_PUBLIC_MEDUSA_REGION_ID=$NEXT_PUBLIC_MEDUSA_REGION_ID \
    NEXT_PUBLIC_MEDUSA_TOP_TAG_ID=$NEXT_PUBLIC_MEDUSA_TOP_TAG_ID \
    NEXT_PUBLIC_SHIPPING_OPTION_METRO_ID=$NEXT_PUBLIC_SHIPPING_OPTION_METRO_ID \
    NEXT_PUBLIC_SHIPPING_OPTION_CITY_ID=$NEXT_PUBLIC_SHIPPING_OPTION_CITY_ID \
    NEXT_PUBLIC_SHIPPING_OPTION_COUNTRY_ID=$NEXT_PUBLIC_SHIPPING_OPTION_COUNTRY_ID \
    NEXT_PUBLIC_IMAGE_HOSTS=$NEXT_PUBLIC_IMAGE_HOSTS \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
