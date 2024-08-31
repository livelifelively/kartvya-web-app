import { IconUsers, IconScale, IconBuildingBank } from '@tabler/icons-react';
import { About } from '@/components/about/about';

const featuresData = [
  {
    title: 'Non-Partisan Institutional Information',
    description:
      'Institutions centric information that is beyond political headlines. Enables citizens to focus on governance and social impact.',
    icon: IconScale,
  },
  {
    title: 'Citizens and Community Centric',
    description:
      'We empower citizens with actionable citizen centric information. We are building systems to enable citizens to have collaboration with other citizens, governments and other stakeholders',
    icon: IconUsers,
  },
  {
    title: 'Covers Governments at All Levels',
    description:
      'Know what is happening in your local government, state and national governments. Understand how government organisations work on their own and in collaboration with other departments',
    icon: IconBuildingBank,
  },
];

function AboutPage() {
  return <About featuresData={featuresData} />;
}

export default AboutPage;
