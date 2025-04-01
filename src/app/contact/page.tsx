'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
      console.log('Message envoyé:', formData);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset error state when user starts typing again
    if (formStatus === 'error') {
      setFormStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto bg-white min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-serif">
        Nous Contacter
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Informations de contact */}
        <div className="space-y-8">
          <div className="bg-[#fcfaf7] p-6 rounded-lg border border-[#f5e9c0] shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-[#722F37] font-serif relative pb-3 elegant-border">
              Nos coordonnées
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-[#f8f4e9] p-3 mt-1">
                  <svg className="w-6 h-6 text-[#722F37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-lg mb-1">Adresse</p>
                  <p className="text-gray-600">123 Rue du Restaurant</p>
                  <p className="text-gray-600">75000 Paris, France</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-[#f8f4e9] p-3 mt-1">
                  <svg className="w-6 h-6 text-[#722F37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-lg mb-1">Téléphone</p>
                  <p className="text-gray-600">01 23 45 67 89</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-[#f8f4e9] p-3 mt-1">
                  <svg className="w-6 h-6 text-[#722F37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-lg mb-1">Email</p>
                  <p className="text-gray-600">contact@restaurant.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fcfaf7] p-6 rounded-lg border border-[#f5e9c0] shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-[#722F37] font-serif relative pb-3 elegant-border">
              Horaires d'ouverture
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-dashed border-[#d4af37] pb-3">
                <span className="font-medium text-lg">Lundi - Vendredi</span>
                <div className="text-gray-600 text-right">
                  <div>11h30 - 14h30</div>
                  <div>19h00 - 22h30</div>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-dashed border-[#d4af37] pb-3">
                <span className="font-medium text-lg">Samedi</span>
                <span className="text-gray-600">19h00 - 23h00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">Dimanche</span>
                <span className="text-gray-600 italic">Fermé</span>
              </div>
            </div>
          </div>
          
          {/* Map placeholder instead of Google Maps embed */}
          <div className="aspect-video bg-[#f8f4e9] rounded-lg shadow-sm overflow-hidden border border-[#f5e9c0]">
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <svg className="w-12 h-12 text-[#722F37] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-[#722F37] font-medium text-center">123 Rue du Restaurant, 75000 Paris</p>
              <p className="text-gray-600 text-sm text-center mt-2">Situé dans le cœur de Paris</p>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div>
          <div className="bg-[#fcfaf7] p-6 md:p-8 rounded-lg border border-[#f5e9c0] shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-[#722F37] font-serif relative pb-3 elegant-border">
              Envoyez-nous un message
            </h2>
            
            {formStatus === 'success' && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 text-green-700">
                <p className="font-medium">Message envoyé avec succès!</p>
                <p>Nous vous répondrons dans les plus brefs délais.</p>
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

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet <span className="text-[#722F37]">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#722F37] focus:ring-[#722F37] bg-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-[#722F37]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#722F37] focus:ring-[#722F37] bg-white resize-none"
                  required
                />
              </div>

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
                    Envoi en cours...
                  </span>
                ) : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
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