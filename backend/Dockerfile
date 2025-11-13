# ===============================
# ⚡ BACKEND DOCKERFILE
# ===============================
FROM node:18-alpine

# Working directory dalam container
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy seluruh backend
COPY . .

# Pastikan Node listen ke semua interface
ENV HOST=0.0.0.0

# Port backend kamu → 1311
EXPOSE 1311

# Run server
CMD ["npm", "start"]
