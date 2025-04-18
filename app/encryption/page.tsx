'use client'

import { useState } from 'react'
import useAuthRedirect from '@/app/lib/useAuthRedirect'
import {
  Shield, Lock, Unlock, Image, Hash, Key, FileUp, Download, RefreshCw
} from 'lucide-react'

export default function EncryptionPage() {
  useAuthRedirect()

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('steganography')

  const [stegoCarrier, setStegoCarrier] = useState(null)
  const [stegoMessage, setStegoMessage] = useState(null)
  const [stegoStartBit, setStegoStartBit] = useState(0)
  const [stegoPeriod, setStegoPeriod] = useState(1)
  const [stegoMode, setStegoMode] = useState('')
  const [extractMode, setExtractMode] = useState(false)
  const [messageLength, setMessageLength] = useState(0)

  const [aesFile, setAesFile] = useState(null)
  const [aesPassword, setAesPassword] = useState('')
  const [aesKeySize, setAesKeySize] = useState(128)
  const [aesMode, setAesMode] = useState('CBC')
  const [aesIv, setAesIv] = useState('')
  const [aesEncryptMode, setAesEncryptMode] = useState(true)

  const [hashFile, setHashFile] = useState(null)
  const [hashAlgorithm, setHashAlgorithm] = useState('sha256')
  const [hashResult, setHashResult] = useState('')

  const [rsaFile, setRsaFile] = useState(null)
  const [rsaPublicKey, setRsaPublicKey] = useState('')
  const [rsaPrivateKey, setRsaPrivateKey] = useState('')
  const [rsaEncryptMode, setRsaEncryptMode] = useState(true)

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files?.[0]
    if (file) setter(file)
  }

  const makeFormData = (entries) => {
    const formData = new FormData()
    entries.forEach(([key, val]) => val && formData.append(key, val))
    return formData
  }

  const fetchBlob = async (url, formData) => {
    const res = await fetch(url, { method: 'POST', body: formData })
    if (!res.ok) throw new Error((await res.json()).error)
    return await res.blob()
  }

  const fetchJSON = async (url, formData) => {
    const res = await fetch(url, { method: 'POST', body: formData })
    if (!res.ok) throw new Error((await res.json()).error)
    return await res.json()
  }

  const handleSteganography = async () => {
    try {
      setLoading(true)
      const formData = makeFormData([
        ['carrier', stegoCarrier],
        ['start_bit', stegoStartBit],
        ['period', stegoPeriod],
        ['mode', stegoMode],
        extractMode ? ['message_length', messageLength || ''] : ['message', stegoMessage]
      ])

      const endpoint = extractMode ? 'http://localhost:5328/api/extractImage' : 'http://localhost:5328/api/embedImage'
      const blob = await fetchBlob(endpoint, formData)
      const url = URL.createObjectURL(blob)

      setResult({
        type: "download",
        url,
        filename: extractMode ? 'extracted_message.png' : 'embedded_image.png'
      })
    } catch (e) {
      setResult({ type: 'error', message: e.message })
    } finally {
      setLoading(false)
    }
  }

  const handleAesOperation = async () => {
    try {
      setLoading(true)
      const formData = makeFormData([
        ['file', aesFile],
        ['password', aesPassword],
        ['key_size', aesKeySize],
        ['mode', aesMode],
        ...(!aesEncryptMode ? [['iv', aesIv]] : [])
      ])

      const endpoint = aesEncryptMode ? 'http://localhost:5328/encrypt/aes' : 'http://localhost:5328/decrypt/aes'
      const response = aesEncryptMode ? await fetchJSON(endpoint, formData) : await fetchBlob(endpoint, formData)

      setResult(
        aesEncryptMode
          ? { type: 'aes-encrypt', downloadUrl: response.download_url, iv: response.iv }
          : { type: 'download', url: URL.createObjectURL(response), filename: aesFile.name.replace('.enc', '') }
      )
    } catch (e) {
      setResult({ type: 'error', message: e.message })
    } finally {
      setLoading(false)
    }
  }

  const handleHashFile = async () => {
    try {
      setLoading(true)
      const formData = makeFormData([
        ['file', hashFile],
        ['algorithm', hashAlgorithm]
      ])
      const { hash } = await fetchJSON('http://localhost:5328/hash', formData)
      setHashResult(hash)
      setResult({ type: 'hash', hash })
    } catch (e) {
      setResult({ type: 'error', message: e.message })
    } finally {
      setLoading(false)
    }
  }

  const handleRsaOperation = async () => {
    try {
      setLoading(true)
      const formData = makeFormData([
        ['file', rsaFile],
        rsaEncryptMode ? ['public_key', rsaPublicKey] : ['private_key', rsaPrivateKey]
      ])
      const endpoint = rsaEncryptMode ? 'http://localhost:5328/encrypt/rsa' : 'http://localhost:5328/decrypt/rsa'
      const blob = await fetchBlob(endpoint, formData)
      const url = URL.createObjectURL(blob)
      setResult({
        type: 'download',
        url,
        filename: rsaEncryptMode ? `${rsaFile.name}.enc` : rsaFile.name.replace('.enc', '')
      })
    } catch (e) {
      setResult({ type: 'error', message: e.message })
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (url, filename) => {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
        <div className="flex items-center justify-center mb-6 space-x-2">
          <Shield className="text-indigo-600 h-6 w-6" />
          <h1 className="text-2xl font-bold text-gray-800">Cryptography Toolkit</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'steganography' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-600 hover:text-indigo-700'}`}
            onClick={() => setActiveTab('steganography')}
          >
            <div className="flex items-center space-x-2">
              <Image className="h-4 w-4" />
              <span>Steganography</span>
            </div>
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'aes' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-600 hover:text-indigo-700'}`}
            onClick={() => setActiveTab('aes')}
          >
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>AES</span>
            </div>
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'hash' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-600 hover:text-indigo-700'}`}
            onClick={() => setActiveTab('hash')}
          >
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4" />
              <span>Hash</span>
            </div>
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${activeTab === 'rsa' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-600 hover:text-indigo-700'}`}
            onClick={() => setActiveTab('rsa')}
          >
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <span>RSA</span>
            </div>
          </button>
        </div>

        {/* Steganography Tab */}
        {activeTab === 'steganography' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Image Steganography</h2>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center cursor-pointer">
                  <span className={`mr-2 ${!extractMode ? 'font-medium text-indigo-600' : 'text-gray-600'}`}>Embed</span>
                  <div className="relative">
                    <input type="checkbox" checked={extractMode} onChange={() => setExtractMode(!extractMode)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                  </div>
                  <span className={`ml-2 ${extractMode ? 'font-medium text-indigo-600' : 'text-gray-600'}`}>Extract</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Carrier Image</label>
                  <div className="flex items-center">
                    <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-all duration-200 cursor-pointer">
                      <div className="flex flex-col items-center">
                        <FileUp className="w-8 h-8 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">
                          {stegoCarrier ? stegoCarrier.name : 'Select carrier image'}
                        </span>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange(setStegoCarrier)} />
                    </label>
                  </div>
                </div>

                {!extractMode && (
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Message File (Image/Text)</label>
                    <div className="flex items-center">
                      <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-all duration-200 cursor-pointer">
                        <div className="flex flex-col items-center">
                          <FileUp className="w-8 h-8 text-gray-400" />
                          <span className="mt-2 text-sm text-gray-500">
                            {stegoMessage ? stegoMessage.name : 'Select message file'}
                          </span>
                        </div>
                        <input type="file" className="hidden" onChange={handleFileChange(setStegoMessage)} />
                      </label>
                    </div>
                  </div>
                )}

                {extractMode && (
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Message Length (optional)</label>
                    <input
                      type="number"
                      min="0"
                      value={messageLength}
                      onChange={(e) => setMessageLength(parseInt(e.target.value) || 0)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Start Bit</label>
                  <input
                    type="number"
                    min="0"
                    value={stegoStartBit}
                    onChange={(e) => setStegoStartBit(parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Period</label>
                  <input
                    type="number"
                    min="1"
                    value={stegoPeriod}
                    onChange={(e) => setStegoPeriod(parseInt(e.target.value) || 1)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Mode (Optional)</label>
                  <input
                    type="text"
                    value={stegoMode}
                    onChange={(e) => setStegoMode(e.target.value)}
                    placeholder="Leave empty for default"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleSteganography}
                disabled={loading || !stegoCarrier || (!extractMode && !stegoMessage)}
              >
                {loading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : extractMode ? (
                  <Image className="mr-2 h-4 w-4" />
                ) : (
                  <Image className="mr-2 h-4 w-4" />
                )}
                {extractMode ? 'Extract Message' : 'Embed Message'}
              </button>
            </div>
          </div>
        )}

        {/* AES Tab */}
        {activeTab === 'aes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">AES Encryption</h2>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center cursor-pointer">
                  <span className={`mr-2 ${aesEncryptMode ? 'font-medium text-indigo-600' : 'text-gray-600'}`}>Encrypt</span>
                  <div className="relative">
                    <input type="checkbox" checked={!aesEncryptMode} onChange={() => setAesEncryptMode(!aesEncryptMode)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                  </div>
                  <span className={`ml-2 ${!aesEncryptMode ? 'font-medium text-indigo-600' : 'text-gray-600'}`}>Decrypt</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">File to {aesEncryptMode ? 'Encrypt' : 'Decrypt'}</label>
                  <div className="flex items-center">
                    <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-all duration-200 cursor-pointer">
                      <div className="flex flex-col items-center">
                        <FileUp className="w-8 h-8 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">
                          {aesFile ? aesFile.name : `Select file to ${aesEncryptMode ? 'encrypt' : 'decrypt'}`}
                        </span>
                      </div>
                      <input type="file" className="hidden" onChange={handleFileChange(setAesFile)} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={aesPassword}
                    onChange={(e) => setAesPassword(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                    placeholder="Enter password for encryption/decryption"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Key Size</label>
                  <select
                    value={aesKeySize}
                    onChange={(e) => setAesKeySize(parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  >
                    <option value="128">128 bits</option>
                    <option value="192">192 bits</option>
                    <option value="256">256 bits</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Mode</label>
                  <select
                    value={aesMode}
                    onChange={(e) => setAesMode(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  >
                    <option value="CBC">CBC</option>
                    <option value="ECB">ECB</option>
                    <option value="CFB">CFB</option>
                    <option value="OFB">OFB</option>
                    <option value="CTR">CTR</option>
                  </select>
                </div>

                {!aesEncryptMode && (
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Initialization Vector (IV)</label>
                    <input
                      type="text"
                      value={aesIv}
                      onChange={(e) => setAesIv(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                      placeholder="Paste the IV from encryption"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleAesOperation}
                disabled={loading || !aesFile || !aesPassword || (!aesEncryptMode && !aesIv)}
              >
                {loading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : aesEncryptMode ? (
                  <Lock className="mr-2 h-4 w-4" />
                ) : (
                  <Unlock className="mr-2 h-4 w-4" />
                )}
                {aesEncryptMode ? 'Encrypt File' : 'Decrypt File'}
              </button>
            </div>
          </div>
        )}

        {/* Hash Tab */}
        {activeTab === 'hash' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">File Hashing</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">File to Hash</label>
                <div className="flex items-center">
                  <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-all duration-200 cursor-pointer">
                    <div className="flex flex-col items-center">
                      <FileUp className="w-8 h-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">
                        {hashFile ? hashFile.name : 'Select file to hash'}
                      </span>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileChange(setHashFile)} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Hash Algorithm</label>
                <select
                  value={hashAlgorithm}
                  onChange={(e) => setHashAlgorithm(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                >
                  <option value="md5">MD5</option>
                  <option value="sha1">SHA-1</option>
                  <option value="sha256">SHA-256</option>
                  <option value="sha384">SHA-384</option>
                  <option value="sha512">SHA-512</option>
                </select>
              </div>
            </div>

            {hashResult && (
              <div className="mt-4">
                <label className="block mb-2 font-medium text-gray-700">Hash Result</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 break-all font-mono text-sm">
                  {hashResult}
                </div>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <button
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleHashFile}
                disabled={loading || !hashFile}
              >
                {loading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Hash className="mr-2 h-4 w-4" />
                )}
                Generate Hash
              </button>
            </div>
          </div>
        )}

        {/* RSA Tab */}
        {activeTab === 'rsa' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">RSA Encryption</h2>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center cursor-pointer">
                  <span className={`mr-2 ${rsaEncryptMode ? 'font-medium text-indigo-600' : 'text-gray-600'}`}>Encrypt</span>
                  <div className="relative">
                    <input type="checkbox" checked={!rsaEncryptMode} onChange={() => setRsaEncryptMode(!rsaEncryptMode)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
                  </div>
                  <span className={`ml-2 ${!rsaEncryptMode ? 'font-medium text-indigo-600' : 'text-gray-600'}`}>Decrypt</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">File to {rsaEncryptMode ? 'Encrypt' : 'Decrypt'}</label>
                <div className="flex items-center">
                  <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-all duration-200 cursor-pointer">
                    <div className="flex flex-col items-center">
                      <FileUp className="w-8 h-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">
                        {rsaFile ? rsaFile.name : `Select file to ${rsaEncryptMode ? 'encrypt' : 'decrypt'}`}
                      </span>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileChange(setRsaFile)} />
                  </label>
                </div>
              </div>

              {rsaEncryptMode ? (
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Public Key</label>
                  <textarea
                    value={rsaPublicKey}
                    onChange={(e) => setRsaPublicKey(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm h-32"
                    placeholder="Paste RSA public key here..."
                  />
                </div>
              ) : (
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Private Key</label>
                  <textarea
                    value={rsaPrivateKey}
                    onChange={(e) => setRsaPrivateKey(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm h-32"
                    placeholder="Paste RSA private key here..."
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleRsaOperation}
                disabled={loading || !rsaFile || (rsaEncryptMode && !rsaPublicKey) || (!rsaEncryptMode && !rsaPrivateKey)}
              >
                {loading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : rsaEncryptMode ? (
                  <Lock className="mr-2 h-4 w-4" />
                ) : (
                  <Unlock className="mr-2 h-4 w-4" />
                )}
                {rsaEncryptMode ? 'Encrypt File' : 'Decrypt File'}
              </button>
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Results</h3>

            {result.type === 'error' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <p>Error: {result.message}</p>
              </div>
            )}

            {result.type === 'download' && (
              <div className="flex flex-col items-center">
                <p className="text-gray-700 mb-4">Your file is ready for download:</p>
                <button
                  onClick={() => handleDownload(result.url, result.filename)}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download {result.filename}
                </button>
              </div>
            )}

            {result.type === 'aes-encrypt' && (
              <div className="space-y-4">
                <p className="text-gray-700">Your file has been encrypted successfully. Please save the IV value below, you'll need it for decryption:</p>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Initialization Vector (IV)</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={result.iv}
                      readOnly
                      className="flex-grow p-3 border border-gray-200 rounded-l-lg bg-gray-100"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(result.iv)
                        alert('IV copied to clipboard')
                      }}
                      className="p-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r-lg transition-colors duration-200"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => handleDownload(result.downloadUrl, 'encrypted_file.enc')}
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Encrypted File
                  </button>
                </div>
              </div>
            )}

            {result.type === 'hash' && (
              <div>
                <p className="text-gray-700 mb-2">Hash generated successfully:</p>
                <div className="p-3 bg-gray-100 rounded-lg border border-gray-200 break-all font-mono text-sm">
                  {result.hash}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result.hash)
                    alert('Hash copied to clipboard')
                  }}
                  className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                >
                  Copy to clipboard
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}