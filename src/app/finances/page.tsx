'use client';

import { useState } from 'react';
import { 
  BanknotesIcon, 
  HomeIcon, 
  BuildingLibraryIcon, 
  DocumentTextIcon, 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

// Types pour les données financières
type FinancialData = {
  propertyPrice: number;
  additionalCosts: number;
  totalLoanAmount: number;
  loanRate: number;
  loanDuration: number;
  downPayment: number;
  monthlyPayment: number;
  paidAmount: number;
  totalInterest: number;
};

// Données fictives financières
const initialFinancialData: FinancialData = {
  propertyPrice: 350000,
  additionalCosts: 25000,
  totalLoanAmount: 325000,
  loanRate: 3.2,
  loanDuration: 25,
  downPayment: 50000,
  monthlyPayment: 1580,
  paidAmount: 60000,
  totalInterest: 149000,
};

type Expense = {
  id: number;
  name: string;
  amount: number;
  category: 'Frais de notaire' | 'Frais de dossier' | 'Assurance' | 'Garanties' | 'Autre';
  isPaid: boolean;
};

// Données fictives des dépenses supplémentaires
const initialExpenses: Expense[] = [
  { id: 1, name: 'Frais de notaire', amount: 12500, category: 'Frais de notaire', isPaid: false },
  { id: 2, name: 'Frais de dossier bancaire', amount: 1200, category: 'Frais de dossier', isPaid: true },
  { id: 3, name: 'Assurance emprunteur', amount: 7800, category: 'Assurance', isPaid: false },
  { id: 4, name: 'Garantie de prêt', amount: 3500, category: 'Garanties', isPaid: true },
  { id: 5, name: 'Diagnostics techniques', amount: 800, category: 'Autre', isPaid: true },
];

// Fonction pour formater les montants en euros
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Calculer le prix total (bien + frais additionnels)
const calculateTotalPrice = (data: FinancialData) => {
  return data.propertyPrice + data.additionalCosts;
};

export default function FinancesPage() {
  const [financialData] = useState<FinancialData>(initialFinancialData);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const totalPrice = calculateTotalPrice(financialData);
  
  // Calculer le total des dépenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Marquer une dépense comme payée ou non payée
  const toggleExpenseStatus = (id: number) => {
    setExpenses(expenses.map(expense => 
      expense.id === id 
        ? { ...expense, isPaid: !expense.isPaid }
        : expense
    ));
  };
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">Suivi financier</h1>
        <p className="mt-2 text-secondary-600">Aperçu financier de votre acquisition immobilière</p>
      </header>
      
      {/* Résumé financier */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-primary-100">
              <HomeIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Prix du bien</h2>
              <p className="text-lg font-semibold text-secondary-900">{formatCurrency(financialData.propertyPrice)}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-primary-100">
              <DocumentTextIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Frais additionnels</h2>
              <p className="text-lg font-semibold text-secondary-900">{formatCurrency(financialData.additionalCosts)}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-primary-100">
              <BuildingLibraryIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Montant du prêt</h2>
              <p className="text-lg font-semibold text-secondary-900">{formatCurrency(financialData.totalLoanAmount)}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-primary-100">
              <BanknotesIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-secondary-500">Apport personnel</h2>
              <p className="text-lg font-semibold text-secondary-900">{formatCurrency(financialData.downPayment)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Détails du prêt */}
      <div className="card">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Détails du prêt</h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-secondary-500">Taux d'intérêt</p>
            <p className="mt-1 text-xl font-semibold text-secondary-900">{financialData.loanRate}%</p>
          </div>
          
          <div>
            <p className="text-sm text-secondary-500">Durée du prêt</p>
            <p className="mt-1 text-xl font-semibold text-secondary-900">{financialData.loanDuration} ans</p>
          </div>
          
          <div>
            <p className="text-sm text-secondary-500">Mensualité</p>
            <p className="mt-1 text-xl font-semibold text-secondary-900">{formatCurrency(financialData.monthlyPayment)}</p>
          </div>
          
          <div>
            <p className="text-sm text-secondary-500">Montant total des intérêts</p>
            <p className="mt-1 text-xl font-semibold text-secondary-900">{formatCurrency(financialData.totalInterest)}</p>
          </div>
          
          <div>
            <p className="text-sm text-secondary-500">Coût total du crédit</p>
            <p className="mt-1 text-xl font-semibold text-secondary-900">{formatCurrency(financialData.totalLoanAmount + financialData.totalInterest)}</p>
          </div>
          
          <div>
            <p className="text-sm text-secondary-500">Ratio apport / prix</p>
            <p className="mt-1 text-xl font-semibold text-secondary-900">{((financialData.downPayment / financialData.propertyPrice) * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>
      
      {/* Répartition des coûts */}
      <div className="card overflow-hidden">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Répartition des coûts</h2>
        
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ArrowTrendingDownIcon className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary-900">Déjà payé</span>
            </div>
            <span className="text-sm font-medium text-secondary-900">{formatCurrency(financialData.paidAmount)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-5 w-5 text-red-500 mr-2" aria-hidden="true" />
              <span className="text-sm font-medium text-secondary-900">Reste à payer</span>
            </div>
            <span className="text-sm font-medium text-secondary-900">{formatCurrency(totalPrice - financialData.paidAmount)}</span>
          </div>
          
          <div className="h-2 w-full rounded-full bg-secondary-200">
            <div 
              className="h-2 rounded-full bg-primary-600" 
              style={{ width: `${(financialData.paidAmount / totalPrice) * 100}%` }}
            />
          </div>
          
          <p className="text-sm text-secondary-500 text-right">
            {((financialData.paidAmount / totalPrice) * 100).toFixed(1)}% payés
          </p>
        </div>
      </div>
      
      {/* Dépenses supplémentaires */}
      <div className="card overflow-hidden">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Dépenses supplémentaires</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Dépense</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Catégorie</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Montant</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Statut</th>
                <th scope="col" className="relative px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-secondary-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-secondary-900">{expense.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary-100 text-secondary-800">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {expense.isPaid ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                        Payé
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800">
                        À payer
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleExpenseStatus(expense.id)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      {expense.isPaid ? 'Marquer comme non payé' : 'Marquer comme payé'}
                    </button>
                  </td>
                </tr>
              ))}
              {/* Ligne de total */}
              <tr className="bg-secondary-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-secondary-900">Total</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-secondary-900">
                  {formatCurrency(totalExpenses)}
                </td>
                <td colSpan={2} className="px-4 py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}