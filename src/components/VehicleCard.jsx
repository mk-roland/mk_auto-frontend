import { Link } from 'react-router-dom';

export default function VehicleCard({
  id,
  nom,
  marque,
  categorie,
  energie,
  boite,
  prix,
  image,
  places,
  index = 0
}) {
  // Calcul du délai dynamique pour l'animation en cascade
  const delay = (index % 3) * 120;

  return (
    <div
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 
      shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
      flex flex-col justify-between h-full group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Conteneur de l'image */}
      <div className="relative h-52 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={image}
          alt={nom}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Image de fallback si le fichier n'est pas trouvé
            e.target.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80";
          }}
        />
        {/* Badge de catégorie */}
        <span className="absolute top-3 left-3 bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
          {categorie}
        </span>
      </div>

      {/* Contenu et Détails */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Marque et Nom */}
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            {marque}
          </span>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {nom}
          </h3>

          {/* Caractéristiques principales */}
          <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-medium text-slate-600 dark:text-slate-300">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="block text-base mb-0.5">👥</span>
              {places} places
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="block text-base mb-0.5">⚙️</span>
              {boite}
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="block text-base mb-0.5">⛽</span>
              {energie}
            </div>
          </div>
        </div>

        {/* Pied de carte : Prix & Action */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {typeof prix === 'number' ? prix.toLocaleString('fr-FR') : prix}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400"> FCFA/j</span>
          </div>

          <Link
            to={`/vehicle/detail/${id}`}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl 
            transition duration-200 shadow-sm hover:shadow-md cursor-pointer"
          >
            Détails
          </Link>
        </div>
      </div>
    </div>
  );
}