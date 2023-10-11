'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/utils/store';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<Movie[]>([]);
  const {totalItems,addToCart} = useCartStore();
  const handleCart = (item: Movie) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: 100,  
      quantity: 1,  
    });
  };



  useEffect(() => {
    const fetchData = async () => {
      if (query.length === 0 || query.length > 0) {
        try {
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGFmZmNkMDAzNmU1Zjk2NmM0ZTkyZDkyYzhkYTg4NSIsInN1YiI6IjY1MjUxMDgyZDM5OWU2MDEwMDNlMDgyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jeSRAPuoQYwKK-X-mNUhkeVY6jvVt9ifRsLVZ0PsGJY',
            },
          };

          const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=a${query}&include_adult=true&language=en-US&page=1`,
            options
          );

          setData(res.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [query]);

  return (
    <main className='h-max min-h-[100vh]  bg-black text-white'>
      <div className="flex flex-col justify-center items-center">
        <div className='flex justify-between items-center p-4  bg-white/10 w-full'>
          <h1 className='text-5xl text-center font-bold'>M</h1>
          <div className='flex justify-center items-center gap-4 px-4'>
            <input
              className="p-2 border-2 rounded-md text-black"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            <Link href={'/cart'} className=" relative">
              <Image src={'/cart.svg'} width={20} height={20} alt="logo"/>
              <span className="animate-bounce bg-red-600 text-white min-w-[1rem] h-4  rounded-[50%] absolute top-[-.75rem] right-[-.75rem] flex justify-center items-center">{totalItems}</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-10 justify-center  items-start mt-4  ">
          {data.map((item) => (
            <div key={item.id} className=" flex flex-col gap-1 justify-center items-center py-2 w-[250px] group">
              <div className='' >
                <img style={{borderRadius:'1rem'}} src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}  alt=""  />
              </div>
              <span className='group-hover:hidden py-2 text-center'>{item.original_title}</span>
              <button
              onClick={() => handleCart(item)}
              className="hidden group-hover:block   uppercase bg-white/30 text-white  p-2 rounded-md">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;

