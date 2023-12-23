FROM node:21-alpine3.17
WORKDIR /app
COPY package.json package-lock.json ./
ENV NODE_ENV=production
RUN npm install
COPY . .
ENV PORT=3300
ENV JSON_URL=https://api.npoint.io/a7e72efdfccea4a55af0
RUN npm install -g typescript
RUN tsc
CMD ["npm", "start"]
EXPOSE 3300
