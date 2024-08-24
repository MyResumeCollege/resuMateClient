import { TextInput } from '@/components/shared/inputs/text-input/TextInput';
import { useRecoilState } from 'recoil';
import { emailState, phoneNumberState } from "../../../store/state";

export const ContactInfo = () => {
    const [email, setEmail] = useRecoilState(emailState);
    const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberState);

    const handlePhoneNumberChange = (phoneNumber: string) => {
        let value = phoneNumber.replace(/\D/g, '');

        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 5) {
            value = `${value.slice(0, 3)}-${value.slice(3)}`;
        } else if (value.length <= 7) {
            value = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5)}`;
        } else {
            value = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5, 10)}`;
        }

        setPhoneNumber(value);
    };

    return <section className="wanted-job flex-1 flex flex-col pt-[70px] items-center">
        <h2 className="font-bold text-3xl text-center mb-5">Contact Info</h2>
        <div className='mb-5'>
            <TextInput wrapperClassName='w-[400px]' label='Email' value={email} onChange={setEmail} placeholder="john.doe@colman.ac.il" />
        </div>
        <div className='mb-5'>
            <TextInput wrapperClassName='w-[400px]' label='Phone Number' value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="052-00-00000" />
        </div>
    </section>
};