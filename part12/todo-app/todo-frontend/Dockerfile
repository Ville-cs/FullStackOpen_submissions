FROM node:24 AS build-stage
WORKDIR /usr/src/app
# COPY ./todo-app/todo-frontend .
COPY . .
ENV VITE_BACKEND_URL=http://localhost:8080/api
# if accessing backend on host
# ENV VITE_BACKEND_URL=http://host.docker.internal:8080/api
# if backend is running in a container (check url)
# ENV VITE_BACKEND_URL=http://todo-back:3000/api
RUN npm ci
RUN npm run build


FROM mcr.microsoft.com/playwright:v1.60.0-noble AS test-stage
WORKDIR /usr/src/test
COPY --from=build-stage /usr/src/app/dist ./dist
COPY . .
RUN npm ci
RUN npx playwright test
RUN touch tests-passed


FROM nginx:1.29-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY --from=test-stage usr/src/test/tests-passed /tests-passed
