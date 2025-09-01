FROM node

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npx tsx prisma/seeder.ts && npm run dev"]
