import { TextInput } from '@/components/shared/inputs/text-input/TextInput';
import { useRecoilState } from 'recoil';
import { emailState, phoneNumberState } from "../../../store/state";

export const ContactInfo = () => {
    const [email, setEmail] = useRecoilState(emailState);
    const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberState);

    return <section className="wanted-job flex-1 flex flex-col pt-[70px] items-center">
        <h2 className="font-bold text-3xl text-center mb-5">Contact Info</h2>
        <div className='mb-5'>
            <TextInput wrapperClassName='w-[400px]' label='Email' value={email} onChange={setEmail} placeholder="john.doe@gmail.com" />
        </div>
        <div className='mb-5'>
            <TextInput wrapperClassName='w-[400px]' label='Phone Number' value={phoneNumber} onChange={setPhoneNumber} placeholder="052-000-000" />
        </div>
    </section>
};