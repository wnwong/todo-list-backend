FROM node:20.13.1-alpine as builder

# Create app directory
WORKDIR /app

COPY . .   

# Install app dependencies
RUN npm ci --ignore-scripts

RUN npm run build

FROM node:20.13.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start the app
CMD npm run start