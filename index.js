import env from "dotenv";
env.config();
import fastify from "fastify";
import fs from "fs";
import { users } from "./db/index.js";

// SIMON
// 324
// Hejsa
// Ny kommentar
// endnu en ny kommentar
// den nyeste kommentar

const main = () => {
  const server = fastify();

  const goo = () => {
    send("./profile.html");
  };

  goo();

  fs.readdirSync("./static").forEach((f) => {
    const fileKey = `${f}`.split(".")[0];
    const isIndex = fileKey === "index";
    const path = isIndex ? "/*" : `/${fileKey}`;

    server.get(path, (_, reply) => {
      const file = fs.readFileSync(`./static/${fileKey}.html`, "utf-8");
      reply.header("Content-Type", "text/html");
      reply.send(file);
    });
  });

  server.get("/profil/:id", async (request, reply) => {
    const id = request.params.id;
    const user = await users.getUser(id);
    if (!user) {
      reply.status(404).send("USER NOT FOUND :)");
      return;
    }
    const profilePage = fs
      .readFileSync(`./views/profile.html`, "utf-8")
      .replace("$NAME$", user.name)
      .replace("$AGE$", user.age);
    reply.header("Content-Type", "text/html");
    reply.send(profilePage);
  });

  server.listen({ port: process.env.PORT, host: "0.0.0.0" }, (_, address) =>
    console.log(`Listening on ${address}, error: ${_}`)
  );
};

main();
