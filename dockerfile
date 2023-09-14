FROM node:lts AS runtime
RUN curl -fsSL https://bun.sh/install | bash
WORKDIR /app

COPY . .

RUN bun install
RUN bun build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD bun ./dist/server/entry.mjs