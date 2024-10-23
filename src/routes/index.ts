import type { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import path from 'node:path';

export default async function route(fastify: FastifyInstance, options: any) {
  fastify.get("/", async (request, reply) => {
    return reply.view("index.ejs");
  });
};