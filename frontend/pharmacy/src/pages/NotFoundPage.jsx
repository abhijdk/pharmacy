import React from 'react';
import { useNavigate } from 'react-router-dom';
import { THEME } from '../constants/theme';
import { Button } from '../components/ui';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-darker p-6 text-center animate-in fade-in duration-500">
      <div className="p-4 bg-red-500/10 rounded-full mb-6 border border-red-500/20">
        <ShieldAlert size={48} className="text-red-400" />
      </div>
      
      <h1 className="text-6xl font-light text-light mb-4 tracking-tighter">404</h1>
      <h2 className={`${THEME.styles.headingPremium} text-xl mb-4`}>Anomaly Detected</h2>
      
      <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
        The sector you are attempting to access does not exist in the current system registry. 
      </p>

      <Button onClick={() => navigate('/dashboard')} variant="secondary">
        <ArrowLeft size={16} className="mr-2" />
        Return to Safety
      </Button>
    </div>
  );
}