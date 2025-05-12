'use client';

import { useState } from 'react';
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { CalendarDaysIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

// Données fictives des étapes d'achat
const initialSteps = [
  {
    id: 1,
    name: 'Réservation',
    description: 'Signature du contrat de réservation et versement du dépôt de garantie',
    date: '15/02/2024',
    completed: true,
    documents: [
      { id: 1, name: 'Contrat de réservation signé', uploaded: true },
      { id: 2, name: 'Justificatif de versement du dépôt de garantie', uploaded: true },
    ],
  },
  {
    id: 2,
    name: 'Demande de prêt',
    description: 'Demande de prêt immobilier auprès des banques',
    date: '01/03/2024',
    completed: true,
    documents: [
      { id: 3, name: 'Offre de prêt', uploaded: true },
      { id: 4, name: 'Plan de financement', uploaded: true },
    ],
  },
  {
    id: 3,
    name: 'Signature chez le notaire',
    description: 'Signature de l\'acte authentique de vente',
    date: '24/04/2024',
    completed: false,
    documents: [
      { id: 5, name: 'Acte de vente', uploaded: false },
      { id: 6, name: 'Attestation notariée', uploaded: false },
    ],
  },
  {
    id: 4,
    name: 'Appel de fonds - Fondations',
    description: 'Paiement de la première tranche',
    date: '30/05/2024',
    completed: false,
    documents: [
      { id: 7, name: 'Appel de fonds', uploaded: false },
      { id: 8, name: 'Justificatif de paiement', uploaded: false },
    ],
  },
  {
    id: 5,
    name: 'Achèvement des travaux',
    description: 'Fin des travaux de construction',
    date: '01/06/2025',
    completed: false,
    documents: [
      { id: 9, name: 'Attestation d\'achèvement des travaux', uploaded: false },
    ],
  },
  {
    id: 6,
    name: 'Livraison',
    description: 'Remise des clés et visite de réception',
    date: '15/06/2025',
    completed: false,
    documents: [
      { id: 10, name: 'Procès-verbal de livraison', uploaded: false },
      { id: 11, name: 'Liste des réserves', uploaded: false },
    ],
  },
];

export default function EtapesPage() {
  const [steps, setSteps] = useState(initialSteps);
  
  const toggleStepCompletion = (stepId: number) => {
    setSteps(steps.map(step => 
      step.id === stepId 
        ? { ...step, completed: !step.completed } 
        : step
    ));
  };
  
  const toggleDocumentUpload = (stepId: number, documentId: number) => {
    setSteps(steps.map(step => 
      step.id === stepId 
        ? {
            ...step,
            documents: step.documents.map(doc => 
              doc.id === documentId 
                ? { ...doc, uploaded: !doc.uploaded } 
                : doc
            )
          } 
        : step
    ));
  };
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">Étapes d'achat</h1>
        <p className="mt-2 text-secondary-600">Suivi des étapes clés de votre acquisition immobilière</p>
      </header>
      
      <div className="relative">
        <div className="absolute left-6 top-4 h-full w-0.5 -ml-px bg-secondary-200"></div>
        <ul className="space-y-8">
          {steps.map((step) => (
            <li key={step.id} className="relative">
              <div className="flex items-start">
                <button
                  type="button"
                  onClick={() => toggleStepCompletion(step.id)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                    step.completed
                      ? 'bg-primary-600 border-primary-600 hover:bg-primary-700 hover:border-primary-700'
                      : 'bg-white border-secondary-300 hover:border-secondary-400'
                  } z-10`}
                >
                  {step.completed ? (
                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full bg-secondary-300" />
                  )}
                </button>
                <div className="ml-4 min-w-0 flex-1">
                  <div className="card">
                    <div className="flex flex-wrap items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-secondary-900">{step.name}</h2>
                        <p className="mt-1 text-secondary-600">{step.description}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 flex items-center">
                        <CalendarDaysIcon className="h-5 w-5 text-secondary-400" aria-hidden="true" />
                        <span className="ml-1.5 text-sm text-secondary-600">{step.date}</span>
                      </div>
                    </div>
                    
                    {step.documents && step.documents.length > 0 && (
                      <div className="mt-4 border-t border-secondary-200 pt-4">
                        <h3 className="text-sm font-medium text-secondary-900 flex items-center">
                          <DocumentTextIcon className="h-5 w-5 text-secondary-400 mr-2" aria-hidden="true" />
                          Documents associés
                        </h3>
                        <ul className="mt-2 space-y-2">
                          {step.documents.map((doc) => (
                            <li key={doc.id} className="flex items-center justify-between">
                              <span className="text-sm text-secondary-700">{doc.name}</span>
                              <button
                                type="button"
                                onClick={() => toggleDocumentUpload(step.id, doc.id)}
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                  doc.uploaded
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {doc.uploaded ? (
                                  <>
                                    <CheckIcon className="mr-1 h-3.5 w-3.5 text-green-500" aria-hidden="true" />
                                    Ajouté
                                  </>
                                ) : (
                                  <>
                                    <ExclamationCircleIcon className="mr-1 h-3.5 w-3.5 text-yellow-500" aria-hidden="true" />
                                    À ajouter
                                  </>
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}