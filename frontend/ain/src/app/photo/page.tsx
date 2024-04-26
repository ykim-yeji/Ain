'use client';

import { MobilePage } from "@/components/platform/Mobile";
import { DesktopPage } from "@/components/platform/Desktop";
import { useUserAgent } from "@/hooks/useUserAgent";

export default function Page() {
  const { isMobile } = useUserAgent();

  return (
    <div>
      {isMobile ? (
        <MobilePage />
      ) : (
        <DesktopPage />
      )}
    </div>
  );
}