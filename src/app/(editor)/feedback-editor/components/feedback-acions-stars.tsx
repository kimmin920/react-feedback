'use client';

import React, { Fragment, ReactNode, useState } from 'react';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import { Star } from 'lucide-react';
import { useFormState } from 'react-dom';
import { RadioGroup } from '@/components/ui/radio-group';
import { useFormContext } from 'react-hook-form';

function FeedbackActionsStars() {
  const [value, setValue] = useState(5);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const onChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;

    setValue(Number(target.value));
  };

  return (
    <RadioGroup onChange={onChange}>
      <div className='flex'>
        <>
          {['1', '2', '3', '4', '5'].map((each) => (
            <Fragment key={each}>
              <input
                {...register('rate')} // Register the input with 'rate'
                type='radio'
                value={each} // Set value to match numeric rating
                id={each}
                hidden
              />
              <RadioLabel htmlFor={each}>
                <Star
                  className={clsx(
                    value >= Number(each) &&
                      'fill-yellow-400 stroke-yellow-400',
                    'stroke-1'
                  )}
                />
              </RadioLabel>
            </Fragment>
          ))}
        </>
      </div>
    </RadioGroup>
  );
}

function RadioLabel({
  htmlFor,
  children,
  className,
}: {
  htmlFor: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className={clsx(
        'rounded-full w-[24px] h-[24px] p-0 text-zinc-500 hover:text-yellow-400 flex justify-center items-center hover:cursor-pointer',
        className
      )}
    >
      {children}
    </Label>
  );
}
export default FeedbackActionsStars;
