'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabaseClient'
import { useState } from 'react'
import { Shield, Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAuth = async () => {
    setError(null)
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
    } else {
      router.push('/choose-tool')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-indigo-900 text-white flex flex-col justify-center px-8 md:px-16 py-12 md:py-0 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-12">
            <Shield className="text-indigo-400 h-7 w-7" />
            <h1 className="text-2xl font-bold tracking-wide">
              Hidden<span className="text-indigo-400">Pixels</span>
            </h1>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to <br />secure privacy
          </h2>
          <p className="text-lg opacity-70 max-w-md">
            Encrypt your messages and hide data with our advanced security tools.
          </p>

          <div className="mt-12 space-y-4 hidden md:block">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-900/50 rounded-lg">
                <Lock className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="text-sm text-gray-300">End-to-end encryption</div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-900/50 rounded-lg">
                <Shield className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="text-sm text-gray-300">Zero data storage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center px-6 py-12 md:py-0">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              {isLogin && <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Forgot password?</a>}
              {!isLogin && <div></div>}
            </div>

            <button
              onClick={handleAuth}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center shadow-md hover:shadow-lg"
            >
              {isLogin ? (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign in
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create account
                </>
              )}
            </button>

            {!isLogin && (
              <button
                className="w-full mt-3 border border-gray-300 bg-white hover:bg-gray-50 py-3 px-4 rounded-lg text-gray-700 flex justify-center items-center gap-2 transition-colors duration-200 shadow-sm"
                disabled
              >
                <img src="/google-icon.svg" className="w-5 h-5" alt="Google" />
                Continue with Google
              </button>
            )}
          </div>

          <div className="mt-8 pt-5 border-t border-gray-200">
            <p className="text-center text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                className="text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
              {error}
            </div>
          )}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}