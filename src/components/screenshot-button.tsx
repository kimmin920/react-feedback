import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from './ui/button';
import { Camera, CircleAlert, LoaderCircle, XIcon } from 'lucide-react';
import Image from 'next/image';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';

type StatusType = 'PENDING' | 'LOADING' | 'SUCCESS' | 'FAILED';

function ScreenshotButton() {
  const [status, setStatus] = useState<StatusType>('PENDING');
  const [img, setImg] = useState('');

  const takeScreenshot = async () => {
    if (status === 'LOADING') {
      return;
    }

    setStatus('LOADING');

    try {
      const canvas = await html2canvas(document.querySelector('main')!);
      const imgData = canvas.toDataURL('image/png');

      const base64Data = imgData.split(',')[1]; // Remove data URL part if present
      const blob = base64ToBlob(base64Data, 'image/png');

      setImg(imgData);

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

      setImg(data.publicUrl);

      setStatus('SUCCESS');
    } catch (error) {
      console.error(error);
      setStatus('FAILED');
    }
  };

  const onClickDeleteImage: React.MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();
    setImg('');
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

        <a target='_blank' href={img} rel='noopener noreferrer'>
          <Image
            src={img}
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
