import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { THEME } from '../../constants/theme';
import { Card, Button, Input } from '../../components/ui';
import { Shield, Key, Bell, Smartphone, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [isUpdating, setIsUpdating] = useState(false);

  // Initialize form
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  
  // Watch the new password field to compare it with the confirm field
  const newPassword = watch('newPassword', '');

  const onSubmit = async (data) => {
    setIsUpdating(true);
    // TODO: Connect to Spring Boot /api/users/change-password endpoint later
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password Updated:', data);
    reset(); // Clear the form after success
    setIsUpdating(false);
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Page Header */}
      <div>
        <h1 className={`${THEME.styles.headingPremium} text-2xl lg:text-3xl mb-1`}>
          System Settings
        </h1>
        <p className={THEME.styles.bodyMuted}>
          Configure security credentials and platform preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Security (Change Password) */}
        <div className="lg:col-span-2">
          <Card className="p-8 h-full">
            <h3 className="text-sm tracking-widest uppercase text-light font-medium mb-6 flex items-center gap-2">
              <Key size={16} className="text-gray-400" />
              Security Credentials
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
              
              <Input
                label="Current Password"
                type="password"
                icon={Lock}
                placeholder="Enter current password"
                error={errors.currentPassword?.message}
                {...register('currentPassword', { 
                  required: 'Current password is required' 
                })}
              />

              <div className="w-full h-[1px] bg-white/[0.05] my-2" />

              <Input
                label="New Password"
                type="password"
                icon={Shield}
                placeholder="Enter new password"
                error={errors.newPassword?.message}
                {...register('newPassword', { 
                  required: 'New password is required',
                  minLength: { value: 8, message: 'Must be at least 8 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Must contain uppercase, lowercase, and number'
                  }
                })}
              />

              <Input
                label="Confirm New Password"
                type="password"
                icon={Shield}
                placeholder="Confirm new password"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === newPassword || 'Passwords do not match'
                })}
              />

              <div className="pt-2">
                <Button type="submit" isLoading={isUpdating}>
                  Update Credentials
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: System Preferences */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-8">
            <h3 className="text-sm tracking-widest uppercase text-light font-medium mb-6 flex items-center gap-2">
              <Bell size={16} className="text-gray-400" />
              Preferences
            </h3>

            <div className="space-y-6">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-light">Push Notifications</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Alerts on system events</p>
                </div>
                {/* CSS-only Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-white/[0.1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-light/20"></div>
                </label>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-light">Two-Factor Auth</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Require 2FA on login</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-white/[0.1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-light/20 peer-checked:after:bg-white"></div>
                </label>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/[0.02] border-white/[0.05]">
            <div className="flex items-start gap-4">
              <Smartphone size={24} className="text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-light mb-1">Active Device</p>
                <p className="text-xs text-gray-500 mb-3">Windows PC • Chrome (Current)</p>
                <button className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors font-medium">
                  Revoke Access
                </button>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}