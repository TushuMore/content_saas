
const PlatformCards = () => {
  return (
   <>
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-neutral-900 p-4 rounded-2xl">
            <p className="text-sm text-gray-400">Total Ideas</p>
            <h2 className="text-xl font-bold">24</h2>
          </div>
          <div className="bg-neutral-900 p-4 rounded-2xl">
            <p className="text-sm text-gray-400">Instagram</p>
            <h2 className="text-xl font-bold">12</h2>
          </div>
          <div className="bg-neutral-900 p-4 rounded-2xl">
            <p className="text-sm text-gray-400">YouTube</p>
            <h2 className="text-xl font-bold">8</h2>
          </div>
        </div>
   </>
  )
}

export default PlatformCards