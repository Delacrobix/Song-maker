import { GraphQLString } from "graphql";
import modelsExported from "../models/exports";

//Mongoose models
const { User, Rhythm, Song } = modelsExported;

//Create a new user object in the database
export const register = {
  type: GraphQLString,
  description: "Register a new user",
  args: {
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { userName, email, password } = args;
    //console.log("Register mutation args: ", args);

    const newUser = await User.create({
      userName,
      email,
      password,
    });

    console.log("New user: ", newUser);
    return "New user created";
  },
};
