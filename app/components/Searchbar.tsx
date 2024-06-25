'use client'
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { useState } from 'react'

const isValidAmazonProductUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')) {
      return true
    }
  } catch (error) {
    return false
  }
  return false
}

function Searchbar() {

  const [searchPromt, setSearchPromt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValidLink = isValidAmazonProductUrl(searchPromt)
    if (!isValidLink) {
      alert('Ingresa un link válido de Amazon')
      return
    }

    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPromt);
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPromt}
        onChange={(e) => setSearchPromt(e.target.value)}
        placeholder="Ingresa el link del producto"
        className="searchbar-input"
      />
      <button
        className="searchbar-btn"
        type='submit'
        disabled={searchPromt === '' || isLoading}
      >
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  )
}

export default Searchbar
