import { 
  ClipboardDocumentListIcon, 
  DocumentTextIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  BanknotesIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Données fictives pour le tableau de bord
const projectInfo = {
  name: "Résidence Les Jardins",
  address: "123 Avenue des Fleurs, 75000 Paris",
  developer: "Promoteur Immobilier XYZ",
  price: "350 000 €",
  area: "68 m²",
  rooms: "3",
  deliveryDate: "15/06/2025",
  notaryAppointment: "24/04/2024",
  nextPayment: {
    date: "30/05/2024",
    amount: "35 000 €",
    label: "Appel de fonds - Fondations",
  },
  completionPercentage: 25,
  documentsCount: 12,
  contactsCount: 5,
};

export default function Home() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">Tableau de bord</h1>
        <p className="mt-2 text-secondary-600">Suivi de votre achat d'appartement en un coup d'œil</p>
      </header>
      
      {/* Informations générales */}
      <section className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-secondary-900">{projectInfo.name}</h2>
            <p className="text-secondary-600">{projectInfo.address}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
              Livraison prévue : {projectInfo.deliveryDate}
            </span>
          </div>
        </div>
        
        <div className="mt-6 border-t border-secondary-200 pt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-secondary-500">Prix total</p>
            <p className="mt-1 text-lg font-semibold text-secondary-900">{projectInfo.price}</p>
          </div>
          <div>
            <p className="text-sm text-secondary-500">Surface</p>
            <p className="mt-1 text-lg font-semibold text-secondary-900">{projectInfo.area}</p>
          </div>
          <div>
            <p className="text-sm text-secondary-500">Pièces</p>
            <p className="mt-1 text-lg font-semibold text-secondary-900">{projectInfo.rooms}</p>
          </div>
          <div>
            <p className="text-sm text-secondary-500">Promoteur</p>
            <p className="mt-1 text-lg font-semibold text-secondary-900">{projectInfo.developer}</p>
          </div>
          <div>
            <p className="text-sm text-secondary-500">Prochain rendez-vous notaire</p>
            <p className="mt-1 text-lg font-semibold text-secondary-900">{projectInfo.notaryAppointment}</p>
          </div>
        </div>
      </section>
      
      {/* Progression et prochain paiement */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="card">
          <h2 className="text-lg font-semibold text-secondary-900">Progression du projet</h2>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-500">Avancement</span>
              <span className="text-sm font-medium text-secondary-900">{projectInfo.completionPercentage}%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-secondary-200">
              <div 
                className="h-2 rounded-full bg-primary-600" 
                style={{ width: `${projectInfo.completionPercentage}%` }}
              />
            </div>
          </div>
        </section>
        
        <section className="card">
          <h2 className="text-lg font-semibold text-secondary-900">Prochain paiement</h2>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm text-secondary-500">Échéance</p>
              <p className="mt-1 font-medium text-secondary-900">{projectInfo.nextPayment.date}</p>
            </div>
            <div>
              <p className="text-sm text-secondary-500">Montant</p>
              <p className="mt-1 font-medium text-secondary-900">{projectInfo.nextPayment.amount}</p>
            </div>
            <div>
              <p className="text-sm text-secondary-500">Libellé</p>
              <p className="mt-1 font-medium text-secondary-900">{projectInfo.nextPayment.label}</p>
            </div>
          </div>
        </section>
      </div>
      
      {/* Accès rapide */}
      <section>
        <h2 className="text-lg font-semibold text-secondary-900">Accès rapide</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <Link href="/etapes" className="card flex flex-col items-center justify-center p-4 text-center hover:bg-secondary-50 transition-colors">
            <ClipboardDocumentListIcon className="h-8 w-8 text-primary-600" />
            <span className="mt-2 text-sm font-medium text-secondary-900">Étapes d'achat</span>
          </Link>
          
          <Link href="/documents" className="card flex flex-col items-center justify-center p-4 text-center hover:bg-secondary-50 transition-colors">
            <DocumentTextIcon className="h-8 w-8 text-primary-600" />
            <span className="mt-2 text-sm font-medium text-secondary-900">Documents ({projectInfo.documentsCount})</span>
          </Link>
          
          <Link href="/echeancier" className="card flex flex-col items-center justify-center p-4 text-center hover:bg-secondary-50 transition-colors">
            <CalendarIcon className="h-8 w-8 text-primary-600" />
            <span className="mt-2 text-sm font-medium text-secondary-900">Échéancier</span>
          </Link>
          
          <Link href="/contacts" className="card flex flex-col items-center justify-center p-4 text-center hover:bg-secondary-50 transition-colors">
            <UserGroupIcon className="h-8 w-8 text-primary-600" />
            <span className="mt-2 text-sm font-medium text-secondary-900">Contacts ({projectInfo.contactsCount})</span>
          </Link>
          
          <Link href="/finances" className="card flex flex-col items-center justify-center p-4 text-center hover:bg-secondary-50 transition-colors">
            <BanknotesIcon className="h-8 w-8 text-primary-600" />
            <span className="mt-2 text-sm font-medium text-secondary-900">Suivi financier</span>
          </Link>
        </div>
      </section>
    </div>
  );
}