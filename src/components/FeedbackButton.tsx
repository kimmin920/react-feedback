import MainFeedback, {
  FeedbackActionDesignType,
  FeedbackDesignType,
} from '@/app/(editor)/feedback-editor/components/main-feedback';
import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/feedback-button.css';

const validRateDesignTypes: FeedbackActionDesignType[] = ['FACE', 'STAR'];
const validFeedbackDesignType: FeedbackDesignType[] = ['HUMPBACK', 'ORCA'];

function renderFeedbackButton(container: HTMLElement) {
  const pid = container?.dataset.projectId ?? '';
  const designType = container?.dataset.designType ?? 'HUMPBACK';
  const rateDesignType = container?.dataset.rateDesignType ?? 'FACE';

  if (!pid) {
    console.error(`Invalid project-id: Expected correct data-project-id`);
    return;
  }

  if (!validFeedbackDesignType.includes(designType as any)) {
    console.error(
      `Invalid design type: ${rateDesignType}. Expected 'FACE' or 'STAR'.`
    );
    return;
  }

  if (!validRateDesignTypes.includes(rateDesignType as any)) {
    console.error(
      `Invalid design type: ${rateDesignType}. Expected 'FACE' or 'STAR'.`
    );
    return;
  }

  const popupButtonTitle = container?.dataset.popupButtonTitle ?? 'Feedback';
  const submitButtonTitle = container?.dataset.submitButtonTitle ?? 'Submit';
  const textAreaPlaceholder =
    container?.dataset.placeHolder ?? 'feedback here...';

  if (container) {
    const root = createRoot(container);
    root.render(
      <MainFeedback
        defaultOpen={false}
        projectId={pid}
        designConfig={{
          type: designType as FeedbackDesignType,
          actions: rateDesignType as FeedbackActionDesignType,
        }}
        customTexts={{
          popupButtonTitle,
          submitButtonTitle,
          textAreaPlaceholder,
        }}
      />
    );
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const container = document.getElementById('feedback-io');
  
    if (!container) {
      console.error(
        "feedback-io Not Found: Expected element with 'id=feedback-io'"
      );
      return;
    }
  
    renderFeedbackButton(container);
  });
}

export default MainFeedback;
