# Build step
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
