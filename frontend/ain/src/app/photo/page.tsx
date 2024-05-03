'use client';

import { MobilePage } from "@/components/platform/Mobile";
import { DesktopPage } from "@/components/platform/Desktop";
import { useUserAgent } from "@/hooks/useUserAgent";

export default function Page() {
  const { isMobile } = useUserAgent();

  return (
    <div className="w-full h-full">
      {isMobile ? (
        <MobilePage />
      ) : (
        <DesktopPage />
      )}
    </div>
  );
}