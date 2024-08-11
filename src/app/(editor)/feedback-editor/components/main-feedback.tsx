import { z } from 'zod';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import HumbpackFeedback from './humpback-feedback';
import OrcaFeedback from './orca-feedback';
import { createClient } from '@utils/supabase/client';
import SuccessIcon from './success-icon';
import FailIcon from './fail-icon';
import { getCurrentUrlPath, deviceDetector } from '../helpers';
import { Database } from '../../../../../database.types';

const feedbackSchema = z.object({
  content: z.string().min(1).max(500),
  rate: z.enum(['1', '2', '3', '4', '5']).nullable(),
  imageSrc: z.string().nullable(),
  device: z.string(),
  type: z.enum(['ISSUE', 'IDEA', 'OTHERS']),
});

export type FeedbackData = z.infer<typeof feedbackSchema>;

export type FeedbackDesignType = 'ORCA' | 'HUMPBACK';

export type FeedbackEditorType = {
  projectId: string;
  defaultOpen: boolean;
  designConfig: {
    type: FeedbackDesignType;
    actions: 'FACE' | 'STAR';
  };
  customTexts: {
    popupButtonTitle: string;
    submitButtonTitle: string;
    textAreaPlaceholder: string;
  };
};

export type FeedbackComponentType = FeedbackEditorType & {
  onSubmit: any;
};

export type FeedbackActionDesignType =
  FeedbackEditorType['designConfig']['actions'];

type FormStatusType = 'PENDING' | 'LOADING' | 'SUCCESS' | 'FAILED';

function MainFeedback({
  projectId,
  designConfig,
  customTexts,
  defaultOpen,
}: FeedbackEditorType) {
  const [status, setStatus] = useState<FormStatusType>('PENDING');

  const methods = useForm<FeedbackData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      content: '',
      rate: null,
      imageSrc: '',
      device: '',
      type: 'ISSUE',
    },
  });

  const onSubmit: SubmitHandler<FeedbackData> = async (formData) => {
    setStatus('LOADING');
    try {
      const supabase = createClient();
      const { content, rate, imageSrc, type } = formData;

      const { data, error } = await supabase
        .from('Feedback')
        .insert([
          {
            projectId,
            content,
            rate: rate ? Number(rate) : null,
            imageSrc: imageSrc ?? '',
            device: deviceDetector(),
            pageUrl: getCurrentUrlPath(),
            type,
          },
        ])
        .select();

      if (data) {
        setStatus('SUCCESS');
      } else {
        setStatus('FAILED');
        console.error('Failed to submit feedback:', error);
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      methods.reset();

      setTimeout(() => {
        setStatus('PENDING');
      }, 2000);
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className='w-full h-full flex flex-col items-center gap-y-2 justify-center'>
        <SuccessIcon />
        {status === 'SUCCESS' && (
          <div className='flex flex-col items-center gap-y-1 justify-center'>
            <p>Your feedback has been received!</p>
            <p>Thank you for your help.</p>
          </div>
        )}
      </div>
    );
  }

  if (status === 'FAILED') {
    return (
      <div className='w-full h-full flex flex-col items-center gap-y-2 justify-center'>
        <FailIcon />

        {status === 'FAILED' && (
          <div className='flex flex-col items-center justify-center'>
            <p className='break-word'>Failed to submit feedback.</p>
            <p> Please try again later. </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      {designConfig.type === 'HUMPBACK' && (
        <HumbpackFeedback
          projectId={projectId}
          defaultOpen={defaultOpen}
          designConfig={designConfig}
          customTexts={customTexts}
          onSubmit={methods.handleSubmit(onSubmit)}
        />
      )}

      {designConfig.type === 'ORCA' && (
        <OrcaFeedback
          projectId={projectId}
          defaultOpen={defaultOpen}
          designConfig={designConfig}
          customTexts={customTexts}
          onSubmit={methods.handleSubmit(onSubmit)}
        />
      )}
    </FormProvider>
  );
}

export default MainFeedback;
