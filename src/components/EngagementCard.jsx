// Engagement présenté comme un panneau de signalisation en losange (contour orange, discret).
export default function EngagementCard({ icon: Icon, title, description }) {
  return (
    <div data-item className="space-y-4 py-2 sm:px-8 first:sm:pl-0 sm:border-l first:sm:border-l-0 border-nuit-200 dark:border-nuit-700">
      {/* Le support animé (data-icon-box) est séparé du losange, pour que l'animation
          ne remplace pas la rotation de 45° */}
      <div data-icon-box className="w-[5.5rem] h-[5.5rem] grid place-items-center">
        <div className="w-14 h-14 rotate-45 bg-soleil-500/10 border-2 border-soleil-500 rounded-sm grid place-items-center">
          <Icon size={26} strokeWidth={2} className="-rotate-45 text-soleil-700 dark:text-soleil-400" data-draw />
        </div>
      </div>
      <h3 className="font-sign text-3xl font-bold text-nuit-950 dark:text-white">
        {title}
      </h3>
      <p className="text-nuit-600 dark:text-nuit-300 leading-relaxed max-w-sm">
        {description}
      </p>
    </div>
  );
}
