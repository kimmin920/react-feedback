'use client';

import { Suspense, useState } from 'react';
import Feedback, { FeedbackActionDesignType } from './components/feddback';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ThemeCustomizer } from '@/components/theme-customizer';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeWrapper } from '@/components/theme-wrapper';
import { Button } from '@/components/ui/button';
import { ThemeProvider, useTheme } from 'next-themes';
import { useConfig } from '@/hooks/use-config';
import { themes } from '@/registry/themes';

export default function FeedbackEditorPage() {
  const [actionDesignType, setActionDesignType] =
    useState<FeedbackActionDesignType>('FACE');

  const onChangeActionDesign = (value: FeedbackActionDesignType) => {
    setActionDesignType(value);
  };

  const { theme: mode } = useTheme();
  const [config] = useConfig();

  const theme = themes.find((theme) => theme.name === config.theme);

  return (
    <ResizablePanelGroup direction='horizontal' className='rounded-lg border'>
      <ResizablePanel defaultSize={25} minSize={5}>
        <ThemeWrapper>
          <div className='flex h-full items-center justify-center p-6'>
            <RadioGroup
              defaultValue='FACE'
              onValueChange={onChangeActionDesign}
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='FACE' id='FACE' />
                <Label htmlFor='FACE'>FACES</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='STAR' id='STAR' />
                <Label htmlFor='STAR'>STARS</Label>
              </div>
            </RadioGroup>

            <TooltipProvider>
              <ThemeCustomizer />
            </TooltipProvider>
          </div>
        </ThemeWrapper>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <ThemeWrapper>
          <div className='flex h-full items-center justify-center p-6'>
            <Feedback
              designConfig={{
                actions: actionDesignType,
              }}
            />
          </div>
        </ThemeWrapper>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
