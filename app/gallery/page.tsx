'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Image as ImageIcon, Upload, Download, Filter, Search, Lock, Bookmark, Eye, MessageSquare } from 'lucide-react'

export default function GalleryPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  // Mock data for gallery items
  const galleryItems = [
    { id: 1, title: 'Hidden Message in Nature', type: 'image', format: 'jpg', creator: 'user123', created: '2 days ago', views: 124, hasPassword: true },
    { id: 2, title: 'Encrypted Data in Plain Sight', type: 'image', format: 'png', creator: 'securePro', created: '5 days ago', views: 89, hasPassword: false },
    { id: 3, title: 'Secret Project Notes', type: 'image', format: 'png', creator: 'designerX', created: '1 week ago', views: 245, hasPassword: true },
    { id: 4, title: 'Hidden Text Example', type: 'image', format: 'jpg', creator: 'cryptoFan', created: '2 weeks ago', views: 178, hasPassword: false },
    { id: 5, title: 'Steganography Demo', type: 'image', format: 'png', creator: 'teacherTech', created: '3 weeks ago', views: 492, hasPassword: false },
    { id: 6, title: 'Confidential Image', type: 'image', format: 'jpg', creator: 'privacyFirst', created: '1 month ago', views: 67, hasPassword: true },
  ]

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
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            {isAuthenticated ? (
              <button className="text-gray-600 hover:text-gray-900">Profile</button>
            ) : (
              <Link href="/auth" className="text-gray-600 hover:text-gray-900">Login</Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Gallery</h2>
            <p className="text-gray-600">Browse files with hidden messages created by our community</p>
          </div>

          {isAuthenticated ? (
            <Link
              href="/create"
              className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 flex items-center"
            >
              <Upload className="mr-2 h-4 w-4" />
              Create New
            </Link>
          ) : (
            <div className="mt-4 md:mt-0 flex items-center p-3 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
              <Lock className="h-5 w-5 mr-2 text-amber-500" />
              <span>Login to create your own hidden messages</span>
            </div>
          )}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'all' 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Files
              </button>
              <button
                onClick={() => setActiveFilter('images')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'images' 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setActiveFilter('newest')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'newest' 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => setActiveFilter('popular')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'popular' 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Most Viewed
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search gallery..."
                className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              {/* Preview Image (placeholder) */}
              <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-gray-400" />
                {item.hasPassword && (
                  <div className="absolute top-3 right-3 bg-gray-900/70 text-white p-1 rounded-md">
                    <Lock className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Item Details */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-3">By {item.creator} • {item.created}</p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Eye className="h-4 w-4 mr-1" />
                      {item.views}
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                      {item.format.toUpperCase()}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-indigo-600 transition-colors">
                      <Bookmark className="h-5 w-5" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-indigo-600 transition-colors">
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-indigo-600 transition-colors">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm">
            Load More
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
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