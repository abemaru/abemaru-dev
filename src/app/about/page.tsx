import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="p-8 pb-20 gap-16 sm:p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">わたしについて</h1>
        <div className="flex justify-center ">
          <div className="relative
            w-32 h-32
            sm:w-48 sm:h-48
            md:w-56 md:h-56
            lg:w-64 lg:h-64
            xl:w-72 xl:y-72
            ">
            <Image
              src="https://pbs.twimg.com/profile_images/1544705950418075648/hD2Cod2s_400x400.jpg"
              alt="profileImg"
              fill
              className="rounded-full object-cover border-4 border-blue-800 shadow-xl"
              sizes="(max-width: 640px) 80px, 180px"
              priority
            />
          </div>
        </div>
        <div>
        </div>
      </div>
    </main>
  );
}
