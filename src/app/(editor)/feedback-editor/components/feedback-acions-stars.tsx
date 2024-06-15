import React, { Fragment, ReactNode, useState } from 'react';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import { Star } from 'lucide-react';
import { useFormState } from 'react-dom';
import { RadioGroup } from '@/components/ui/radio-group';

function FeedbackActionsStars() {
  const [value, setValue] = useState(5);

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
                name='feedback-action'
                type='radio'
                value={each}
                id={each}
                hidden
              />
              <RadioLabel htmlFor={each}>
                <Star
                  className={clsx(
                    value >= Number(each) && 'fill-yellow-400 stroke-yellow-400'
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
