'use client';

import React from 'react';
import FeedbackActionsFaces from './feedback-actions-faces';
import FeedbackActionsStars from './feedback-acions-stars';
import { FeedbackActionDesignType } from './feddback';

function FeedbackActionsMatcher({ type }: { type: FeedbackActionDesignType }) {
  switch (type) {
    case 'FACE':
      return <FeedbackActionsFaces />;
    case 'STAR':
      return <FeedbackActionsStars />;
    default:
      return <></>;
  }
}

export default FeedbackActionsMatcher;
