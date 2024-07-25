import { Levels } from '@/components/levels/levels';

const featuresData = [
  {
    level: 1,
    title: 'Information',
    description:
      'Easy and consistent access to public information on government policies, regulations, and services.',
  },
  {
    level: 2,
    title: 'Feedback',
    description: 'Share opinions and feedback to the government and fellow citizens.',
  },
  {
    level: 3,
    title: 'Consultation',
    description:
      'Governments are officially open to listening to citizens. Participate in public consultations on specific issues or policies.',
  },
  {
    level: 4,
    title: 'Collaboration',
    description:
      'Work with government officials on execution of projects or initiatives to address community needs and achieve common goals.',
  },
  {
    level: 5,
    title: 'Co-Creation',
    description:
      'Engage in open citizen participation with government officials to co-create policies, initiatives, or services that address the needs of the community.',
  },
];

function LevelsPage() {
  <Levels featuresData={featuresData} />;
}

export default LevelsPage;
