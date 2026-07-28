export default function EngagementCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white reveal-item dark:bg-slate-900 p-8 rounded-2xl 
    border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 
    hover:shadow-md transition duration-300"
    
    >
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}