'use client';

import React, { useState } from 'react';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // Simulate form submission with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you would send the data to your backend
      console.log('Données de réservation:', formData);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '2',
        specialRequests: '',
      });
      
      setFormStatus('success');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
      setFormStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset error state when user starts typing again
    if (formStatus === 'error') {
      setFormStatus('idle');
      setErrorMessage('');
    }
  };

  // Get today's date in YYYY-MM-DD format for min date in date picker
  const today = new Date().toISOString().split('T')[0];
  
  // Get date 6 months from now for max date
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  const maxDate = sixMonthsFromNow.toISOString().split('T')[0];

  return (
    <div className="pt-20 pb-12 px-4 max-w-3xl mx-auto bg-white min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-serif">
        Réservation
      </h1>
      
      <div className="bg-[#fcfaf7] p-6 md:p-8 rounded-lg border border-[#f5e9c0] shadow-sm">
        {formStatus === 'success' && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 text-green-700">
            <p className="font-medium">Réservation confirmée!</p>
            <p>Nous avons bien reçu votre demande de réservation. Un email de confirmation vous sera envoyé prochainement.</p>
          </div>
        )}
        
        {formStatus === 'error' && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
            <p className="font-medium">Erreur</p>
            <p>{errorMessage}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet <span className="text-[#722F37]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#722F37] focus:ring-[#722F37] bg-white"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-[#722F37]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#722F37] focus:ring-[#722F37] bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-[#722F37]">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                max={maxDate}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#722F37] focus:ring-[#722F37] bg-white"
                required
              />
              <p className="mt-1 text-sm text-gray-500">Réservation possible jusqu&apos;à 6 mois à l&apos;avance</p>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Heure <span className="text-[#722F37]">*</span>
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                min="11:30"
                max="22:00"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#722F37] focus:ring-[#722F37] bg-white"
                required
              />
              <p className="mt-1 text-sm text-gray-500">Service: 11h30-14h30, 19h00-22h30</p>
            </div>
          </div>

          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de personnes <span className="text-[#722F37]">*</span>
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#722F37] focus:ring-[#722F37] bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'personne' : 'personnes'}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">Pour les réservations de plus de 8 personnes, veuillez nous contacter par téléphone</p>
          </div>
          
          <div>
            <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
              Demandes spéciales
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              rows={4}
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Allergies, occasions spéciales, préférences de table..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#722F37] focus:ring-[#722F37] bg-white resize-none"
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className={`w-full bg-[#722F37] text-white py-3 px-4 rounded-md hover:bg-[#9c575e] focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2 transition-colors
                ${formStatus === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''}
              `}
            >
              {formStatus === 'submitting' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Réservation en cours...
                </span>
              ) : 'Confirmer la réservation'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 bg-[#fcfaf7] p-6 rounded-lg border border-[#f5e9c0] shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-[#722F37] font-serif relative pb-3 elegant-border">
          Politique de réservation
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-[#722F37] mr-2">•</span>
            <span>Veuillez vous présenter à l&apos;heure de votre réservation. Votre table sera gardée pendant 15 minutes.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#722F37] mr-2">•</span>
            <span>Annulation sans frais jusqu&apos;à 24 heures avant votre réservation.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#722F37] mr-2">•</span>
            <span>Pour toute modification, contactez-nous directement par téléphone.</span>
          </li>
        </ul>
      </div>

      {/* Custom CSS for elegant borders */}
      <style jsx global>{`
        .elegant-border::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 2px;
          background-color: #d4af37;
        }
      `}</style>
    </div>
  );
} 