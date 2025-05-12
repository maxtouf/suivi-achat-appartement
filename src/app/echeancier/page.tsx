'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  CalendarIcon, 
  BanknotesIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

// Types pour les paiements
type Payment = {
  id: number;
  title: string;
  amount: number;
  dueDate: string;
  description: string;
  isPaid: boolean;
  category: 'Dépôt' | 'Appel de fonds' | 'Frais notaire' | 'Autre';
};

// Données fictives des paiements
const initialPayments: Payment[] = [
  {
    id: 1,
    title: 'Dépôt de garantie',
    amount: 10000,
    dueDate: '2024-02-15',
    description: 'Dépôt de garantie à verser lors de la signature du contrat de réservation',
    isPaid: true,
    category: 'Dépôt'
  },
  {
    id: 2,
    title: 'Frais de notaire',
    amount: 12500,
    dueDate: '2024-04-24',
    description: 'Frais de notaire pour la signature de l\'acte authentique',
    isPaid: false,
    category: 'Frais notaire'
  },
  {
    id: 3,
    title: 'Appel de fonds - Fondations',
    amount: 35000,
    dueDate: '2024-05-30',
    description: 'Premier appel de fonds correspondant à 10% du prix de vente',
    isPaid: false,
    category: 'Appel de fonds'
  },
  {
    id: 4,
    title: 'Appel de fonds - Achèvement plancher bas RDC',
    amount: 70000,
    dueDate: '2024-08-15',
    description: 'Deuxième appel de fonds correspondant à 20% du prix de vente',
    isPaid: false,
    category: 'Appel de fonds'
  },
  {
    id: 5,
    title: 'Appel de fonds - Mise hors d\'eau',
    amount: 70000,
    dueDate: '2024-11-30',
    description: 'Troisième appel de fonds correspondant à 20% du prix de vente',
    isPaid: false,
    category: 'Appel de fonds'
  },
  {
    id: 6,
    title: 'Appel de fonds - Achèvement cloisons',
    amount: 87500,
    dueDate: '2025-02-28',
    description: 'Quatrième appel de fonds correspondant à 25% du prix de vente',
    isPaid: false,
    category: 'Appel de fonds'
  },
  {
    id: 7,
    title: 'Appel de fonds - Mise à disposition',
    amount: 65000,
    dueDate: '2025-06-15',
    description: 'Dernier appel de fonds correspondant à 15% du prix de vente',
    isPaid: false,
    category: 'Appel de fonds'
  },
];

// Fonction pour formater les montants en euros
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    return format(date, 'd MMMM yyyy', { locale: fr });
  } catch (error) {
    return dateString;
  }
};

export default function EcheancierPage() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  
  // Calculer le total des paiements
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  
  // Calculer le montant déjà payé
  const paidAmount = payments
    .filter(payment => payment.isPaid)
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  // Calculer le pourcentage payé
  const paidPercentage = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;
  
  // Marquer un paiement comme payé ou non payé
  const togglePaymentStatus = (id: number) => {
    setPayments(payments.map(payment => 
      payment.id === id 
        ? { ...payment, isPaid: !payment.isPaid }
        : payment
    ));
  };
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">Échéancier</h1>
        <p className="mt-2 text-secondary-600">Suivi des paiements liés à votre acquisition immobilière</p>
      </header>
      
      {/* Résumé financier */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900">Prix total</h2>
          <p className="mt-2 text-3xl font-bold text-secondary-900">{formatCurrency(totalAmount)}</p>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900">Montant payé</h2>
          <p className="mt-2 text-3xl font-bold text-primary-600">{formatCurrency(paidAmount)}</p>
          <p className="mt-1 text-sm text-secondary-500">
            {paidPercentage.toFixed(1)}% du montant total
          </p>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900">Reste à payer</h2>
          <p className="mt-2 text-3xl font-bold text-secondary-800">{formatCurrency(totalAmount - paidAmount)}</p>
        </div>
      </div>
      
      {/* Barre de progression */}
      <div className="card">
        <h2 className="text-lg font-semibold text-secondary-900">Progression des paiements</h2>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span>{paidPercentage.toFixed(1)}% payés</span>
            <span>{(100 - paidPercentage).toFixed(1)}% restants</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-secondary-200">
            <div 
              className="h-2 rounded-full bg-primary-600" 
              style={{ width: `${paidPercentage}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Liste des paiements */}
      <div className="card overflow-hidden">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Calendrier des paiements</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Échéance</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Montant</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {payments.map((payment) => {
                // Déterminer la classe de catégorie
                let categoryClass = 'bg-secondary-100 text-secondary-800';
                if (payment.category === 'Appel de fonds') categoryClass = 'bg-blue-100 text-blue-800';
                if (payment.category === 'Frais notaire') categoryClass = 'bg-purple-100 text-purple-800';
                if (payment.category === 'Dépôt') categoryClass = 'bg-green-100 text-green-800';
                
                return (
                  <tr key={payment.id} className="hover:bg-secondary-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-secondary-400 mr-2" aria-hidden="true" />
                        <span className="text-sm text-secondary-900">{formatDate(payment.dueDate)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-secondary-900">{payment.title}</div>
                        <div className="text-sm text-secondary-500">{payment.description}</div>
                        <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${categoryClass}`}>
                          {payment.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BanknotesIcon className="h-5 w-5 text-secondary-400 mr-2" aria-hidden="true" />
                        <span className="text-sm font-medium text-secondary-900">{formatCurrency(payment.amount)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {payment.isPaid ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                          <CheckCircleIcon className="mr-1 h-4 w-4 text-green-500" aria-hidden="true" />
                          Payé
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800">
                          <ExclamationCircleIcon className="mr-1 h-4 w-4 text-yellow-500" aria-hidden="true" />
                          À payer
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => togglePaymentStatus(payment.id)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        {payment.isPaid ? 'Marquer comme non payé' : 'Marquer comme payé'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}