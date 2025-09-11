import type { LucideProps } from 'lucide-react'

export const CarrotIcon = ({ size = 24, className = '', ...props }: LucideProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 790.79 790.79"
      className={className}
      {...props}
    >
      <defs>
        <clipPath id="clippath">
          <rect fill="none" x="303.96" y="117.86" width="182.88" height="555.08"/>
        </clipPath>
      </defs>
      <g clipPath="url(#clippath)">
        <path 
          fill="#f60" 
          d="M486.83,415.83c0,81.18-40.94,257.1-91.44,257.1s-91.44-175.93-91.44-257.1,40.94-106.01,91.44-106.01,91.44,24.84,91.44,106.01Z"
        />
        <path 
          fill="#00b555" 
          d="M422.08,182.22l-26.67-64.37-26.67,64.37-54.31-42.1c15.06,115.94,50.39,147.84,80.98,147.84s65.92-31.88,80.98-147.84l-54.31,42.1Z"
        />
      </g>
    </svg>
  )
}