import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
// components
import { Text } from './ui/Text';
import Bookmark from './Bookmark';
// type
import { ScenarioType } from '@/models';
// remotes
import { getUserBookmark } from '@/remotes/mongodb/server/bookmark';

interface ScenarioItemProps {
  scenario: ScenarioType;
}
export default async function ScenarioItem({ scenario }: ScenarioItemProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const queryClient = new QueryClient();

  if (scenario._id && userId) {
    await queryClient.prefetchQuery({
      queryKey: ['bookmark', scenario._id, userId],
      queryFn: () => getUserBookmark({ scenarioId: scenario._id!, userId }),
    });
  }

  return (
    <div className="max-w-2xl px-8 py-5 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-3">
          <Link
            href="#"
            className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
          >
            {scenario.genre}
          </Link>
          <Link
            href="#"
            className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
          >
            {scenario.world}
          </Link>
        </div>
        <Text color="gray">2024.8.15</Text>
      </div>
      <div className="mt-2">
        <Link href={`/scenario/${scenario._id}`} className="hover:underline">
          <Text weigth="bold" size="xl">
            {scenario.title}
          </Text>
        </Link>
        <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
          {scenario.prologue.text}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Link href="#" className="flex items-center gap-4">
          <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
            <Image
              width={100}
              height={100}
              sizes="100%"
              src="/images/방문자.png"
              className="object-cover w-full h-full"
              alt="avatar"
            />
          </div>
          <Text weigth="bold">고나우</Text>
        </Link>
        {userId && scenario._id && (
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Bookmark scenarioId={scenario._id} userId={userId} />
          </HydrationBoundary>
        )}
      </div>
    </div>
  );
}
