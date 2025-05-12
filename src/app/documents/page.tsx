'use client';

import { useState } from 'react';
import { 
  DocumentIcon, 
  FolderIcon, 
  CloudArrowUpIcon, 
  TrashIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

// Types pour les documents
type DocumentCategory = 'Administratif' | 'Bancaire' | 'Notaire' | 'Promoteur' | 'Technique';

type Document = {
  id: number;
  name: string;
  category: DocumentCategory;
  date: string;
  size: string;
  type: string;
};

// Données fictives des documents
const initialDocuments: Document[] = [
  { id: 1, name: 'Contrat de réservation', category: 'Administratif', date: '15/02/2024', size: '2.5 MB', type: 'pdf' },
  { id: 2, name: 'Dépôt de garantie', category: 'Bancaire', date: '16/02/2024', size: '1.2 MB', type: 'pdf' },
  { id: 3, name: 'Offre de prêt', category: 'Bancaire', date: '05/03/2024', size: '3.1 MB', type: 'pdf' },
  { id: 4, name: 'Plan de financement', category: 'Bancaire', date: '10/03/2024', size: '0.8 MB', type: 'xlsx' },
  { id: 5, name: 'Plans de l\'appartement', category: 'Technique', date: '18/02/2024', size: '4.2 MB', type: 'pdf' },
  { id: 6, name: 'Descriptif technique', category: 'Technique', date: '18/02/2024', size: '1.7 MB', type: 'pdf' },
  { id: 7, name: 'Échéancier des paiements', category: 'Promoteur', date: '20/02/2024', size: '0.5 MB', type: 'pdf' },
  { id: 8, name: 'Attestation d\'assurance', category: 'Administratif', date: '22/02/2024', size: '0.9 MB', type: 'pdf' },
  { id: 9, name: 'Convocation signature notaire', category: 'Notaire', date: '01/04/2024', size: '0.3 MB', type: 'pdf' },
  { id: 10, name: 'Relevé fiscal', category: 'Administratif', date: '10/04/2024', size: '0.7 MB', type: 'pdf' },
  { id: 11, name: 'Déclaration revenus', category: 'Administratif', date: '15/04/2024', size: '1.1 MB', type: 'pdf' },
  { id: 12, name: 'Simulation de prêt', category: 'Bancaire', date: '25/02/2024', size: '0.4 MB', type: 'pdf' },
];

// Catégories de documents avec leurs couleurs
const categories = [
  { name: 'Tous', color: 'bg-secondary-100 text-secondary-800' },
  { name: 'Administratif', color: 'bg-blue-100 text-blue-800' },
  { name: 'Bancaire', color: 'bg-green-100 text-green-800' },
  { name: 'Notaire', color: 'bg-purple-100 text-purple-800' },
  { name: 'Promoteur', color: 'bg-orange-100 text-orange-800' },
  { name: 'Technique', color: 'bg-red-100 text-red-800' },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filtrer les documents par catégorie et recherche
  const filteredDocuments = documents.filter(doc => 
    (selectedCategory === 'Tous' || doc.category === selectedCategory) &&
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Simuler la suppression d'un document
  const deleteDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };
  
  // Simuler l'ajout d'un nouveau document (fonctionnalité non implémentée complètement)
  const addNewDocument = () => {
    alert('Fonctionnalité d\'ajout de document à implémenter');
    // Dans une vraie application, cela ouvrirait une modale ou un formulaire d'upload
  };
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">Documents</h1>
        <p className="mt-2 text-secondary-600">Gérez tous vos documents liés à l'achat de votre appartement</p>
      </header>
      
      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedCategory === category.name
                  ? category.color
                  : 'bg-secondary-50 text-secondary-600 hover:bg-secondary-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="relative flex-shrink-0">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-secondary-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un document..."
            className="w-full sm:w-64 rounded-md border border-secondary-300 pl-10 py-2 pr-3 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Liste des documents */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-semibold text-secondary-900">Mes documents ({filteredDocuments.length})</h2>
          <button
            type="button"
            onClick={addNewDocument}
            className="btn btn-primary flex items-center space-x-2"
          >
            <CloudArrowUpIcon className="h-5 w-5" aria-hidden="true" />
            <span>Ajouter</span>
          </button>
        </div>
        
        {filteredDocuments.length === 0 ? (
          <div className="py-12 text-center">
            <DocumentIcon className="mx-auto h-12 w-12 text-secondary-400" />
            <h3 className="mt-2 text-sm font-medium text-secondary-900">Aucun document</h3>
            <p className="mt-1 text-sm text-secondary-500">
              {searchQuery ? "Aucun document ne correspond à votre recherche" : "Commencez par ajouter un document"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Nom</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Catégorie</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Taille</th>
                  <th scope="col" className="relative px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {filteredDocuments.map((document) => {
                  // Trouver la couleur de la catégorie
                  const category = categories.find(c => c.name === document.category);
                  const categoryColor = category ? category.color : categories[0].color;
                  
                  return (
                    <tr key={document.id} className="hover:bg-secondary-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-secondary-100">
                            <DocumentIcon className="h-6 w-6 text-secondary-600" aria-hidden="true" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-secondary-900">{document.name}</div>
                            <div className="text-xs text-secondary-500">.{document.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColor}`}>
                          {document.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-secondary-600">
                        {document.date}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-secondary-600">
                        {document.size}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => deleteDocument(document.id)}
                          className="text-secondary-400 hover:text-secondary-600"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">Supprimer</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}