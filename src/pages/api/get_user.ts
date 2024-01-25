import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import dbConnect from "@/util/dbConnect";
import User from "@/models/user";

type Data = {
  message: string;
  data?: object;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password } = req.body;

  try {
    await dbConnect();
    const user = await User.findOne({ username: username });

    if (!user) {
      throw new Error();
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      throw new Error();
    }

    res.status(200).send({ message: "Sign in successful", data: user });
  } catch (err) {
    res
      .status(400)
      .send({ message: "The username and password don't match any records" });
  }
}
