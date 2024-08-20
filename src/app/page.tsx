'use client'
import React from 'react';
import { Cover } from '@/components/ui/cover';
import HomeHeader from './components/home-header';
import HomeFooter from './components/home-footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RocketIcon } from '@radix-ui/react-icons';
import './style.css';
import { DashboardExample } from '@/components/examples/dashboard';
import { MockBrowser } from '@/components/ui/mock-browser';

export default function HomePage() {
  return (
    <>
      <div className='fixed -z-10'>
        <div className='blob-cont'>
          <div className='yellow blob'></div>
          <div className='red blob'></div>
          <div className='green blob'></div>
        </div>
      </div>

      <HomeHeader />

      <div className='flex-col w-full h-full flex justify-center items-center my-11'>
        <div className='w-full px-4 md:px-20'>
          <div className='hero flex flex-col justify-center items-center py-16'>
            <h1 className='text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
              Build Products Loved by Users <br /> with{' '}
              <Cover className='bg-opacity-30'>Feedback.space</Cover>
            </h1>

            <p className='mt-4 md:mt-6 text-[#707070] max-w-[600px] text-center'>
              Easily collect, manage, and customize user feedback with
              Feedback.space. Designed to streamline your feedback process, our
              service lets you tailor the feedback component&apos;s design to
              perfectly match your brand.
            </p>

            <div className='mt-8'>
              <Link href='/app'>
                <Button>
                  <RocketIcon className='mr-2 h-4 w-4' />
                  TRY IT FOR FREE
                </Button>
              </Link>
            </div>

            <p className='text-xs text-[#707070] mt-6'>Give it a try here</p>

            <svg
              width='15'
              height='15'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='text-[#707070] w-4 h-4 mt-6 animate-slide-down'
            >
              <path
                d='M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z'
                fill='currentColor'
                fill-rule='evenodd'
                clip-rule='evenodd'
              ></path>
            </svg>

            <MockBrowser className='mt-8'>
              <DashboardExample />
            </MockBrowser>
          </div>
        </div>
      </div>

      <HomeFooter />

      {/* NOTE: hidden */}
      <svg className='hidden'>
        <filter id='noiseFilter'>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.6'
            stitchTiles='stitch'
          />
          <feColorMatrix
            in='colorNoise'
            type='matrix'
            values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'
          />
          <feComposite operator='in' in2='SourceGraphic' result='monoNoise' />
          <feBlend in='SourceGraphic' in2='monoNoise' mode='screen' />
        </filter>
      </svg>
    </>
  );
}
