import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { Button, Input, Card } from '../../components/ui';
import { THEME } from '../../constants/theme';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(''); 

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // Bring in our new tools!
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError(''); 
    
    try {
      const responseData = await authService.login(data.email, data.password);
      
      // 1. Backend should return a DTO like: { jwt: "ey...", username: "...", roles: [...] }
      // 2. Save it to Global Context
      login(responseData.jwt, {
        username: responseData.username,
        roles: responseData.roles
      });

      // 3. Redirect to the secure dashboard!
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Login Failed', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        setApiError('Invalid email or password.');
      } else {
        setApiError('Unable to connect to the server. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex min-h-screen w-full bg-darker overflow-hidden">
      
      {/* Left Column: Abstract Visual */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-dark">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <h1 className={`${THEME.styles.headingPremium} text-3xl mb-4`}>CRED.SYS</h1>
          <p className="text-gray-400 max-w-sm tracking-wide leading-relaxed">
            Secure, scalable, and beautifully minimal. Access your premium dashboard architecture.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-xs tracking-[0.2em] text-gray-500 uppercase">
          <span>System v1.0.0</span>
          <div className="w-8 h-[1px] bg-white/[0.1]" />
          <span>Encrypted</span>
        </div>
      </div>

      {/* Right Column: Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 z-10">
        <Card className="w-full max-w-md p-8 lg:p-10 border-white/[0.05]">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-light text-light tracking-wide mb-2">Welcome Back</h2>
            <p className={THEME.styles.bodyMuted}>Enter your credentials to continue</p>
          </div>

          {/* API Error Banner is now correctly placed here! */}
          {apiError && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
              <AlertCircle size={18} />
              <p>{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                icon={Lock}
                error={errors.password?.message}
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-gray-400 hover:text-white transition-colors"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-600 bg-white/[0.05] checked:bg-light checked:border-light focus:ring-0 focus:ring-offset-0 transition-all appearance-none flex items-center justify-center before:content-[''] checked:before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjIwIDYgOSAxNyA0IDEyIi8+PC9zdmc+')] before:w-3 before:h-3 before:bg-no-repeat before:bg-center"
                  {...register('rememberMe')}
                />
                <span className="text-xs text-gray-400 group-hover:text-light transition-colors">
                  Remember device
                </span>
              </label>
              
              <button type="button" className="text-xs text-gray-400 hover:text-light transition-colors border-b border-transparent hover:border-light">
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-8 group" 
              isLoading={isLoading}
            >
              {!isLoading && (
                <>
                  Authenticate
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}