// Champ de formulaire : libellé relié au champ (htmlFor) + message d'erreur accessible.
// Inspiré de Zenab Glass.
export const inputClass =
  'w-full rounded-sm border border-asphalt-300 dark:border-asphalt-700 bg-white dark:bg-asphalt-800 text-asphalt-900 dark:text-white p-3 ' +
  'outline-none transition focus:ring-2 focus:ring-signal-500 placeholder:text-asphalt-400 ' +
  'aria-invalid:border-red-500 aria-invalid:ring-red-500/30';

export default function Field({ label, htmlFor, error, errorId, hint, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-asphalt-700 dark:text-asphalt-200 mb-1">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-sm text-asphalt-500 dark:text-asphalt-400">{hint}</p>}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
