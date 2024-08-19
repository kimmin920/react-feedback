import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from './ui/button';
import { Camera, CircleAlert, LoaderCircle, XIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@utils/supabase/client';
import { useFormContext } from 'react-hook-form';
import { FeedbackData } from '@/app/(editor)/feedback-editor/components/main-feedback';

type StatusType = 'PENDING' | 'LOADING' | 'SUCCESS' | 'FAILED';

function ScreenshotButton({ targetElementId }: { targetElementId?: string }) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FeedbackData>();

  const [status, setStatus] = useState<StatusType>('PENDING');
  const imgSrc = watch('imageSrc');

  const takeScreenshot = async () => {
    if (status === 'LOADING') {
      return;
    }

    setStatus('LOADING');

    try {
      const target = targetElementId
        ? document.getElementById(targetElementId)
        : document.body;

      const options = targetElementId
        ? undefined
        : {
            x: window.scrollX,
            y: window.scrollY,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
          };

      const style = document.createElement('style');

      document.head.appendChild(style);

      style.sheet?.insertRule(
        'body > div:last-child img { display: inline-block; }'
      );

      const canvas = await html2canvas(target, options);
      style.remove();

      const imgData = canvas.toDataURL('image/png');

      const base64Data = imgData.split(',')[1]; // Remove data URL part if present
      const blob = base64ToBlob(base64Data, 'image/png');

      const supabase = createClient();

      const id = uuidv4();
      const fileName = `public/${id}.png`;

      const { error } = await supabase.storage
        .from('feedback-image')
        .upload(fileName, blob, {
          cacheControl: '3600',
          upsert: false,
        });

      const { data } = supabase.storage
        .from('feedback-image')
        .getPublicUrl(fileName);

      if (error) {
        setStatus('FAILED');
        return;
      }

      setValue('imageSrc', data.publicUrl);
      setStatus('SUCCESS');
    } catch (error) {
      console.error(error);
      setStatus('FAILED');
    }
  };

  const onClickDeleteImage: React.MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();
    setValue('imageSrc', '');
    setStatus('PENDING');
  };

  if (status === 'SUCCESS') {
    return (
      <div className='relative w-[40px] h-[40px] rounded-md'>
        <XIcon
          size='16'
          className='absolute -right-1 -top-1 rounded-full bg-destructive stroke-white p-0.5 cursor-pointer'
          onClick={onClickDeleteImage}
        />

        <a target='_blank' href={imgSrc ?? ''} rel='noopener noreferrer'>
          <img
            src={imgSrc ?? ''}
            alt='screen-shot'
            width={50}
            height={50}
            className='w-full h-full rounded-md border-2 border-border'
          />
        </a>
      </div>
    );
  }

  return (
    <Button type='button' size='icon' onClick={takeScreenshot}>
      {status === 'LOADING' ? <LoaderCircle className='animate-spin' /> : <></>}
      {status === 'PENDING' ? <Camera size='16' /> : <></>}
      {status === 'FAILED' ? <CircleAlert size='16' /> : <></>}
    </Button>
  );
}

function base64ToBlob(base64: any, mimeType: any) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

export default ScreenshotButton;
