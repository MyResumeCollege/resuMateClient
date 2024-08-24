import Folder from '@/assets/images/resume-template/folder.png';
import FolderTeal from '@/assets/images/resume-template/folder-teal.png';
import Newspaper from '@/assets/images/resume-template/newspaper.png';
import NewspaperDark from '@/assets/images/resume-template/newspaper-dark.png';
import Sea from '@/assets/images/resume-template/sea.png';

import { FolderTemaplate } from '@/components/resume-templates/Folder';
import { FolderTealTemaplate } from '@/components/resume-templates/FolderTeal';
import { NewspaperTemplate } from '@/components/resume-templates/Newspaper';
import { SeaTemplate } from '@/components/resume-templates/Sea';
import { TemplateProps } from '@/types/template-props';
import { NewspaperDarkTemplate } from '@/components/resume-templates/NewspaperDark';

export interface Template {
  _id: number;
  imageUrl: string;
  isPremium: boolean;
  component: (resumeProps: TemplateProps) => JSX.Element;
}

export const templates: Template[] = [
  {
    _id: 1,
    imageUrl: Sea,
    isPremium: false,
    component: SeaTemplate
  },
  {
    _id: 2,
    imageUrl: Newspaper,
    isPremium: false,
    component: NewspaperTemplate
  },
  {
    _id: 3,
    imageUrl: NewspaperDark,
    isPremium: true,
    component: NewspaperDarkTemplate
  },
  {
    _id: 4,
    imageUrl: Folder,
    isPremium: true,
    component: FolderTemaplate
  },
  {
    _id: 5,
    imageUrl: FolderTeal,
    isPremium: true,
    component: FolderTealTemaplate
  }
];
