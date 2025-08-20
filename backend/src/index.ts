import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify, sign } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  //get the header
  //verify the header
  //if the header is valid, we can proceed
  //if not, we'll return the user a 403 status code

  const header = c.req.header("Authorization") || "";
  const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET);
  if (response?.id) {
    c.set("userId", String(response.id));
    await next();
  } else {
    c.status(403);
    return c.json({
      error: "Unauthorized",
    });
  }
});

app.get("/", (c) => {
  return c.json({
    Message: "Hello from The Medium project",
  });
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
      message: "User signed up successfully",
    });
  } catch (error) {
    c.status(401);
    return c.text("Invalid Credentials");
  }
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      c.status(401);
      return c.json({ error: "user not found!" });
    }
    if (user.password !== body.password) {
      c.status(401);
      return c.json({ error: "Invalid Credentials!" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: jwt,
      message: "User signed in successfully",
    });
  } catch (error) {
    c.status(500);
    c.text("Internal server Error");
  }
});
// app.post("/api/v1/blog", (c) => {
//   return c.text("Hello Hono!");
// });
// app.put("/api/v1/blog", (c) => {
//   return c.text("Hello Hono!");
// });
// app.get("/api/v1/blog/:id", (c) => {
//   return c.text("Hello Hono!");
// });
// app.get("/api/v1/blog/bulk", (c) => {
//   return c.text("Hello Hono!");
// });

export default app;
