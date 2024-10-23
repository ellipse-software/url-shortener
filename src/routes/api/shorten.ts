import type { FastifyInstance } from "fastify";

export default async function route(fastify: FastifyInstance, options: any) {
  fastify.get("/api/shorten", async (request, reply) => {
    return { hello: "world" };
  });
}