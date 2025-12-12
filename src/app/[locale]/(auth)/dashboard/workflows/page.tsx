import { getTranslations } from 'next-intl/server';

import { TitleBar } from '@/features/dashboard/TitleBar';
import WorkflowEditor from '@/features/workflows/WorkflowEditor';

export async function generateMetadata() {
  const t = await getTranslations('Workflows');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const WorkflowsPage = () => {
  return (
    <>
      <TitleBar
        title="Workflow Editor"
        description="Create and manage your automated workflows with our visual editor"
      />

      <div className="mt-6">
        <WorkflowEditor />
      </div>
    </>
  );
};

export default WorkflowsPage;
