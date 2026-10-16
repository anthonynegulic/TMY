import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_ID } from "@/lib/site";

// The Google Analytics tag. Only on the live site, so local dev, preview
// deployments and the Studio (which doesn't render this) never count as visits.
export default function Analytics() {
  if (!GA_ID || process.env.VERCEL_ENV !== "production") return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}
