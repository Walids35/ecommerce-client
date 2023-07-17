import SectionOne from "@/components/section1/SectionOne"
import SectionTwo from "@/components/section2/SectionTwo"

export default function Home() {
  return (
    <>
      <div className="bg-home-img w-full bg-[right_top] lg:bg-center bg-cover px-10 py-20 sm:py-32 sm:px-10 md:px-32 lg:px-60" style={{height: "600px"}}>
        <p className="text-3xl sm:text-5xl text-full-white font-bold">Shopping and <span className="mt-3">Entertainement</span></p>
        <p className="text-white mt-5 w-full md:w-1/2">Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</p>
        <button className="text-white border-white border-2 mt-10 py-3 px-6 rounded-full transition-all duration-300 hover:bg-white hover:text-black">Learn More</button>
      </div>
      <SectionOne />
      <SectionTwo />
    </>
  )
}
