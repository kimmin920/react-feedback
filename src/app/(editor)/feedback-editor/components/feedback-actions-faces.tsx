import React, { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import FaceFantastic from '@/components/icons/face-fantastic';
import FaceNormal from '@/components/icons/face-normal';
import FaceSad from '@/components/icons/face-sad';
import FaceCry from '@/components/icons/face-cry';

function FeedbackActionsFaces() {
  return (
    <div className='flex '>
      <>
        <input
          name='feedback-action'
          type='radio'
          className='peer/5'
          value='five'
          id='five'
          hidden
        />
        <RadioLabel
          htmlFor='five'
          className='peer-checked/5:text-sky-600 peer-checked/5:bg-sky-100'
        >
          <FaceFantastic />
        </RadioLabel>
      </>

      <>
        <input
          name='feedback-action'
          type='radio'
          className='peer/4'
          value='four'
          id='four'
          hidden
        />
        <RadioLabel
          htmlFor='four'
          className='peer-checked/4:text-sky-600 peer-checked/4:bg-sky-100'
        >
          <FaceNormal />
        </RadioLabel>
      </>

      <>
        {/* <input
          name='feedback-action'
          type='radio'
          className='peer/3'
          value='three'
          id='three'
          hidden
        />
        <RadioLabel
          htmlFor='three'
          className='peer-checked/3:text-sky-600 peer-checked/3:bg-sky-100'
        >
          <FaceSad />
        </RadioLabel> */}
      </>

      <>
        <input
          name='feedback-action'
          type='radio'
          className='peer/2'
          value='two'
          id='two'
          hidden
        />
        <RadioLabel
          htmlFor='two'
          className='peer-checked/2:text-sky-600 peer-checked/2:bg-sky-100'
        >
          <FaceSad />
        </RadioLabel>
      </>

      <>
        <input
          name='feedback-action'
          type='radio'
          className='peer/1'
          value='one'
          id='one'
          hidden
        />
        <RadioLabel
          htmlFor='one'
          className='peer-checked/1:text-sky-600 peer-checked/1:bg-sky-100'
        >
          <FaceCry />
        </RadioLabel>
      </>
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
        'rounded-full w-[32px] h-[32px] p-0 text-zinc-500 hover:text-sky-600 hover:fill-sky-600 hover:bg-accent flex justify-center items-center hover:cursor-pointer',
        className
      )}
    >
      {children}
    </Label>
  );
}
export default FeedbackActionsFaces;
