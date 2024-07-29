'use client';

import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import SuccessIcon from './success-icon';
import FailIcon from './fail-icon';
import FeedbackActionsMatcher from './feedback-actions-matcher';
import ScreenshotButton from '@/components/screenshot-button';

import { FeedbackComponentType, FeedbackEditorType } from './main-feedback';
import { Form, useFormContext } from 'react-hook-form';

function HumbpackFeedback({
  designConfig,
  customTexts,
  defaultOpen,
  onSubmit,
}: FeedbackComponentType) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  useEffect(() => {
    setIsPopoverOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <Popover
        open={isPopoverOpen}
        onOpenChange={(open) => setIsPopoverOpen(open)}
      >
        <PopoverTrigger asChild>
          <Button variant='outline'>{customTexts.popupButtonTitle}</Button>
        </PopoverTrigger>

        <PopoverContent className='p-0 w-[340px] min-h-[197px] relative flex flex-col items-center justify-center'>
          {/* {status === 'SUCCESS' ? (
            <div className='w-full h-full flex flex-col items-center gap-y-2 justify-center'>
              <SuccessIcon />
              {status === 'SUCCESS' && (
                <div className='flex flex-col items-center gap-y-1 justify-center'>
                  <p>Your feedback has been received!</p>
                  <p>Thank you for your help.</p>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}

          {status === 'FAILED' ? (
            <div className='w-full h-full flex flex-col items-center gap-y-2 justify-center'>
              <FailIcon />

              {status === 'FAILED' && (
                <div className='flex flex-col items-center justify-center'>
                  <p className='break-word'>Failed to submit feedback.</p>
                  <p> Please try again later. </p>
                </div>
              )}
            </div>
          ) : (
            <></>
          )} */}
          <Form
            className='w-full flex-1 space-y-3 grid'
            onSubmit={onSubmit}
            noValidate
          >
            <div className='p-2'>
              <Textarea
                {...register('content')}
                className='min-h-[100px] outline-none focus-visible:ring-transparent focus-visible:border-primary'
                placeholder={customTexts.textAreaPlaceholder}
              />
            </div>

            <div className='flex justify-between flex-row items-center border-t bg-muted/50 p-3'>
              <FeedbackActionsMatcher type={designConfig.actions} />

              <div className='flex space-x-2'>
                <ScreenshotButton />
                <Button type='submit' className='justify-self-end'>
                  {customTexts.submitButtonTitle}
                </Button>
              </div>
            </div>
          </Form>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default HumbpackFeedback;
