FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
# RUN npm ci --omit=dev
RUN npm install
COPY . .
COPY .env ./
RUN npx tsc

EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "dist/app.js"]