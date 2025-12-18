export default function Loader() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 384 384'
      className='w-10 h-10 animate-spin'
    >
      <circle
        r='176'
        cy='192'
        cx='192'
        strokeWidth='32'
        fill='transparent'
        pathLength='360'
        className='active stroke-white'
      />
      <circle
        r='176'
        cy='192'
        cx='192'
        strokeWidth='32'
        fill='transparent'
        pathLength='360'
        className='track stroke-white/30'
      />
    </svg>
  );
}
