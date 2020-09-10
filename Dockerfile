FROM node:10 AS frontend-build
WORKDIR /usr/src/app
COPY frontend ./frontend/
RUN cd frontend && npm install && npm run build

FROM node:10 AS backend-build
WORKDIR /usr/src/app
COPY --from=frontend-build /usr/src/app/frontend/build ./frontend/build
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY backend/app.js ./backend/

EXPOSE 3000

CMD [ "node", "./backend/app.js" ]