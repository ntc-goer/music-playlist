# Stage 1
# Fetching the latest node image on alpine linux
FROM node:alpine as builder
# Setting up the work directory
WORKDIR /app
# Installing dependencies
COPY ./package.json .
RUN npm install
# Copying all the files in our project
COPY . .
RUN npm run build


# Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf ./*
COPY --from=builder /app/dist .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]


