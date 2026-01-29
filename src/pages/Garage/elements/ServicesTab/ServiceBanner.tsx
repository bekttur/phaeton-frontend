export function ServiceBanner() {
  return (
    <div className='mx-4 mb-4 bg-gradient-to-tr from-[#1161BF] to-[#25BCDB] rounded-2xl flex items-center justify-between'>
      <div className='flex-1 bg-[url("/garage/services/service-bg.png")] bg-no-repeat bg-right bg-[length:28%] p-4'>
        <h4 className='text-lg text-white font-semibold'>
          Умная запись на сервис
        </h4>
        <p className='text-white/90 text-sm'>
          С кешбеком и выгодными предложениями
        </p>
      </div>
    </div>
  );
}