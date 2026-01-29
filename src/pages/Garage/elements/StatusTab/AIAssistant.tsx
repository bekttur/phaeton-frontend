export function AIAssistant() {
  return (
    <div className='mx-4 mb-4 bg-white rounded-2xl p-4'>
      <div className='flex items-center gap-3 mb-3'>
        <div className='w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center'>
          <img
            className='w-6 h-6'
            src={`${import.meta.env.BASE_URL}icon/assistent.svg`}
            alt=''
          />
        </div>
        <div>
          <h3 className='font-semibold text-[#303A45] mb-[-3px]'>Freedom AI</h3>
          <p className='text-sm text-[#636366]'>ваш умный ассистент</p>
        </div>
      </div>

      <div className='space-y-3 mb-4 bg-[#F7F7F7] p-3 rounded-[10px]'>
        <p className='text-base text-[#242424]'>
          <span className='font-semibold'>BMX X5 2024</span> в отличной форме 💪
        </p>
        <p className='text-base text-[#242424]'>
          Через 1800 км пора поменять масло — я подскажу, где лучше
        </p>
        <p className='text-base text-[#242424]'>
          Для вашей машины сейчас часто берут масло Liqui Moly 5W-30
        </p>
      </div>

      <button className='w-full py-3 bg-[#EAECED] rounded-2xl text-[#636366] font-medium'>
        Посмотреть
      </button>
    </div>
  );
}
