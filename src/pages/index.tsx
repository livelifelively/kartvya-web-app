import { ResponsiveAppShell } from '@/components/app-shell';
import { NewsListing } from '@/components/news-listing/news-listing';
import { SubjectBadges } from '@/components/subject-badges/subject-badges';
import { Badge, Box, Flex, Indicator } from '@mantine/core';

export default function HomePage() {
  return (
    <>
      <ResponsiveAppShell>
        {/* <SubjectBadges /> */}
        <NewsListing />
      </ResponsiveAppShell>
    </>
  );
}
