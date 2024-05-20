'use client';

import { MobilePage }  from "@/components/platform/Mobile";
import { DesktopPage } from "@/components/platform/Desktop";
import { useUserAgent } from "@/hooks/useUserAgent";

export default function Page() {
  const { isMobile } = useUserAgent();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {isMobile ? (
        <MobilePage />
      ) : (
        <DesktopPage />
      )}
    </div>
  );
}