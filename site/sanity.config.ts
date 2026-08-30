"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "@/lib/sanity/config";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "tmy",
  title: "Theirs. Mine. Yours.",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
