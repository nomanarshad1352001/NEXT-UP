import { Suspense } from "react";
import type { Metadata } from "next";
import { SignupFlow } from "@/components/signup/flow";

export const metadata: Metadata = {
  title: "Join the Registry",
  description:
    "Two steps to join Next Up — start your $1 player membership or $3 coach membership, then complete your registration questionnaire.",
};

export default function SignupPage() {
  return (
    <div className="bg-cream pt-[74px]">
      <Suspense fallback={<div className="mx-auto h-[80vh] max-w-7xl px-5 py-16 lg:px-10" />}>
        <SignupFlow />
      </Suspense>
    </div>
  );
}
