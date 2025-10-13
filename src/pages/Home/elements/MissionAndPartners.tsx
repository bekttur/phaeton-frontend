const MissionAndPartners = () => {
  const logos = [
    'logo/partners/1.svg',
    'logo/partners/2.svg',
    'logo/partners/3.svg',
    'logo/partners/4.svg',
    'logo/partners/5.svg',
    'logo/partners/6.svg',
    'logo/partners/7.svg',
  ];

  return (
    <div className="w-full px-2 py-6 flex flex-col items-start gap-5 overflow-hidden">
      <p className="text-3xl text-black font-semibold">
        Магазин <span className="text-[#4EBC73]">Phaeton</span>
      </p>

      <div className="flex flex-col gap-4 w-full">
        {/* Миссия */}
        <div className="flex flex-col gap-1">
          <p className="text-lg text-[#62C382] font-semibold">Миссия и цели</p>
          <p className="text-base text-[#14181F]">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
        </div>

        {/* Партнёры */}
        <div className="flex flex-col gap-1">
          <p className="text-lg text-[#62C382] font-semibold">Наши партнёры</p>
          <p className="text-base text-[#14181F]">
            Мы сотрудничаем с ведущими брендами и поставщиками автозапчастей.
          </p>
        </div>

        <hr className="my-2" />

        {/* Карусель логотипов */}
        <div className="relative w-full overflow-hidden">
          <div className="scroll-container">
            <div className="scroll-content">
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <img
                  key={index}
                  src={`${import.meta.env.BASE_URL}${logo}`}
                  alt={`partner-${index}`}
                  className="w-fit h-[60px] object-contain opacity-90 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionAndPartners;
