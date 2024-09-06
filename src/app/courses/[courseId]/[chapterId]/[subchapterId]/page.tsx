"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import RectAccordion from '@/components/accordion/rect-accordion';

// Mock data: replace this with real API calls.
const mockChapters = [
  {
    id: 1,
    name: 'Chapter 1',
    subchapters: [
      { id: 1, name: 'Subchapter 1' },
      { id: 2, name: 'Subchapter 2' },
    ],
  },
  {
    id: 2,
    name: 'Chapter 2',
    subchapters: [
      { id: 1, name: 'Subchapter 1' },
      { id: 2, name: 'Subchapter 2' },
    ],
  },
];

// Component for a list of chapters with subchapter accordions
const ChapterList = ({ courseId, currentChapterId, currentSubchapterId, }: {
  courseId: number;
  currentChapterId: number;
  currentSubchapterId: number;
}) => {
    const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const toggleAccordion = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  return (
    <div className="w-1/4 h-full backdrop-blur-md bg-[rgba(200,200,200,0.73)]">
      {mockChapters.map((chapter) => (
        <RectAccordion
          key={chapter.id}
          title={chapter.name}
          isOpen={openChapter === chapter.id}
          toggleAccordion={() => toggleAccordion(chapter.id)}
        >
            <div className='flex flex-col'>
                {chapter.subchapters.map((subchapter) => (
                    <button
                    className='text-left'
                    key={subchapter.id}
                    onClick={() => router.push(`/courses/${courseId}/${chapter.id}/${subchapter.id}`)}
                    >
                    <div
                        className={`block px-4 py-3  bg-[#187fb3d8] hover:bg-[#3a8ab3d8] ${
                        currentSubchapterId === subchapter.id ? 'bg-gray-200 font-semibold' : ''
                        }`}
                    >
                        {subchapter.name}
                    </div>
                    </button>
                ))}
            </div>
        </RectAccordion>
      ))}
    </div>
  );
};

// Main page component
export default function CourseContent({ params }: { params: { courseId: number, chapterId:number, subchapterId:number } }) {
    const [subchapterContent, setSubchapterContent] = useState<string>('');
    // const router = useRouter();
    // Fetch subchapter content based on route params
    useEffect(() => {
        if (params.subchapterId) {
        // Replace with real API call
        setSubchapterContent(`Content for subchapter ${params.subchapterId}`);
    }}, [params.subchapterId]);
    console.log(`Content for course ${params.courseId}, chapter ${params.chapterId}, subchapter ${params.subchapterId}`);

    return (
        <>
            <title>
                Millenium LMS by GNF Labs
            </title>
            {/* <NavigationBar logo={{source:"images/logo_GNF.png", width: 90, height: 90}} navigationMenu={navigationRoute} /> */}
            <main className="flex h-full flex-col">
                <div className='parallax-bg'/>
                <div className="flex h-screen">
                    <ChapterList
                        courseId={params.courseId}
                        currentChapterId={params.chapterId}
                        currentSubchapterId={params.subchapterId}
                    />
                    <div className="w-3/4 p-6 bg-white border-l border-gray-200">
                        <h1 className="text-xl font-bold mb-4">Subchapter {params.subchapterId}</h1>
                        <p>{`Content for course ${params.courseId}, chapter ${params.chapterId}, subchapter ${params.subchapterId}`}</p>
                    </div>
                </div>

            </main>
        </>
    );
};