FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
# RUN npm ci --omit=dev
RUN npm install
COPY . .

RUN mkdir -p /app/uploads

RUN chmod -R 777 /appuploads

RUN npx tsc

EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "dist/app.js"]