import ConversationList from '@/components/ConversationList';

// TODO: Delete this mock
const posts = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    content:
      'React Hooks are functions that let you use state and other React features without writing a class...',
    user: {
      id: 1,
      username: 'johndoe',
      avatarUrl: '/placeholder.svg',
    },
    topic: 'Programming',
    timestamp: '2023-10-15T10:00:00Z',
    commentsCount: 5,
  },
  {
    id: 2,
    title: 'Getting Started with TailwindCSS',
    content:
      'TailwindCSS is a utility-first CSS framework that can be composed to build any design, directly in your markup...',
    user: {
      id: 2,
      username: 'janedoe',
      avatarUrl: '/placeholder.svg',
    },
    topic: 'CSS',
    timestamp: '2023-10-14T15:30:00Z',
    commentsCount: 3,
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="lg:w-2/3">
          <ConversationList posts={posts} />
        </main>
        <aside className="lg:w-1/3">Members Ranking</aside>
      </div>
    </div>
  );
}
