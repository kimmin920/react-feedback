import Feedback from '@/app/(editor)/feedback-editor/components/feedback';
import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/feedback-button.css';

const FeedbackButton: React.FC<{ pid: string }> = ({ pid }) => {
  return (
    <Feedback
      projectId={pid}
      designConfig={{
        actions: 'FACE',
      }}
      customTexts={{
        popupButtonTitle: 'give us feedback!',
        submitButtonTitle: 'submit!',
        textAreaPlaceholder: 'feedback...',
      }}
    />
  );
};

// 전역 변수로 노출
(window as any).FeedbackButton = FeedbackButton;

// DOM에 렌더링하는 함수
function renderFeedbackButton(containerId: string) {
  const container = document.getElementById(containerId);
  const pid = container?.dataset.projectId ?? '';
  console.log(pid);
  if (container) {
    const root = createRoot(container);
    root.render(<FeedbackButton pid={pid} />);
  }
}

// 전역 함수로 노출
(window as any).renderFeedbackButton = renderFeedbackButton;

export default FeedbackButton;
