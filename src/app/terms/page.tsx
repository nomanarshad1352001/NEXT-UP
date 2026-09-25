import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The membership terms for players and coaches using the Next Up Registry platform.",
};

export default function TermsPage() {
  return (
    <LegalPage
      index="§"
      title="Terms of Service"
      updated="January 2026"
      intro="These terms govern your membership in the Next Up Registry. They're written to be read — short, direct, and without hidden clauses."
      sections={[
        {
          heading: "The service",
          body: [
            "Next Up Registry is a subscription platform where baseball players announce their availability and subscribing coaches search for and contact them. We operate the registry; we are not an agent, do not negotiate offers, and are not a party to any agreement between a player and a program.",
            "We do not distribute player profiles to coaches within a geographic radius or otherwise market profiles automatically. Coaches find players exclusively through the search console.",
          ],
        },
        {
          heading: "Membership & billing",
          body: [
            "Player membership is $1 per month; coach membership is $3 per month. Both renew automatically each month until cancelled and are billed through Stripe.",
            "You may cancel at any time from your account portal. Access continues through the end of the current billing period; we do not prorate partial months.",
            "We may adjust membership pricing with 30 days' notice, applied only to future billing periods.",
          ],
        },
        {
          heading: "Player obligations",
          body: [
            "You agree that the information in your profile — measurables, class year, availability, and media — is accurate and your own. Fabricated measurables or impersonation are grounds for immediate removal without refund.",
            "You grant the registry a license to display your submitted content to subscribing coaches for as long as your profile is active. You may revoke that license at any time by removing the content or closing your account.",
          ],
        },
        {
          heading: "Coach obligations",
          body: [
            "Coach accounts are for legitimate programs and authorized staff. You agree to use player information solely for recruiting communication and to respect a player's decision to decline contact.",
            "Scraping, bulk downloading, sharing registry access, or redistributing player information outside your program terminates membership immediately without refund.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "You will not use the registry to harass, spam, or misrepresent. You will not attempt to circumvent the coach membership wall or access another member's account.",
            "We may suspend accounts that violate these terms, with notice when practical. The registry's value depends on trust, and we protect it accordingly.",
          ],
        },
        {
          heading: "Disclaimers & liability",
          body: [
            "The registry is provided as-is. We do not guarantee recruiting outcomes for any player or roster outcomes for any coach. Measurables are self-reported by members and not independently verified by Next Up Registry.",
            "To the maximum extent permitted by law, our liability for any claim related to the service is limited to the membership fees you paid in the twelve months preceding the claim.",
          ],
        },
        {
          heading: "General",
          body: [
            "These terms are governed by the laws of the State of Texas, without regard to conflict-of-laws rules. If any provision is found unenforceable, the remainder stays in force.",
            "We may update these terms from time to time; material changes will be announced on the site at least 14 days before taking effect. Continued membership after an update constitutes acceptance.",
          ],
        },
      ]}
    />
  );
}
