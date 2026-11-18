// Logotype MK Auto : une plaque d'immatriculation (bande jaune « CI » pour Côte d'Ivoire).
export default function Logo({ className = '' }) {
  return (
    <span className={`plate text-xl ${className}`} aria-label="MK Auto">
      <span className="plate-band" aria-hidden="true">CI</span>
      <span className="plate-text font-extrabold tracking-wider" aria-hidden="true">
        MK<span className="inline-block w-1.5 h-1.5 bg-asphalt-950 rounded-full"></span>AUTO
      </span>
    </span>
  );
}
