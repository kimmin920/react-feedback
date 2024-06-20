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
import { Delete, XIcon } from 'lucide-react';

type FormStatusType = 'PENDING' | 'LOADING' | 'SUCCESS' | 'FAILED';

export type FeedbackEditorType = {
  designConfig: {
    actions: 'FACE' | 'STAR';
  };
  customTexts: {
    popupButtonTitle: string;
    submitButtonTitle: string;
    textAreaPlaceholder: string;
  };
};

export type FeedbackActionDesignType =
  FeedbackEditorType['designConfig']['actions'];

function FeedbackOrca({ designConfig, customTexts }: FeedbackEditorType) {
  const [step, setStep] = useState(0);

  const [status, setStatus] = useState<FormStatusType>('PENDING');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('LOADING');

    const formData = new FormData(e.currentTarget);
    const feedback = formData.get('feedback');

    try {
      const response = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      if (response.ok) {
        setStatus('SUCCESS');
      } else {
        setStatus('FAILED');
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setTimeout(() => {
        setStatus('PENDING');
      }, 2000);
    }
  };

  useEffect(() => {
    setIsPopoverOpen(true);
  }, []);

  const onClickFeedbackTypeButton = () => {
    setStep(1);
  };

  return (
    <div className='h-screen'>
      <Popover open={isPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline'>{customTexts.popupButtonTitle}</Button>
        </PopoverTrigger>

        <PopoverContent className='p-0 w-[340px] min-h-[197px] relative flex flex-col items-center justify-center'>
          {status === 'SUCCESS' ? (
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
          )}

          {status === 'PENDING' && step === 0 && (
            <div className='w-full flex-1 flex flex-col'>
              <div className='flex flex-row items-center justify-center'>
                What's on your mind?
                <Button variant='ghost' size='icon'>
                  <XIcon />
                </Button>
              </div>
              <div className='flex flex-row items-center flex-1'>
                <Button
                  className='flex-1'
                  variant='ghost'
                  onClick={onClickFeedbackTypeButton}
                >
                  <XIcon />
                </Button>
                <Button
                  className='flex-1'
                  variant='ghost'
                  onClick={onClickFeedbackTypeButton}
                >
                  <XIcon />
                </Button>
                <Button
                  className='flex-1'
                  variant='ghost'
                  onClick={onClickFeedbackTypeButton}
                >
                  <XIcon />
                </Button>
              </div>
            </div>
          )}

          {status === 'PENDING' && step === 1 && (
            <form
              className='w-full flex-1 space-y-3 grid'
              onSubmit={handleSubmit}
            >
              <div>
                <Button>
                  <Delete onClick={() => setStep(0)} />
                </Button>
              </div>
              <div className='p-2'>
                <Textarea
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
            </form>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FeedbackOrca;
