import TrendingList from 'components/TredingList'

const Treding = () => {
  return (
    <>
    {/* Se importa la lista de trending */}
      <div className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between'>
        <div className='space-y-0.5'>
          <p className='text-[#6e767d] text-xs font-medium' />
          <h6 className='font-bold max-w-[250px] text-sm' />
          <p className='text-[#6e767d] text-xs font-medium max-w-[250px]'>
            Trending with{' '}
          </p>
          <span className='tag'>
            <TrendingList />
            <TrendingList />
            <TrendingList />
            <TrendingList />
          </span>
        </div>
      </div>
    </>
  )
}

export default Treding
