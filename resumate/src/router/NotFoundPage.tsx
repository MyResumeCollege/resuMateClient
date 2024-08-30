import Space from '@/assets/icons/space.svg';
import { Button } from '@/components/shared/button/Button';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return <div className="flex flex-col flex-1 items-center justify-center">
        <span className="font-bold text-2xl logo underlineded mb-5">
            ResuMate.
        </span>
        <h2 className='font-bold text-8xl'>OOPS</h2>
        <div className='font-medium text-xl'>There's nothing here...</div>
        <Link to='/'>
            <Button buttonClassName='!w-fit mt-5'>I'm lost, take me home</Button>
        </Link>
        <img src={Space} className='w-[250px] mt-[50px]' />
    </div>
}