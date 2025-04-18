'use client'

import { useRouter } from 'next/navigation'
import useAuthRedirect from '@/app/lib/useAuthRedirect'
import { Image, Shield, ArrowRight } from 'lucide-react'

export default function ChooseToolPage() {
  const router = useRouter()
  useAuthRedirect()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Security Tools</h1>
      <p className="text-gray-600 mb-8 max-w-md text-center">Choose a tool to protect your sensitive information</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <div
          onClick={() => router.push('/steganography')}
          className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-lg mr-4">
              <Image className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Steganography Tool</h2>
          </div>
          <p className="text-gray-600 mb-4">Hide or extract secret messages within images without detection.</p>
          <div className="flex justify-end">
            <div className="text-indigo-600 flex items-center text-sm font-medium">
              Get started <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>

        <div
          onClick={() => router.push('/encryption')}
          className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg mr-4">
              <Shield className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Encryption Tool</h2>
          </div>
          <p className="text-gray-600 mb-4">Encrypt or decrypt messages using powerful cryptographic algorithms.</p>
          <div className="flex justify-end">
            <div className="text-emerald-600 flex items-center text-sm font-medium">
              Get started <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}