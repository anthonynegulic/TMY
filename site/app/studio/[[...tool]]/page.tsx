"use client";

// The editing screen for the ladies: theirsmineyours.com/studio
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
