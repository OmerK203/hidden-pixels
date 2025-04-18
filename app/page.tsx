'use client'

import Image from 'next/image'
import Link from 'next/link'
import marble from '@/public/marble.png'
import { Shield, Menu, Lock, Image as ImageIcon, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 bg-indigo-600 opacity-10 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 bg-emerald-600 opacity-10 w-96 h-96 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Top Navigation */}
        <div className="flex items-center justify-between px-6 md:px-10 py-6">
          <div className="flex items-center space-x-2">
            <Shield className="text-indigo-400 h-5 w-5" />
            <h1 className="text-white text-lg font-semibold tracking-wide">
              Hidden<span className="text-indigo-400">Pixels</span>
            </h1>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center text-center px-6 md:px-24 py-10 mt-8">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8 max-w-4xl">
            Protect your data with <span className="text-indigo-400">hidden encryption</span><br />
            and <span className="text-emerald-400">invisible steganography</span>
          </h2>

          <p className="text-gray-300 text-lg max-w-2xl py-2">
            HiddenPixels is your privacy-first cryptography tool for securely encrypting messages and embedding secrets in plain sight.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/auth"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Lock className="mr-2 h-4 w-4" />
              Get Started
            </Link>

            <Link
              href="/about"
              className="bg-transparent hover:bg-gray-800 text-white border border-gray-600 font-medium px-8 py-3 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/gallery"
              className="bg-transparent hover:bg-gray-800 text-white border border-gray-600 font-medium px-8 py-3 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              View Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-16 max-w-2xl w-full relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-emerald-500/20 rounded-2xl blur-sm"></div>
            <div className="relative bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-2xl">
              <Image
                src={marble}
                alt="Encrypted Marble Sculpture"
                priority
                className="w-full h-auto object-contain mx-auto rounded-lg"
              />

              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-3">
                  <div className="bg-indigo-900/50 p-2 rounded-lg">
                    <Lock className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div className="bg-emerald-900/50 p-2 rounded-lg">
                    <ImageIcon className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Secure • Private • Encrypted
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-gray-400 text-sm">
            End-to-end encryption • Zero data storage • Open source
          </div>
        </div>
      </div>
    </div>
  )
}