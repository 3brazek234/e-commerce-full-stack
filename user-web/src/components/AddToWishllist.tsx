import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Product } from "@/lib/types"

function AddToWishllist({ product, className }: { product: Product , className?: string }) {
  return (
    <div className={cn("absolute top-2 right-2 z-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200", className)}>
       <div className={`bg-shop_lighter_bg p-2.5 rounded-full hover:bg-shop_dark_green hover:text-white cursor-pointer hoverEffect`}>
          <Heart size={15} />
       </div>
    </div>
  )
}

export default AddToWishllist