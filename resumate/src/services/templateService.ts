import Template1 from '@/assets/images/resume-template/template1.jpg';
import Template2 from '@/assets/images/resume-template/template2.jpg';
import Template3 from '@/assets/images/resume-template/template3.jpg';
import { BlueyTemplate } from '@/components/resume-templates/Bluey';
import { ClassicTemplate } from '@/components/resume-templates/Classic';
import { CalmTemplate } from '@/components/resume-templates/Calm';
import { TemplateProps } from '@/types/template-props';

export interface Template {
  _id: number;
  imageUrl: string;
  isPremium: boolean;
  component: (resumeProps: TemplateProps) => JSX.Element;
}

export const templates: Template[] = [
  {
    _id: 1,
    imageUrl: Template1,
    isPremium: false,
    component: BlueyTemplate
  },
  {
    _id: 2,
    imageUrl: Template2,
    isPremium: false,
    component: ClassicTemplate
  },
  {
    _id: 3,
    imageUrl: Template3,
    isPremium: false,
    component: CalmTemplate
  }
];
