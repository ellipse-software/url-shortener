import fastify from "fastify";
import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";
import { PrismaClient } from "@prisma/client";
import path from 'node:path';
import ejs from 'ejs';

import route_index from './routes/index'
import route_api_shorten from './routes/api/shorten'

const app = fastify()
const prisma = new PrismaClient()

app.register(route_index)
app.register(route_api_shorten)

app.register(fastifyStatic, {
  root: path.resolve('src/public'),
  prefix: '/public/',
})
app.register(fastifyView, {
  engine: {
    ejs: ejs,
  },
  root: path.resolve('src/views'),
})

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Server is running on port 3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();