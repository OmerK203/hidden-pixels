'use client'

import { useState } from 'react'
import useAuthRedirect from '@/app/lib/useAuthRedirect'
import { Image, FileText, Upload, Download } from 'lucide-react'

export default function SteganographyPage() {
  useAuthRedirect()
  const [message, setMessage] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl border border-gray-100">
        <div className="flex items-center justify-center mb-6 space-x-2">
          <Image className="text-indigo-600 h-6 w-6" />
          <h1 className="text-2xl font-bold text-gray-800">Steganography Tool</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Upload Image</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
                disabled
              />
              <label
                htmlFor="fileInput"
                className="flex items-center justify-center w-full p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-not-allowed"
              >
                <div className="flex flex-col items-center text-gray-500">
                  <FileText className="h-10 w-10 mb-2 text-gray-400" />
                  <span className="text-sm">Click to upload or drag and drop</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG or GIF (max. 5MB)</span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Secret Message</label>
            <textarea
              placeholder="Type your message here..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              disabled
            >
              <Upload className="mr-2 h-4 w-4" />
              Embed
            </button>
            <button
              className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              disabled
            >
              <Download className="mr-2 h-4 w-4" />
              Extract
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            This demo is currently disabled.
          </div>
        </div>
      </div>
    </div>
  )
}