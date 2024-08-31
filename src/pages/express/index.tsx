import { ResponsiveAppShell } from '@/components/app-shell';
import { ExpressionListing } from '@/components/expression-listing/expression-listing';
// import { SubjectBadges } from '@/components/subject-badges/subject-badges';

export default function ExpressPage() {
  return (
    <>
      <ResponsiveAppShell>
        {/* <SubjectBadges /> */}
        <ExpressionListing />
      </ResponsiveAppShell>
    </>
  );
}
