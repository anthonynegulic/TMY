import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Public, read-only client (the dataset is public, so no token is needed).
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
