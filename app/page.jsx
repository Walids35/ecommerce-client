export default function Home() {
  return (
    <>
      <div className="bg-home-img w-full bg-[right_top] lg:bg-center bg-cover px-10 py-20 sm:p-32" style={{height: "600px"}}>
        <p className="text-3xl sm:text-5xl text-full-white font-bold">Shopping and <p className="mt-3">Entertainement</p></p>
        <p className="text-white mt-5 w-80">Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</p>
        <button className="text-white border-white border-2 mt-10 py-3 px-6 rounded-full">Learn More</button>
      </div>
    </>
  )
}
