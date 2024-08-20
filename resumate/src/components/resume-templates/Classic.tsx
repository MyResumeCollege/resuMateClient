import { TemplateProps } from "@/types/template-props";

const Title = (text: string) => {
    return <div className="flex flex-col mb-2">
        <h2 className="text-lg font-bold">{text}</h2>
    </div>
}

const List = (listedText: string) => {
    return (listedText || "").split('\n').map(item => <div key={item} className="text-sm text-gray-600">
        <span className="font-bold">{item.split('-')[0]}</span> -
        <span>{item.split('-')[1]}</span>
    </div>)
}

export const ClassicTemplate = ({ resume }: TemplateProps) => {
    const { fullName, bio, jobTitle, languages, skills, educations, experiences } = resume;

    return <div className="flex-1 flex flex-col bg-white border border-gray-300 overflow-auto relative">
        <div className="bg-[#08182c] text-white p-6">
            <div className="text-3xl font-bold">{fullName}</div>
            <div className="text-sm font-semibold text-gray-400">{jobTitle}</div>
        </div>

        <div className="flex flex-col p-6">
            <div className="flex flex-col mb-5">
                {Title('About Me')}
                <div className="text-sm text-gray-600 pr-6 whitespace-break-spaces">{bio.slice(0,400)}</div>
            </div>


            <div className="flex flex-col mb-5">
                {Title('Education')}
                <div className="text-sm text-gray-600 pr-6 whitespace-break-spaces">{educations.slice(0,400)}</div>
            </div>

            <div className="flex flex-col mb-5">
                {Title('Experience')}
                <div className="text-sm text-gray-600 pr-6 whitespace-break-spaces">{experiences.slice(0,400)}</div>
            </div>


            <div className="flex flex-col mb-5">
                {Title('Skills')}
                {List(skills)}
            </div>

            <div className="flex flex-col mb-5">
                {Title('Languages')}
                {List(languages)}
            </div>
        </div>


    </div>
}