import Image from 'next/image';
// components
import { Spacing } from '../shared/ui/Spacing';
// type
import { StoryFormatType } from '@/models';

interface StoryFormatProps {
  story: StoryFormatType;
  onClick: (choice: string) => void;
}
export default function StoryFormat({ story, onClick }: StoryFormatProps) {
  return (
    <div>
      <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
        <Image
          width={100}
          height={100}
          sizes="100%"
          src="/images/올라프.webp"
          className="object-cover w-full h-full"
          alt="avatar"
        />
      </div>

      <Spacing />
      <div>{story.text}</div>
      <Spacing size="sm" />
      <div className="flex flex-col gap-4">
        {story.choices.map((item, i) => (
          <div
            key={i}
            onClick={() => onClick(item)}
            className="px-8 py-4 bg-white rounded-lg cursor-pointer dark:bg-gray-800 duration-300 hover:bg-gray-700"
          >
            {i + 1}. {item}
          </div>
        ))}
      </div>
    </div>
  );
}
