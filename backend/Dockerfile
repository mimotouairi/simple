FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY backend/. .
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0
EXPOSE 3000
CMD ["npm", "start"]
