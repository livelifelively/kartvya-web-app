import { IconUsers, IconScale, IconBuildingBank, IconTimeline } from '@tabler/icons-react';
import { About } from '@/components/about/about';

const featuresData = [
  {
    title: 'Non-Partisan Institutional Information',
    description:
      'Institutions centric information that is beyond political headlines. Enables citizens to focus on governance and social impact.',
    icon: IconScale,
  },
  {
    title: 'Citizens and Policy Subjects Centric',
    description:
      'We empower citizens with actionable citizen centric information on all the government policy subjects like health, defence. We are building systems to enable citizens to collaborate with other citizens, governments and other stakeholders to improve state of living.',
    icon: IconUsers,
  },
  {
    title: 'Know your Governments at All Levels',
    description:
      'Know what is happening in your local government, state and national governments. Understand how government organisations work on their own and in collaboration with other departments',
    icon: IconBuildingBank,
  },
  {
    title: 'Past, Present and Future',
    description:
      'Know performance on different policy subjects as per availability of public data. Timelines to track progress, current status and trends for the future.',
    icon: IconTimeline,
  },
];

function AboutPage() {
  return <About featuresData={featuresData} />;
}

AboutPage.auth = false;

export default AboutPage;
