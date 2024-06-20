import { useState } from 'react';
import { GenerateResumeInput } from '@/types/resume';
import './IntroForm.css';

type IntroFormProps = {
	onSubmit: (generateInput: GenerateResumeInput) => void;
}

export const IntroForm = ({ onSubmit }: IntroFormProps) => {
	const [name, setName] = useState<string>("");
	const [job, setJob] = useState<string>("");
	const [education, setEducation] = useState<string>("")	
	const [experience, setExperience] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({ name, job, education, experience, description })
	};

	return (
		<form
			className='intro-form'
			onSubmit={handleSubmit}
		>
			<h1 className='form-title'>Tell us about yourself</h1>
			<label />
			Full Name
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label />
			What job are you looking for?
			<input
				type="text"
				value={job}
				placeholder='Software Engineer'
				onChange={(e) => setJob(e.target.value)}
			/>
			<label />
			Tell us about your education
			<input
				type="text"
				value={education}
				placeholder='second year computer science student - college of management'
				onChange={(e) => setEducation(e.target.value)}
			/>
			<label />
			What is your experience?
			<textarea
				style={{
					height: "5rem",
				}}
				placeholder='Two years as a junior Full Stack Developer in a games company...'
				value={experience}
				onChange={(e) => setExperience(e.target.value)}
			/>
			<label />
			Describe yourself in a few words
			<textarea
				style={{
					height: "10rem",
				}}
				placeholder="I'm looking for a place to..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button type="submit" className='generate-button'>Generate Resume</button>
		</form>
	)
};