import React from 'react';
import FeedbackItem from './feedback-item';
import { Skeleton } from '@/components/ui/skeleton';
import FeedbackItemSkeleton from './feedback-item-skeleton';
import { Feedback } from '@prisma/client';

type Props = {
  isLoading: boolean;
  isError: boolean;
  feedbacks: Feedback[];
};

function Skeletons() {
  return Array.from({ length: 10 }).map((_, index) => {
    return <FeedbackItemSkeleton key={index} />;
  });
}

function Feedbacks({ feedbacks, isLoading, isError }: Props) {
  if (isLoading) {
    return <Skeletons />;
  }

  if (isError) {
    return <div>Error. Please try again!</div>;
  }

  return (
    <>
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          id={feedback.id}
          screenshotSrc={feedback.imageSrc}
          text={feedback.content}
          type={feedback.type}
          page={'need to update'}
          device={feedback.device}
          createdAt={feedback.createdAt}
          isArchived={feedback.isArchived}
        />
      ))}
    </>
  );
}

export default Feedbacks;
