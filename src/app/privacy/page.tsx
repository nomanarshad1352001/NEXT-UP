import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Next Up Registry collects, protects, and limits the visibility of player and coach information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      index="§"
      title="Privacy Policy"
      updated="January 2026"
      intro="Privacy isn't a feature here — it's the product architecture. This policy explains what we collect, who can see it, and the firm lines we never cross."
      sections={[
        {
          heading: "Who can see what",
          body: [
            "Player profiles — including photos, video, measurables, and contact preference — are visible exclusively to verified, subscribing coaches. They are never public, never indexed by search engines, and never visible to other players or unregistered visitors.",
            "Coach information is visible to a player only within a contact thread the player has accepted. Coaches remain anonymous to players they have not contacted.",
            "We do not sell, rent, or share personal information with advertisers, data brokers, or any third party for marketing purposes. Period.",
          ],
        },
        {
          heading: "Information we collect",
          body: [
            "Players provide registration details (name, age, graduation class, positions, measurables, school, and story), account credentials, and payment information, along with any photos or video they choose to publish.",
            "Coaches provide program details (role, organization, level, location), account credentials, and payment information.",
            "We collect standard technical data — browser type, pages visited, and session duration — strictly to keep the registry fast and secure.",
          ],
        },
        {
          heading: "Payments",
          body: [
            "Subscriptions ($1/month players, $3/month coaches) are processed by Stripe. Next Up Registry never stores full card numbers on our servers; Stripe's PCI-compliant systems handle all card data.",
            "We retain only the payment confirmation and billing period status needed to keep your membership active.",
          ],
        },
        {
          heading: "Minors",
          body: [
            "The registry serves high-school-age athletes, so we treat minor data with additional care. Coach accounts undergo verification before search access is granted, contact channels are logged for safety review, and a parent or guardian may manage or remove a player's profile at any time by contacting our office.",
            "Exact home addresses are never requested or displayed. Player location is limited to city and state.",
          ],
        },
        {
          heading: "Your controls",
          body: [
            "From your account portal you may edit or delete profile content, pause your listing, export your data, or close your account entirely. Deleting your account removes your profile from the registry within 72 hours.",
            "You may opt out of non-essential communications at any time; transactional messages (receipts, contact requests) remain part of an active membership.",
          ],
        },
        {
          heading: "Retention & security",
          body: [
            "Data is encrypted in transit and at rest. Access to personal information inside our company is restricted to staff who need it to operate the registry, under signed confidentiality obligations.",
            "When an account closes, profile content is purged from active systems within 72 hours and from encrypted backups within 30 days.",
          ],
        },
      ]}
    />
  );
}
