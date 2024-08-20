'use client';

import {  useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import OrcaFeedback from './components/orca-feedback';
import MainFeedback, {
  FeedbackActionDesignType,
  FeedbackDesignType,
} from './components/main-feedback';

// Define the schema using zod
const formSchema = z.object({
  popupButtonTitle: z.string().min(1, 'Popup Button Title is required'),
  textAreaPlaceholder: z.string().min(1, 'Textarea Placeholder is required'),
  submitButtonTitle: z.string().min(1, 'Submit Button Title is required'),
});

type FormData = z.infer<typeof formSchema>;

export default function FeedbackEditorPage() {
  const [actionDesignType, setActionDesignType] =
    useState<FeedbackActionDesignType>('FACE');

  const onChangeActionDesign = (value: FeedbackActionDesignType) => {
    setActionDesignType(value);
  };

  const { theme: mode } = useTheme();
  const [config] = useConfig();

  const theme = themes.find((theme) => theme.name === config.theme);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      popupButtonTitle: 'Open feedback',
      submitButtonTitle: 'Submit',
      textAreaPlaceholder: 'Your feedback please...',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const popupButtonTitle = watch('popupButtonTitle');
  const textAreaPlaceholder = watch('textAreaPlaceholder');
  const submitButtonTitle = watch('submitButtonTitle');
  const [design, setDesign] = useState<FeedbackDesignType>('ORCA');

  const onChangeDesign = (value: FeedbackDesignType) => {
    setDesign(value);
  };

  return (
    <ResizablePanelGroup direction='horizontal' className='rounded-lg border'>
      <ResizablePanel defaultSize={25} minSize={5}>
        <ThemeWrapper>
          <div className='p-6'>
            <Select onValueChange={onChangeDesign} value={design}>
              <SelectTrigger>
                <SelectValue placeholder='Select a verified email to display' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='ORCA'>Orca</SelectItem>
                <SelectItem value='HUMPBACK'>Humpback</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col h-full items-center justify-center space-y-5 p-6'
          >
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

            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='popupButtonTitle'>Popup Button Title</Label>
              <Input
                id='popupButtonTitle'
                type='text'
                {...register('popupButtonTitle')}
              />
              {errors.popupButtonTitle && (
                <p className='text-red-500'>
                  {errors.popupButtonTitle.message}
                </p>
              )}
            </div>

            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='textAreaPlaceholder'>Textarea Placeholder</Label>
              <Input
                id='textAreaPlaceholder'
                type='text'
                {...register('textAreaPlaceholder')}
              />
              {errors.textAreaPlaceholder && (
                <p className='text-red-500'>
                  {errors.textAreaPlaceholder.message}
                </p>
              )}
            </div>

            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='submitButtonTitle'>Submit Button Title</Label>
              <Input
                id='submitButtonTitle'
                type='text'
                {...register('submitButtonTitle')}
              />
              {errors.submitButtonTitle && (
                <p className='text-red-500'>
                  {errors.submitButtonTitle.message}
                </p>
              )}
            </div>

            <Button type='submit'>Save</Button>
          </form>
        </ThemeWrapper>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={75}
        className='bg-gradient-to-r from-white to-blue-200'
      >
        <ThemeWrapper>
          <div className='flex h-full items-center justify-center p-6'>
            <MainFeedback
              designConfig={{
                type: design,
                actions: actionDesignType,
              }}
              customTexts={{
                popupButtonTitle,
                submitButtonTitle,
                textAreaPlaceholder,
              }}
              projectId={'beec733b-6e91-41f4-ba91-0a77354d8532'}
              defaultOpen={true}
            />
          </div>
        </ThemeWrapper>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
