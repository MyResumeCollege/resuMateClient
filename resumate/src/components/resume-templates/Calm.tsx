import { TemplateProps } from "@/types/template-props";

const Title = (text: string, color = 'white') => {
    return <div className="flex flex-col mb-3">
        <h2 className="text-lg font-bold" style={{ color }}>{text}</h2>
        <span className="h-[1px] w-full" style={{ background: color }}></span>
    </div>
}

const List = (listedText: string) => {
    return (listedText || "").split('\n').map(item => <div key={item} className="text-sm">
        <span className="font-bold">{item.split('-')[0]}</span> -
        <span>{item.split('-')[1]}</span>
    </div>)
}

export const CalmTemplate = ({ resume }: TemplateProps) => {
    const { fullName, bio, jobTitle, languages, skills, educations, experiences } = resume;

    return <div className="flex-1 flex bg-white border border-gray-300 overflow-auto relative">
        <div className="bg-[#a4aba3] p-8 pr-0 text-black" style={{ maxWidth: 300 }}>
            <div className="text-3xl font-bold pr-6">{fullName}</div>
            <div className="text-sm font-semibold mb-[40px] text-gray-800">{jobTitle}</div>

            <div className="flex flex-col mb-5 text-gray-800">
                {Title('Education')}
                <div className="text-sm pr-6 whitespace-break-spaces">{educations.slice(0,400)}</div>
            </div>

            <div className="flex flex-col mb-5 text-gray-800">
                {Title('Skills')}
                {List(skills)}
            </div>

            <div className="flex flex-col mb-5 text-gray-800">
                {Title('Languages')}
                {List(languages)}
            </div>
        </div>
        <div className="flex-1 p-6 text-sm">
            <div className="flex flex-col mb-5">
                {Title('About Me', 'black')}
                <div>{bio.slice(0,400)}</div>
            </div>
            <div className="text-sm">
                {Title('Experience', 'black')}
                {experiences.slice(0,400)}
            </div>
        </div>
    </div>
}