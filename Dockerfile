FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/
COPY cli.js ./

# Create workspace directory for mounted files
RUN mkdir /workspace

WORKDIR /workspace

ENTRYPOINT ["node", "/app/cli.js"]
CMD ["--help"]
