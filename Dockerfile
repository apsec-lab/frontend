# build environment
FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN echo "VITE_API=http://localhost:5000" >> .env
RUN npm install
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
