import { getAllProducts } from '@/lib/actions';
import Image from 'next/image'
import React from 'react'
import Searchbar from './components/Searchbar';
import HeroCarousel from './components/HeroCarousel';
import ProductCard from './components/ProductCard';

const Home = async () => {

  const allProducts = await getAllProducts();
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Las compras inteligentes comienzan aquí:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Desata el poder del <br />
              <span className="text-primary">Precio</span>
            </h1>
            <p className="mt-6">
              Potentes análisis de crecimiento y productos de autoservicio para
              ayudarle a convertir, atraer y retener más.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>
      <section className='trending-section'>
        <h2 className='section-text'>Tendencias</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {allProducts.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home
