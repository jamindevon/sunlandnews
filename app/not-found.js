import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center flex-col py-12 px-4 selection:bg-[#ff4365] selection:text-white">
      <div className="text-center bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-[2rem] max-w-xl w-full relative overflow-hidden">
        
        {/* Background accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brutalYellow rounded-full border-2 border-black opacity-30"></div>

        <div className="relative z-10 flex justify-center mb-6">
          <div className="w-20 h-20 bg-brutalBlue border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl flex items-center justify-center text-4xl">
             🚧
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 uppercase tracking-tight relative z-10">
          Uhh, 404.
        </h2>
        
        <p className="text-lg md:text-xl text-gray-800 font-medium mb-8 leading-relaxed relative z-10">
          Looks like this route doesn't exist anymore. <strong className="bg-[#ff4365] text-white px-2 py-0.5 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] inline-block mt-2">Let's get you back home.</strong>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 text-lg font-bold uppercase text-white bg-primary border-2 border-black rounded-xl transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            Home
          </Link>
          <Link
            href="/news"
            className="w-full sm:w-auto px-8 py-4 text-lg font-bold uppercase text-black bg-white border-2 border-black rounded-xl transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-brutalYellow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            Browse News
          </Link>
        </div>
      </div>
    </div>
  );
}