import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { THEME } from '../../constants/theme';
import { Card, Button, Input } from '../../components/ui';
import { User, Mail, Shield, Camera, Save } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  // Initialize form with existing user data
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.username || '', // Assuming email is used as username
    }
  });

  const onSubmit = async (data) => {
    setIsUpdating(true);
    // TODO: Connect to Spring Boot /api/users/update endpoint later
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Profile Updated:', data);
    setIsUpdating(false);
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Page Header */}
      <div>
        <h1 className={`${THEME.styles.headingPremium} text-2xl lg:text-3xl mb-1`}>
          User Profile
        </h1>
        <p className={THEME.styles.bodyMuted}>
          Manage your identity and personal preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Identity Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-8 text-center flex flex-col items-center relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full blur-2xl" />
            
            {/* Avatar Group */}
            <div className="relative mb-6 group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center overflow-hidden">
                <User size={40} className="text-gray-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute bottom-0 right-0 bg-darker p-2 rounded-full border border-white/[0.1] hover:bg-white hover:text-dark transition-colors">
                <Camera size={14} />
              </div>
            </div>

            <h3 className="text-xl text-light font-light tracking-wide mb-1">
              {user?.username || 'Administrator'}
            </h3>
            
            <div className="flex gap-2 justify-center mt-4">
              {(user?.roles || ['ROLE_USER']).map((role, idx) => (
                <span key={idx} className="text-[10px] uppercase tracking-widest text-gray-400 font-medium bg-white/[0.05] border border-white/[0.1] px-3 py-1 rounded-full">
                  {role.replace('ROLE_', '')}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Data Form */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            <h3 className="text-sm tracking-widest uppercase text-light font-medium mb-6 flex items-center gap-2">
              <Shield size={16} className="text-gray-400" />
              Account Details
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <Input
                  label="Username"
                  icon={User}
                  placeholder="Enter username"
                  error={errors.username?.message}
                  {...register('username', { 
                    required: 'Username is required',
                    minLength: { value: 3, message: 'Minimum 3 characters' }
                  })}
                />

                <Input
                  label="Email Address"
                  icon={Mail}
                  disabled // Often, emails cannot be changed without a strict verification process
                  className="opacity-50 cursor-not-allowed"
                  {...register('email')}
                />
              </div>

              <div className="pt-4 border-t border-white/[0.05] flex justify-end">
                <Button 
                  type="submit" 
                  isLoading={isUpdating}
                  disabled={!isDirty} // Button is disabled until the user actually types something new
                >
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>

      </div>
    </div>
  );
}