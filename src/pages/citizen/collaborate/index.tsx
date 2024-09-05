import { ResponsiveAppShell } from '@/components/app-shell';
import { NewsListing } from '@/components/news-listing/news-listing';
// import { SubjectBadges } from '@/components/subject-badges/subject-badges';

function CollaboratePage() {
  return (
    <ResponsiveAppShell>
      {/* <SubjectBadges /> */}
      <NewsListing />
    </ResponsiveAppShell>
  );
}

CollaboratePage.auth = true;

export default CollaboratePage;
