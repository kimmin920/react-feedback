import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

async function getProjects(id?: string) {
  const supabase = createClient();

  const { data, error } = await supabase.from('projects').select();

  if (data && data.length > 0) {
    if (id) {
      redirect(`app/${id}`);
    }

    redirect(`app/${data[0].id}`);
  }

  return data;
}

async function AppPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { projectId: string };
}) {
  await getProjects(searchParams.projectId);
  return <div>No Projects yet! Create now!</div>;
}

export default AppPage;
