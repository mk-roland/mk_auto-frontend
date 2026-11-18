import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import VehicleCard from '../components/VehicleCard';
import SectionHeader from '../components/SectionHeader';
import { VEHICULES_DATA, FILTER_OPTIONS } from '../data/vehicleData';

function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const scope = useRef(null);
  // Rejoue l'apparition des cartes quand les filtres ou le tri changent
  useReveal(scope, [searchParams.toString()]);

  // 1. Lecture directe des query params (ex: /catalogue?categorie=SUV)
  const catActive = searchParams.get('categorie') || "Toutes";
  const energieActive = searchParams.get('energie') || "Toutes";
  const boiteActive = searchParams.get('boite') || "Toutes";
  const marqueActive = searchParams.get('marque') || "Toutes";
  const tri = searchParams.get('tri') || "pertinence";

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

  // Tri par prix (ne modifie pas la liste d'origine)
  if (tri === "prix-asc") vehiculesFiltres.sort((a, b) => a.prix - b.prix);
  if (tri === "prix-desc") vehiculesFiltres.sort((a, b) => b.prix - a.prix);

  const updateTri = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "pertinence") newParams.delete('tri');
    else newParams.set('tri', value);
    setSearchParams(newParams);
  };

  const hasActiveFilters = catActive !== "Toutes" || energieActive !== "Toutes" || boiteActive !== "Toutes" || marqueActive !== "Toutes";

  return (
    <div ref={scope} className="space-y-8 py-12 px-4 sm:px-6 max-w-7xl mx-auto">

      {/* En-tête */}
      <SectionHeader
        as="h1"
        eyebrow="Catalogue"
        title="Trouvez le véhicule idéal"
        subtitle={`Explorez notre flotte de ${listVehicules.length} véhicules récents et trouvez celui qui convient à votre voyage.`}
      />

      {/* Barre de Filtres Multi-critères */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Filtre 1 : Catégorie */}
        <div>
          <label htmlFor="filtre-categorie" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Catégorie
          </label>
          <select
            value={catActive}
            id="filtre-categorie"
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
          <label htmlFor="filtre-energie" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Énergie
          </label>
          <select
            value={energieActive}
            id="filtre-energie"
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
          <label htmlFor="filtre-boite" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Boîte de vitesse
          </label>
          <select
            value={boiteActive}
            id="filtre-boite"
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
          <label htmlFor="filtre-marque" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Marque
          </label>
          <select
            value={marqueActive}
            id="filtre-marque"
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
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <span className="font-medium">
            {vehiculesFiltres.length} véhicule{vehiculesFiltres.length > 1 ? 's' : ''} trouvé{vehiculesFiltres.length > 1 ? 's' : ''}
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        <label className="flex items-center gap-2">
          <span>Trier par</span>
          <select
            value={tri}
            onChange={(e) => updateTri(e.target.value)}
            className="border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          >
            <option value="pertinence">Pertinence</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
          </select>
        </label>
      </div>

      {/* Grille des Véhicules */}
      <section>
        {vehiculesFiltres.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiculesFiltres.map((vehicule) => (
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
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
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