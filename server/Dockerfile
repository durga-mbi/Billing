FROM node:20-alpine

WORKDIR /app

# Install netcat-openbsd for the entrypoint wait logic
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

# Ensure entrypoint script is executable
RUN chmod +x scripts/entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["scripts/entrypoint.sh"]
CMD ["npm", "run", "dev"]