'use client';

import { useState } from 'react';
import { 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  PencilSquareIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline';

// Types pour les contacts
type ContactCategory = 'Promoteur' | 'Banque' | 'Notaire' | 'Agent immobilier' | 'Architecte' | 'Autre';

type Contact = {
  id: number;
  name: string;
  role: string;
  company: string;
  category: ContactCategory;
  email: string;
  phone: string;
  notes: string;
};

// Données fictives des contacts
const initialContacts: Contact[] = [
  {
    id: 1,
    name: 'Jean Dupont',
    role: 'Responsable de programme',
    company: 'Promoteur XYZ',
    category: 'Promoteur',
    email: 'jean.dupont@exemple.fr',
    phone: '06 12 34 56 78',
    notes: 'Contact principal pour le suivi du programme immobilier'
  },
  {
    id: 2,
    name: 'Marie Martin',
    role: 'Conseillère bancaire',
    company: 'Banque ABC',
    category: 'Banque',
    email: 'marie.martin@banque.fr',
    phone: '01 23 45 67 89',
    notes: 'A établi notre plan de financement et suit notre dossier de prêt'
  },
  {
    id: 3,
    name: 'Pierre Legrand',
    role: 'Notaire',
    company: 'Office notarial Legrand & Associés',
    category: 'Notaire',
    email: 'p.legrand@notaires.fr',
    phone: '01 98 76 54 32',
    notes: ''
  },
  {
    id: 4,
    name: 'Sophie Petit',
    role: 'Architecte d\'intérieur',
    company: 'Studio Design',
    category: 'Architecte',
    email: 'sophie.petit@studio.fr',
    phone: '07 65 43 21 09',
    notes: 'Consultée pour l\'aménagement intérieur'
  },
  {
    id: 5,
    name: 'Thomas Richard',
    role: 'Conseiller commercial',
    company: 'Agence Immo Plus',
    category: 'Agent immobilier',
    email: 'thomas.richard@immoplus.fr',
    phone: '06 98 76 54 32',
    notes: 'Nous a accompagnés lors des premières visites'
  }
];

// Catégories de contacts avec leurs couleurs
const categories = [
  { name: 'Tous', color: 'bg-secondary-100 text-secondary-800' },
  { name: 'Promoteur', color: 'bg-blue-100 text-blue-800' },
  { name: 'Banque', color: 'bg-green-100 text-green-800' },
  { name: 'Notaire', color: 'bg-purple-100 text-purple-800' },
  { name: 'Agent immobilier', color: 'bg-orange-100 text-orange-800' },
  { name: 'Architecte', color: 'bg-red-100 text-red-800' },
  { name: 'Autre', color: 'bg-secondary-100 text-secondary-800' },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  
  // Filtrer les contacts par catégorie
  const filteredContacts = contacts.filter(contact => 
    selectedCategory === 'Tous' || contact.category === selectedCategory
  );
  
  // Simuler la suppression d'un contact
  const deleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  
  // Simuler l'édition d'un contact (fonctionnalité non implémentée complètement)
  const editContact = (id: number) => {
    alert('Fonctionnalité d\'édition de contact à implémenter');
    // Dans une vraie application, cela ouvrirait une modale ou un formulaire d'édition
  };
  
  // Simuler l'ajout d'un nouveau contact (fonctionnalité non implémentée complètement)
  const addNewContact = () => {
    alert('Fonctionnalité d\'ajout de contact à implémenter');
    // Dans une vraie application, cela ouvrirait une modale ou un formulaire d'ajout
  };
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">Contacts</h1>
        <p className="mt-2 text-secondary-600">Gérez les contacts liés à votre achat d'appartement</p>
      </header>
      
      {/* Filtres par catégorie */}
      <div className="flex items-center justify-between">
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
        
        <button
          type="button"
          onClick={addNewContact}
          className="btn btn-primary flex items-center space-x-2"
        >
          <UserIcon className="h-5 w-5" aria-hidden="true" />
          <span>Ajouter un contact</span>
        </button>
      </div>
      
      {/* Liste des contacts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredContacts.map(contact => {
          // Trouver la couleur de la catégorie
          const category = categories.find(c => c.name === contact.category);
          const categoryColor = category ? category.color : categories[0].color;
          
          return (
            <div key={contact.id} className="card relative">
              <div className="absolute right-4 top-4 flex space-x-2">
                <button
                  onClick={() => editContact(contact.id)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Éditer</span>
                </button>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Supprimer</span>
                </button>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary-900">{contact.name}</h3>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColor}`}>
                    {contact.category}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-sm text-secondary-500">Rôle</p>
                  <p className="mt-1 font-medium text-secondary-900">{contact.role}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Entreprise</p>
                  <p className="mt-1 font-medium text-secondary-900">{contact.company}</p>
                </div>
                
                <div className="border-t border-secondary-200 pt-3 space-y-3">
                  <div className="flex items-start">
                    <EnvelopeIcon className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" aria-hidden="true" />
                    <a href={`mailto:${contact.email}`} className="text-sm text-primary-600 hover:text-primary-800">
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <PhoneIcon className="h-5 w-5 text-secondary-400 mr-2 mt-0.5" aria-hidden="true" />
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-sm text-primary-600 hover:text-primary-800">
                      {contact.phone}
                    </a>
                  </div>
                </div>
                
                {contact.notes && (
                  <div className="border-t border-secondary-200 pt-3">
                    <p className="text-sm text-secondary-500">Notes</p>
                    <p className="mt-1 text-sm text-secondary-700">{contact.notes}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {filteredContacts.length === 0 && (
          <div className="col-span-full card py-12 text-center">
            <UserIcon className="mx-auto h-12 w-12 text-secondary-400" />
            <h3 className="mt-2 text-sm font-medium text-secondary-900">Aucun contact</h3>
            <p className="mt-1 text-sm text-secondary-500">
              {selectedCategory !== 'Tous' 
                ? `Aucun contact dans la catégorie ${selectedCategory}` 
                : "Commencez par ajouter un contact"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}