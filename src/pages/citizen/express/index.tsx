import { ResponsiveAppShell } from '@/components/app-shell';
import { ExpressionListing } from '@/components/expression-listing/expression-listing';
// import { SubjectBadges } from '@/components/subject-badges/subject-badges';

function ExpressPage() {
  return (
    <>
      <ResponsiveAppShell>
        {/* <SubjectBadges /> */}
        <ExpressionListing />
      </ResponsiveAppShell>
    </>
  );
}

ExpressPage.auth = true;

export default ExpressPage;
