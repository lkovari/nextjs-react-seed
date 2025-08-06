import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="prose dark:prose-invert max-w-none text-center">
      <p>Welcome to the LK&apos;s playground modern <a href='https://nextjs.org' >Next.js</a> app!</p>
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-8 h-8">
          <a href="https://github.com/lkovari/nextjs-react-seed"><Image src="/github-mark-white.svg" alt="GitHub logo" fill className="object-contain"/></a> 
        </div>
      </div>
    </div>
  );
}