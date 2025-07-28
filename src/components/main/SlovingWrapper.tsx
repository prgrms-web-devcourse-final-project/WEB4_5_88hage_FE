// 'use client';

// import { useState, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface SlideWrapperProps {
//   children: React.ReactNode[];
// }

// export default function SlideWrapper({ children }: SlideWrapperProps) {
//   const [page, setPage] = useState(0);
//   const maxPage = children.length - 1;

//   // 휠 한 번당 페이지 +1 / -1
//   const onWheel = useCallback((e: React.WheelEvent) => {
//     if (e.deltaY > 0 && page < maxPage) {
//       setPage(page + 1);
//     } else if (e.deltaY < 0 && page > 0) {
//       setPage(page - 1);
//     }
//   }, [page, maxPage]);

//   return (
//     <div
//       onWheel={onWheel}
//       className="relative h-screen w-full overflow-hidden"
//     >
//       <AnimatePresence initial={false} mode="wait">
//         <motion.div
//           key={page}
//           initial={{ y: page > 0 ? '100vh' : '-100vh', opacity: 0 }}
//           animate={{ y: '0vh', opacity: 1 }}
//           exit  ={{ y: page > 0 ? '-100vh' : '100vh', opacity: 0 }}
//           transition={{ duration: 0.8, ease: 'easeInOut' }}
//           className="absolute top-0 left-0 w-full h-full"
//         >
//           {children[page]}
//         </motion.div>
//       </AnimatePresence>

//       {/* pagination */}
//       <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
//         {children.map((_, i) => (
//           <div
//             key={i}
//             className={`w-3 h-3 rounded-full transition-all
//               ${i === page ? 'bg-white scale-125' : 'bg-gray-500/30 scale-100'}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideWrapperProps {
  children: React.ReactNode[];
}

export default function SlovingWrapper({ children }: SlideWrapperProps) {
  const [page, setPage] = useState(0);
  const lastPage = children.length - 1;

  const onWheel = useCallback((e: React.WheelEvent) => {
    // 아래로 스크롤
    if (e.deltaY > 0) {
      if (page < lastPage) {
        e.preventDefault();            // 브라우저 기본 스크롤 잠그기
        setPage(page + 1);
      }
      // page === lastPage 이면 preventDefault 안 해서 다음 섹션으로 넘어감
    }
    // 위로 스크롤
    else if (e.deltaY < 0) {
      if (page > 0) {
        e.preventDefault();
        setPage(page - 1);
      }
      // page === 0 이면 preventDefault 안 해서 바깥으로 스크롤
    }
  }, [page, lastPage]);

  return (
    // ▲ 전체 높이를 “슬라이드 수 × 뷰포트 높이”로 설정
    <div
      className="relative w-full"
      style={{ height: `${(lastPage + 1) * 100}vh` }}
    >
      {/* ▲ 이 내부가 뷰포트에 sticky 되어 고정됨 */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden"
        onWheel={onWheel}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={page}
            initial={{ y: page > 0 ? '100vh' : '-100vh', opacity: 0 }}
            animate={{ y: '0vh', opacity: 1 }}
            exit   ={{ y: page > 0 ? '-100vh' : '100vh', opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-full"
          >
            {children[page]}
          </motion.div>
        </AnimatePresence>

        {/* pagination */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {children.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all
                ${i === page ? 'bg-white scale-125' : 'bg-gray-500/30 scale-100'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}