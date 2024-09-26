import { ResponsiveAppShell } from '@/components/app-shell';
import ExpressionList from '@/components/expression/expression-listing';

import { mockExpressions } from '@/components/expression/mock-expressions';

function ExpressPage() {
  return (
    <ResponsiveAppShell>
      {/* <SubjectBadges /> */}
      <ExpressionList expressions={mockExpressions} />
    </ResponsiveAppShell>
  );
}

ExpressPage.auth = true;

export default ExpressPage;
