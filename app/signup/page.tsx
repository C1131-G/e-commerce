'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors: Partial<typeof errors> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors as typeof errors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
      });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 py-8">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="rounded-2xl bg-white shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-green-500 to-blue-600 px-8 py-12 text-center rounded-t-2xl">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-white p-3">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="mt-2 text-green-100">Join our agricultural community</p>
          </div>

          {/* Content Section */}
          <div className="px-8 py-8">
            {/* Success Message */}
            {success && (
              <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-800">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Account created successfully!</p>
                  <p className="text-sm">Welcome to our community</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.fullName ? 'focus:ring-red-200' : 'focus:ring-green-200'
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.email ? 'focus:ring-red-200' : 'focus:ring-green-200'
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 8 characters"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 py-3 pl-10 pr-10 text-gray-900 placeholder-gray-500 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.password ? 'focus:ring-red-200' : 'focus:ring-green-200'
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                <p className="mt-1 text-xs text-gray-500">Must include uppercase, lowercase, and numbers</p>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } bg-gray-50 py-3 pl-10 pr-10 text-gray-900 placeholder-gray-500 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.confirmPassword ? 'focus:ring-red-200' : 'focus:ring-green-200'
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Terms & Conditions */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="font-medium text-green-600 hover:text-green-700">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-medium text-green-600 hover:text-green-700">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-gradient-to-r from-green-500 to-blue-600 py-3 font-semibold text-white transition-all duration-200 hover:from-green-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 focus:outline-none focus:ring-4 focus:ring-green-200 mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-xs text-gray-500 font-medium">ALREADY A MEMBER?</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login2" className="font-semibold text-green-600 hover:text-green-700 transition-colors">
                Sign in here
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 bg-gray-50 px-8 py-4 text-center rounded-b-2xl">
            <p className="text-xs text-gray-500">
              Need help?{' '}
              <a href="#" className="text-green-600 hover:underline font-medium">
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}