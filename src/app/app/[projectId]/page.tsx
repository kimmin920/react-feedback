import React from 'react';

function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  return <div>{params.projectId}</div>;
}

export default ProjectDetailPage;
