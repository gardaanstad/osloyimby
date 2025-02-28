import { Playfair_Display, Inter } from 'next/font/google';
import Link from 'next/link';
import './styles/gradients.css';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Carousel from '@/components/carousel';
import CarouselNavigation from '@/components/carousel-navigation';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500'],
});

interface PostData {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
}

async function getRecentPosts(): Promise<PostData[]> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        id,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        author: data.author,
      };
    });

  // Sort posts by date and take the 5 most recent for mobile
  return allPostsData
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);
}

export default async function Home() {
  const recentPosts = await getRecentPosts();
  
  return (
    <main 
      className={`relative ${inter.className} min-h-screen overflow-x-hidden bg-[#f7f4ef] dark:bg-[#0a0a0a] pt-28`}
    >
      <div 
        className="fixed inset-0 bg-gradient-to-b from-[#2b2b2b] to-transparent dark:from-black/40 dark:to-transparent opacity-[0.08] -z-10"
      />

      {/* Hero Section */}
      <section className="relative w-full px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Hero */}
          <div className="md:hidden relative overflow-hidden">
            <div className="relative">
              <h1 className={`${playfair.className} text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-left gradient-text mb-4 pt-4`}>
                For en by med plass til alle
              </h1>
              <div className="mb-6">
                <p className={`text-[#2b2b2b] dark:text-[#f5f1e8]/90 text-base leading-relaxed text-left max-w-[95%]`}>
                  <span className="font-semibold">YIMBY</span> står for &ldquo;Yes In My Back Yard&rdquo; — vi som ønsker 
                  mer og tettere byutvikling i Oslo for å skape en mer bærekraftig, mangfoldig, og 
                  rimelig by.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Hero */}
          <div className="hidden md:block relative">
            <div className="flex flex-col">
              <h1 className={`${playfair.className} text-7xl md:text-8xl font-bold tracking-tight leading-[1.1] text-left gradient-text  pt-12`}>
                For en by med plass til alle
              </h1>
              <div className="mt-6 mb-2 max-w-3xl">
                <p className={`text-[#2b2b2b] dark:text-[#f5f1e8]/90 text-lg leading-relaxed`}>
                  <span className="font-semibold">YIMBY</span> står for &ldquo;Yes In My Back Yard&rdquo; — vi som ønsker 
                  mer og tettere byutvikling i Oslo for å skape en mer bærekraftig, mangfoldig, og 
                  rimelig by.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="relative w-full px-4 mt-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Main Grid - Redesigned newspaper-style layout */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - Main content and feature */}
              <div className="col-span-8">
                {/* Featured Article - Main coverage */}
                <div className="border border-[#2b2b2b]/20 dark:border-[#f5f1e8]/10 bg-white/5 dark:bg-black/20 p-6 mb-6">
                  <div className="flex gap-8">
                    {/* Left - Title and intro */}
                    <Link 
                        href="/argument" 
                        className="w-1/2 group"
                      >
                        <span className="text-sm text-[#2b2b2b] dark:text-[#f5f1e8]/70 font-medium uppercase tracking-wider">Hovedsak</span>
                        <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#2b2b2b] dark:text-[#f5f1e8] mt-2 mb-4 leading-tight group-hover:underline`}>
                          Hvorfor trenger Oslo YIMBY?
                        </h2>
                        <p className="text-[#2b2b2b] dark:text-[#f5f1e8]/80 text-base leading-relaxed mb-4">
                          Boligprisene i Oslo har steget med 110% siden 2010, mens lønningene bare har økt med 32%. 
                          Boligkrisen rammer særlig unge og marginaliserte grupper. YIMBY fokuserer på forskningsbaserte løsninger for å øke boligtilbudet.
                        </p>
                    </Link>
                    
                    {/* Right - Highlight box */}
                    <div className="w-1/2 bg-[#1a472a] dark:bg-[#1a472a] p-6 flex flex-col justify-between">
                      <div>
                        <h3 className={`${playfair.className} text-xl font-bold text-white dark:text-[#f5f1e8] mb-4`}>Grunnlaget vårt</h3>
                        <ul className="space-y-3 text-white dark:text-[#f5f1e8]/95">
                          <li className="flex items-start">
                            <span className="w-6 h-6 bg-white text-[#1a472a] flex-shrink-0 flex items-center justify-center mr-2">1</span>
                            <span>Økt boligbygging gjør eksisterende boliger billigere</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-6 h-6 bg-white text-[#1a472a] flex-shrink-0 flex items-center justify-center mr-2">2</span>
                            <span>Tettere byutvikling reduserer klimagassutslipp</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-6 h-6 bg-white text-[#1a472a] flex-shrink-0 flex items-center justify-center mr-2">3</span>
                            <span>Unge og lavinntektsgrupper blir rammet hardest av boligkrisen</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Links - Incorporating functionality from the removed tiles */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Bli Medlem */}
                  <div className="border border-[#2b2b2b]/20 dark:border-[#f5f1e8]/10 g-white/5 dark:bg-black/20 p-6">
                    <Link
                      href="/bli-medlem"
                      className="group flex flex-col h-full"
                    >
                      <span className="block text-sm text-[#2b2b2b] dark:text-[#f5f1e8]/70 uppercase tracking-wider mb-2 font-medium">
                        Bli medlem
                      </span>
                      <h3 className={`text-xl font-bold text-[#2b2b2b] dark:text-[#f5f1e8] mb-2 leading-tight ${playfair.className} group-hover:underline`}>
                        Bli med i kampen
                      </h3>
                      <p className="text-[#2b2b2b] dark:text-[#f5f1e8]/80 text-sm mb-auto">
                        Din stemme teller. Sammen kan vi skape en by med plass til alle.
                      </p>
                      <span className="inline-flex items-center text-[#2b2b2b] dark:text-[#f5f1e8] text-sm font-medium mt-4">
                        Meld deg inn
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                  
                  {/* Contact and About Links */}
                  <div className="border border-[#2b2b2b]/20 dark:border-[#f5f1e8]/10 bg-white/5 dark:bg-black/20 p-6 flex flex-col justify-between">
                    <Link
                      href="/om"
                      className="group mb-6"
                    >
                      <span className="block text-sm text-[#2b2b2b] dark:text-[#f5f1e8]/70 uppercase tracking-wider mb-1 font-medium">
                        Om oss
                      </span>
                      <h3 className={`text-lg font-bold text-[#2b2b2b] dark:text-[#f5f1e8] mb-1 leading-tight ${playfair.className} group-hover:underline`}>
                        Hvem er Oslo YIMBY?
                      </h3>
                    </Link>
                    
                    <div className="border-t border-[#2b2b2b]/20 dark:border-[#f5f1e8]/10 pt-6">
                      <Link
                        href="/kontakt"
                        className="group"
                      >
                        <span className="block text-sm text-[#2b2b2b] dark:text-[#f5f1e8]/70 uppercase tracking-wider mb-1 font-medium">
                          Kontakt
                        </span>
                        <h3 className={`text-lg font-bold text-[#2b2b2b] dark:text-[#f5f1e8] mb-1 leading-tight ${playfair.className} group-hover:underline`}>
                          Ta kontakt med oss
                        </h3>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* News Column - Right Side */}
              <div className="col-span-4 border-l border-[#2b2b2b]/20 dark:border-[#f5f1e8]/10 pl-6">
                <div className="mb-4 pb-4 border-b border-[#2b2b2b]/20 dark:border-[#f5f1e8]/10">
                  <Link 
                    href="/nyheter" 
                    className={`flex items-center justify-between text-xl font-bold text-[#2b2b2b] dark:text-[#f5f1e8] ${playfair.className} hover:underline`}
                  >
                    Nyheter og innlegg
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                
                <div className="space-y-6">
                  {recentPosts.slice(0, 4).map((post) => (
                    <Link key={post.id} href={`/nyheter/${post.id}`} className="block group">
                      <article>
                        <time className="text-xs text-[#2b2b2b] dark:text-[#a3b8b0] font-medium uppercase tracking-wider">
                          {new Date(post.date).toLocaleDateString('nb-NO', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <h3 className={`text-lg font-bold text-[#2b2b2b] dark:text-[#f5f1e8] mt-1 mb-2 leading-tight ${playfair.className} group-hover:underline`}>
                          {post.title}
                        </h3>
                        <p className="text-[#2b2b2b] dark:text-[#a3b8b0] text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Improved to better align with desktop */}
          <div className="md:hidden flex flex-col gap-6">
            {/* Featured Article - Simplified version of desktop's featured article */}
            <div className="border border-[#2b2b2b]/20 dark:border-[#f5f1e8]/10 bg-white/5 dark:bg-black/20 p-5 rounded-sm">
              <Link 
                href="/argument" 
                className="block group"
              >
                <span className="text-xs text-[#2b2b2b] dark:text-[#f5f1e8]/70 font-medium uppercase tracking-wider">Hovedsak</span>
                <div className="flex items-center mt-2 mb-3">
                  <h2 className={`${playfair.className} text-2xl font-bold text-[#2b2b2b] dark:text-[#f5f1e8] leading-tight group-hover:underline flex-grow`}>
                    Hvorfor trenger Oslo YIMBY?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mb-1 inline-block opacity-70" fill="none" viewBox="0 0 24 24" stroke="#2b2b2b">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </h2>
                </div>
                <p className="text-[#2b2b2b] dark:text-[#f5f1e8]/80 text-sm leading-relaxed mb-3">
                  Boligprisene i Oslo har steget med 110% siden 2010, mens lønningene bare har økt med 32%. 
                  Boligkrisen rammer særlig unge og marginaliserte grupper.
                </p>
              </Link>
              
              {/* Simplified Grunnlaget box */}
              <div className="bg-[#1a472a] dark:bg-[#1a472a] p-4 mt-4">
                <h3 className={`${playfair.className} text-base font-bold text-white dark:text-[#f5f1e8] mb-3`}>Grunnlaget vårt</h3>
                <ul className="space-y-2 text-white dark:text-[#f5f1e8]/80">
                  <li className="flex items-start text-sm">
                    <span className="inline-block w-5 h-5 bg-white text-[#1a472a] flex-shrink-0 flex items-center justify-center mr-2 text-xs">1</span>
                    <span>Økt boligbygging gjør eksisterende boliger billigere</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="inline-block w-5 h-5 bg-white text-[#1a472a] flex-shrink-0 flex items-center justify-center mr-2 text-xs">2</span>
                    <span>Tettere byutvikling reduserer klimagassutslipp</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Action Links Grid - Similar to desktop but optimized for mobile */}
            <div className="grid grid-cols-2 gap-4">
              {/* Bli Medlem */}
              <div className="border border-[#2b2b2b]/20 dark:border-[#f5f1e8]/10 bg-white/5 dark:bg-black/20 p-4">
                <Link
                  href="/bli-medlem"
                  className="group flex flex-col h-full"
                >
                  <span className="block text-xs text-[#2b2b2b] dark:text-[#f5f1e8]/70 uppercase tracking-wider mb-1 font-medium">
                    Bli medlem
                  </span>
                  <h3 className={`text-lg font-bold text-[#2b2b2b] dark:text-[#f5f1e8] mb-1.5 leading-tight ${playfair.className} group-hover:underline`}>
                    Bli med i kampen
                  </h3>
                  <span className="inline-flex items-center text-[#2b2b2b] dark:text-[#f5f1e8] text-xs font-medium mt-1">
                    Meld deg inn
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
              </div>
              
              {/* Combined About/Contact - Optimized for mobile */}
              <div className="border border-[#2b2b2b]/20 dark:border-[#f5f1e8]/10 bg-white/5 dark:bg-black/20 p-4 flex flex-col justify-between">
                <Link
                  href="/om"
                  className="group mb-3"
                >
                  <span className="block text-xs text-[#2b2b2b] dark:text-[#f5f1e8]/70 uppercase tracking-wider mb-1 font-medium">
                    Om oss
                  </span>
                  <h3 className={`text-base font-bold text-[#2b2b2b] dark:text-[#f5f1e8] leading-tight ${playfair.className} group-hover:underline`}>
                    Hvem er Oslo YIMBY?
                  </h3>
                </Link>
                
                <div className="border-t border-[#2b2b2b]/20 dark:border-[#f5f1e8]/10 pt-3">
                  <Link
                    href="/kontakt"
                    className="group"
                  >
                    <span className="block text-xs text-[#2b2b2b] dark:text-[#f5f1e8]/70 uppercase tracking-wider mb-1 font-medium">
                      Kontakt
                    </span>
                    <h3 className={`text-base font-bold text-[#2b2b2b] dark:text-[#f5f1e8] leading-tight ${playfair.className} group-hover:underline`}>
                      Ta kontakt med oss
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* News Carousel - Kept as requested, with improved header styling */}
            <div className="mt-2 mb-8">
              <div className="flex items-center justify-between mb-3">
                <Link 
                  href="/nyheter"
                  className={`text-xl font-bold text-[#2b2b2b] dark:text-[#f5f1e8] ${playfair.className} flex items-center`}>
                    Nyheter og innlegg
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 mt-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
              </div>
              
              {/* The carousel will now extend full-width outside of parent container */}
              <div className="w-full overflow-visible">
                <Carousel posts={recentPosts} />
                
                {/* Manually added navigation controls */}
                <div className="md:hidden relative mt-3 flex justify-center items-center gap-3 px-4">
                  <CarouselNavigation totalSlides={recentPosts.length} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
