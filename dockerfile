FROM node:lts AS runtime
WORKDIR /app

COPY . .

RUN npm install
RUN bun build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD bun ./dist/server/entry.mjs