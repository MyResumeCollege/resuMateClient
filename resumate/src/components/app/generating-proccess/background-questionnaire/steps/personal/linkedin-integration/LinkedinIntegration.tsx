import LinkedinLogo from '@/assets/images/linkedin_logo.png';
import { fullNameState, summaryState } from '@/components/app/generating-proccess/store/state';
import { Button } from '@/components/shared/button/Button';
import { TextInput } from '@/components/shared/inputs/text-input/TextInput';
import { getLinkedinData } from '@/services/linkedinIntegration';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import styles from './LinkedinIntegration.module.css';

export const LinkedinIntegration = () => {
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
    const [profileUrl, setProfileUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const setName = useSetRecoilState(fullNameState);
    const setSummary = useSetRecoilState(summaryState);

    const closeDialog = () => {
        setIsProfileDialogOpen(false);
        setProfileUrl('');
    }

    const importData = async () => {
        if (profileUrl === '') {
            toast.error('You must fill profile URL before importing')
        }
        else {
            setIsLoading(true);
            try {
                const linkedinData = (await getLinkedinData(profileUrl)).data;
                setName(linkedinData.name);
                setSummary(linkedinData.summary);
                toast.success('Imported data from LinkedIn successfully');

                setProfileUrl('');
                setIsProfileDialogOpen(false);
            } catch (e) {
                toast.error('An error occured while importing data from Linkedin');
            } finally {
                setIsLoading(false);
            }
        }

    };

    return <>
        {isProfileDialogOpen &&
            <Dialog onClose={closeDialog} open={isProfileDialogOpen} as="div" className="relative z-10 focus:outline-none">
                <DialogBackdrop transition className="fixed inset-0 bg-black/30 backdrop-blur-lg" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="bg-white w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-bold flex">
                                <span>Fill Your LinkedIn Profile URL</span>
                                <svg onClick={closeDialog} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </DialogTitle>
                            <p className="mt-2 text-sm/6 opacity-60">
                                We will import your data (such as name, education and skills) and save you some time
                            </p>
                            <TextInput
                                autoFocus
                                label='Profile URL'
                                placholder='https://www.linkedin.com/in/your-linkedin-profile-000'
                                wrapperClassName='mt-5'
                                value={profileUrl}
                                onChange={setProfileUrl} />
                            <div className="mt-4">
                                <Button
                                    loading={isLoading}
                                    disabled={isLoading}
                                    onClick={importData}
                                    text='Import data from my profile'
                                />
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog >
        }
        <section
            onClick={() => setIsProfileDialogOpen(true)}
            className={`bg-white rounded-lg px-5 py-5 w-[400px]${styles.linkedinButton}`}>
            <div className='flex gap-3'>
                <img src={LinkedinLogo} className='h-[40px] w-[40px]' />
                <div className='flex flex-col'>
                    <h3 className='font-bold'>Want to speed things up?</h3>
                    <span className='text-sm'>Import your data from LinkedIn in a click</span>
                </div>
            </div>
        </section>
    </>

}