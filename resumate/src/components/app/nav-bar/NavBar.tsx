import './navbar.css';

export const NavBar = () => {
    return <nav className="h-[65px] bg-white p-5 border border-gray-300 flex justify-between items-center">
        <div className='flex items-center gap-2'>
            <div className='bg-primary h-[30px] w-[30px] rounded-lg'></div>
            <span className="font-bold text-2xl logo relative">
                ResuMate.
            </span>
        </div>
        <div className="">
            <img src='https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                className="rounded-full h-[40px] w-[40px] cursor-pointer" />
        </div>
    </nav>
};