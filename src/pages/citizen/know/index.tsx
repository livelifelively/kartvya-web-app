import { ResponsiveAppShell } from '@/components/app-shell';
import { NewsListing } from '@/components/news-listing/news-listing';
// import { SubjectBadges } from '@/components/subject-badges/subject-badges';

function KnowPage() {
  return (
    <ResponsiveAppShell>
      {/* <SubjectBadges /> */}
      <NewsListing />
    </ResponsiveAppShell>
  );
}

KnowPage.auth = true;

export default KnowPage;
