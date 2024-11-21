import { type SchemaTypeDefinition } from "sanity";
import { author } from "./authore";
import { playlist } from "./playlist";
import { startup } from "./startup";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, playlist, startup],
};
