import { useNavigate } from 'react-router-dom';
import styles from './Start.module.css';
import AddFileIcon from '@/assets/icons/add_file.svg';
import QuestionsIcon from '@/assets/icons/questions.svg';

export const Start = () => {
  const navigate = useNavigate();

  const continueToBackground = () => {
    navigate('background');
  }

  const continueToImportExisting = () => {
    navigate('loading');
  }

  return (
    <main className="flex-1 flex items-center pt-[200px] flex-col">
      <h1 className='font-bold text-3xl text-center height-fit mb-[6px]'>Let's start building your CV</h1>
      <h3 className='font-light text-xl mb-[50px]'>how you would like to start?</h3>
      <section className={`${styles.startOptions} flex gap-[30px]`}>
        <div onClick={continueToBackground}>
          <img src={QuestionsIcon} alt="Your SVG" />
          <h2 className='font-medium text-lg'>Start from scratch</h2>
          <span className='font-light text-sm opacity-80'>by a few questions</span>

        </div>
        <div onClick={continueToImportExisting}>
          <img src={AddFileIcon} alt="Your SVG" />
          <h2 className='font-medium text-lg'>Import existing CV</h2>
          <span className='font-light text-sm opacity-80'>upload Cv in PDF format</span>
        </div>
      </section>
    </main>
  );
}
