import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
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

userRouter.post("/signin", async (c) => {
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
