// En-tête de section commun à toutes les pages : sur-titre, titre, sous-titre.
export default function SectionHeader({ eyebrow, title, subtitle, as: Tag = 'h2' }) {
  return (
    <div className="text-center max-w-2xl mx-auto space-y-4">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      )}
      <Tag className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">
        {title}
      </Tag>
      {subtitle && (
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
