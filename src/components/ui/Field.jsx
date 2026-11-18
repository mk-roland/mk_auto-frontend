// Champ de formulaire : libellé relié au champ (htmlFor) + message d'erreur accessible.
// Inspiré de Zenab Glass.
export const inputClass =
  'w-full rounded-sm border border-nuit-300 dark:border-nuit-700 bg-white dark:bg-nuit-800 text-nuit-900 dark:text-white p-3 ' +
  'outline-none transition focus:ring-2 focus:ring-soleil-500 placeholder:text-nuit-400 ' +
  'aria-invalid:border-red-500 aria-invalid:ring-red-500/30';

export default function Field({ label, htmlFor, error, errorId, hint, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-nuit-700 dark:text-nuit-200 mb-1">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-sm text-nuit-500 dark:text-nuit-400">{hint}</p>}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
