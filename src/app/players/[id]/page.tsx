import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlayer, players, similarPlayers } from "@/lib/players";
import { PlayerProfile } from "@/components/players/profile";

export function generateStaticParams() {
  return players.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const player = getPlayer(id);
  if (!player) return { title: "Player not found" };
  return {
    title: `${player.name} — ${player.primary}, Class of ${player.gradYear}`,
    description: `${player.name} is a ${player.age}-year-old ${player.primary} from ${player.city}, ${player.state}, currently ${player.status.toLowerCase()}. Profile visible to subscribing coaches.`,
  };
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = getPlayer(id);
  if (!player) notFound();
  return <PlayerProfile player={player} similar={similarPlayers(player)} />;
}
