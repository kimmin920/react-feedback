'use client';

import React, { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import FaceFantastic from '@/components/icons/face-fantastic';
import FaceNormal from '@/components/icons/face-normal';
import FaceSad from '@/components/icons/face-sad';
import FaceCry from '@/components/icons/face-cry';
import { useFormContext } from 'react-hook-form';

function FeedbackActionsFaces() {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // Destructure register from useFormContext

  return (
    <div className='flex'>
      <div>
        <input
          {...register('rate')} // Register the input with 'rate'
          type='radio'
          value='5' // Set value to match numeric rating
          id='five' // Provide an id for the label
          className='peer hidden' // Hide the default radio button
        />
        <RadioLabel
          htmlFor='five'
          className='peer-checked:text-sky-600 peer-checked:bg-sky-100'
        >
          <FaceFantastic />
        </RadioLabel>
      </div>

      <div>
        <input
          {...register('rate')} // Register the input with 'rate'
          type='radio'
          value='4' // Set value to match numeric rating
          id='four'
          className='peer hidden'
        />
        <RadioLabel
          htmlFor='four'
          className='peer-checked:text-sky-600 peer-checked:bg-sky-100'
        >
          <FaceNormal />
        </RadioLabel>
      </div>

      <div>
        <input
          {...register('rate')} // Register the input with 'rate'
          type='radio'
          value='3' // Set value to match numeric rating
          id='three'
          className='peer hidden'
        />
        <RadioLabel
          htmlFor='three'
          className='peer-checked:text-sky-600 peer-checked:bg-sky-100'
        >
          <FaceSad />
        </RadioLabel>
      </div>

      <div>
        <input
          {...register('rate')} // Register the input with 'rate'
          type='radio'
          value='2' // Set value to match numeric rating
          id='two'
          className='peer hidden'
        />
        <RadioLabel
          htmlFor='two'
          className='peer-checked:text-sky-600 peer-checked:bg-sky-100'
        >
          <FaceSad />
        </RadioLabel>
      </div>

      <div>
        <input
          {...register('rate')} // Register the input with 'rate'
          type='radio'
          value='1' // Set value to match numeric rating
          id='one'
          className='peer hidden'
        />
        <RadioLabel
          htmlFor='one'
          className='peer-checked:text-sky-600 peer-checked:bg-sky-100'
        >
          <FaceCry />
        </RadioLabel>
      </div>
    </div>
  );
}

function RadioLabel({
  htmlFor,
  children,
  className,
}: {
  htmlFor: string;
  children: ReactNode;
  className: string;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className={clsx(
        'rounded-full w-[32px] h-[32px] p-0 text-zinc-500 hover:text-sky-600 hover:bg-accent flex justify-center items-center hover:cursor-pointer',
        className
      )}
    >
      {children}
    </Label>
  );
}

export default FeedbackActionsFaces;
