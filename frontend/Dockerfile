# ===============================
# ⚡ FRONTEND DOCKERFILE (VITE)
# ===============================
FROM node:18-alpine

WORKDIR /app

# Copy package.json untuk caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh frontend
COPY . .

# Build aplikasi
RUN npm run build

# Gunakan serve (tanpa nginx, lebih aman)
RUN npm install -g serve

# Port frontend → 1113
EXPOSE 1113

# Jalankan build hasil dist
CMD ["serve", "-s", "dist", "-l", "1113"]
