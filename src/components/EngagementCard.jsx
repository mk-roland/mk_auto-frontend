// Engagement présenté comme un panneau de signalisation en losange (jaune, bord noir).
export default function EngagementCard({ icon: Icon, title, description }) {
  return (
    <div data-item className="space-y-4 py-2 sm:px-8 first:sm:pl-0 sm:border-l-2 first:sm:border-l-0 border-asphalt-950 dark:border-asphalt-700">
      {/* Le support animé (data-icon-box) est séparé du losange, pour que l'animation
          ne remplace pas la rotation de 45° */}
      <div data-icon-box className="w-[5.5rem] h-[5.5rem] grid place-items-center">
        <div className="w-16 h-16 rotate-45 bg-signal-500 border-[3px] border-asphalt-950 rounded-sm grid place-items-center">
          <Icon size={28} strokeWidth={2.25} className="-rotate-45 text-asphalt-950" data-draw />
        </div>
      </div>
      <h3 className="font-sign text-3xl font-bold text-asphalt-950 dark:text-white">
        {title}
      </h3>
      <p className="text-asphalt-600 dark:text-asphalt-300 leading-relaxed max-w-sm">
        {description}
      </p>
    </div>
  );
}
