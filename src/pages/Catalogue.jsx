import { useSearchParams } from 'react-router-dom';
import VehicleCard from '../components/VehicleCard';
import { VEHICULES_DATA, FILTER_OPTIONS } from '../data/vehicleData';

function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Lecture directe des query params (ex: /catalogue?categorie=SUV)
  const catActive = searchParams.get('categorie') || "Toutes";
  const energieActive = searchParams.get('energie') || "Toutes";
  const boiteActive = searchParams.get('boite') || "Toutes";
  const marqueActive = searchParams.get('marque') || "Toutes";

  const listVehicules = VEHICULES_DATA || [];

  // 2. Mise à jour fluide de l'URL via Query Params
  const updateFilter = (key, value) => {
    //Cette ligne crée une copie modifiable de l'URL actuelle
    //Par exemple, si l' URL est /catalogue?energie=essence, 
    // newParams contient { energie: 'essence' }
    const newParams = new URLSearchParams(searchParams);
    
    if (value === "Toutes") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    
    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  // 3. Logique de filtrage robuste (insensible à la casse)
  const vehiculesFiltres = listVehicules.filter((v) => {
    const matchCat = catActive === "Toutes" || v.categorie?.toLowerCase() === catActive.toLowerCase();
    const matchEnergie = energieActive === "Toutes" || v.energie?.toLowerCase() === energieActive.toLowerCase();
    const matchBoite = boiteActive === "Toutes" || v.boite?.toLowerCase() === boiteActive.toLowerCase();
    const matchMarque = marqueActive === "Toutes" || v.marque?.toLowerCase() === marqueActive.toLowerCase();

    return matchCat && matchEnergie && matchBoite && matchMarque;
  });

  const hasActiveFilters = catActive !== "Toutes" || energieActive !== "Toutes" || boiteActive !== "Toutes" || marqueActive !== "Toutes";

  return (
    <div className="space-y-10 py-8 px-4 sm:px-6 max-w-7xl mx-auto dark:bg-black dark:text-white">
      
      {/* En-tête */}
      <section className="text-center space-y-3">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white sm:text-4xl">
          Notre Catalogue de Véhicules
        </h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Explorez notre flotte de {listVehicules.length} véhicules récents et trouvez celui qui convient à votre voyage.
        </p>
      </section>

      {/* Barre de Filtres Multi-critères */}
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Filtre 1 : Catégorie */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Catégorie
          </label>
          <select
            value={catActive}
            onChange={(e) => updateFilter('categorie', e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer text-sm"
          >
            {FILTER_OPTIONS.categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Filtre 2 : Énergie */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Énergie
          </label>
          <select
            value={energieActive}
            onChange={(e) => updateFilter('energie', e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer text-sm"
          >
            {FILTER_OPTIONS.energies.map((eng) => (
              <option key={eng} value={eng}>{eng}</option>
            ))}
          </select>
        </div>

        {/* Filtre 3 : Boîte de vitesse */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Boîte de vitesse
          </label>
          <select
            value={boiteActive}
            onChange={(e) => updateFilter('boite', e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer text-sm"
          >
            {FILTER_OPTIONS.boites.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Filtre 4 : Marque */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Marque
          </label>
          <select
            value={marqueActive}
            onChange={(e) => updateFilter('marque', e.target.value)}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer text-sm"
          >
            {FILTER_OPTIONS.marques.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Résultat et Réinitialisation */}
      <div className="flex justify-between items-center text-sm font-medium text-slate-500 dark:text-slate-400">
        <span>{vehiculesFiltres.length} véhicule(s) trouvé(s)</span>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Réinitialiser tous les filtres
          </button>
        )}
      </div>

      {/* Grille des Véhicules */}
      <section>
        {vehiculesFiltres.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehiculesFiltres.map((vehicule, index) => (
              <div key={vehicule.id} className="h-full">
                <VehicleCard 
                  id={vehicule.id} 
                  nom={vehicule.nom} 
                  marque={vehicule.marque} 
                  categorie={vehicule.categorie}
                  energie={vehicule.energie} 
                  boite={vehicule.boite} 
                  prix={vehicule.prix} 
                  image={vehicule.image} 
                  places={vehicule.places}
                  index={index} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Aucun véhicule ne correspond à ces critères de recherche.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Afficher tous les véhicules
            </button>
          </div>
        )}
      </section>

    </div>
  );
}

export default Catalogue;