'use client'

import Link from 'next/link'
import { Shield, Lock, Image as ImageIcon, FileText, Check, ArrowRight, Eye, EyeOff, Key } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="text-indigo-600 h-6 w-6" />
            <h1 className="text-xl font-bold text-gray-800">
              Hidden<span className="text-indigo-600">Pixels</span>
            </h1>
          </div>
          <nav className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/gallery" className="text-indigo-600 font-medium">Gallery</Link>
            <Link href="/about" className="text-indigo-600 font-medium">About</Link>
            <Link href="/auth" className="text-gray-600 hover:text-gray-900">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About HiddenPixels</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform offers advanced privacy tools for secure communication and data protection using encryption and steganography.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Encryption Feature */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                <Lock className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Encryption Tools</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Secure your sensitive information with powerful encryption algorithms that convert your messages into unreadable code that can only be deciphered with the correct key.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                <p className="text-gray-700">AES-256 encryption for maximum security</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                <p className="text-gray-700">Password-protected message encryption</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                <p className="text-gray-700">Secure key management</p>
              </div>
            </div>
          </div>

          {/* Steganography Feature */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-emerald-100 rounded-lg mr-4">
                <ImageIcon className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Steganography Tools</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Hide secret messages within ordinary-looking images. Steganography allows you to conceal information in plain sight, adding an additional layer of security.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
                <p className="text-gray-700">Embed text in images without visible changes</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
                <p className="text-gray-700">Support for multiple image formats</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
                <p className="text-gray-700">Optional password protection for extraction</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">How It Works</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">1. Create Your Message</h4>
              <p className="text-gray-600">
                Type your secret message or upload the file you want to protect.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Key className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">2. Apply Protection</h4>
              <p className="text-gray-600">
                Choose encryption, steganography, or both to secure your data.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">3. Share Securely</h4>
              <p className="text-gray-600">
                Share your protected files knowing only intended recipients can access them.
              </p>
            </div>
          </div>
        </div>

        {/* Security Promise */}
        <div className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-2xl shadow-xl p-8 text-white mb-20 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-12 w-12 text-indigo-300 mr-3" />
              <h3 className="text-2xl font-bold">Our Security Promise</h3>
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-300 mb-6">
                At HiddenPixels, we believe privacy is a fundamental right. Our tools are designed with security at their core, ensuring your sensitive information remains protected.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold text-white">End-to-End Encryption</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold text-white">Zero Data Storage</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold text-white">Open Source Security</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to protect your data?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust HiddenPixels for their privacy and security needs.
          </p>
          <Link
            href="/auth"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="text-indigo-600 h-5 w-5" />
              <span className="text-gray-800 font-semibold">HiddenPixels</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} HiddenPixels. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}