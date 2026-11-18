// En-tête de section : aligné à gauche, titre en capitales condensées façon panneau.
// Sur grand écran, le sous-titre se place à droite du titre.
export default function SectionHeader({ eyebrow, title, subtitle, as: Tag = 'h2', light = false }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
      <div className="space-y-3">
        {eyebrow && (
          <p className={`kicker ${light ? 'text-asphalt-300' : 'text-asphalt-600 dark:text-asphalt-300'}`}>{eyebrow}</p>
        )}
        <Tag className={`font-sign text-5xl sm:text-6xl font-extrabold text-balance ${light ? 'text-white' : 'text-asphalt-950 dark:text-white'}`}>
          {title}
        </Tag>
      </div>
      {subtitle && (
        <p className={`max-w-prose text-lg leading-relaxed ${light ? 'text-asphalt-300' : 'text-asphalt-600 dark:text-asphalt-300'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
