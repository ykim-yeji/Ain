'use client';

import { MobilePage } from "@/components/Mobile";
import { DesktopPage } from "@/components/Desktop";
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