import {PhoneIcon} from "@heroicons/react/24/solid"

const OverNav = () => {
  return (
    <>
    <div className="flex justify-around text-white bg-blue w-full py-2">
      <div className="flex gap-2">
        <PhoneIcon className="w-3" />
        <p className="text-xs sm:text-sm">+216 92 434 069</p>
      </div>
      <div>
        <p className="text-xs sm:text-sm">Get 50% Off on Selected Items | Shop Now</p>
      </div>
    </div>
    </>
  )
}

export default OverNav