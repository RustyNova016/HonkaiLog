import * as React from "react"
import { SVGProps, Ref, forwardRef, memo } from "react"
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgComponent = (
  { title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    id="box"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 350"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    ref={ref}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <style>
      {
        "\r\n        #box-u-cardboard-box_to {\r\n        animation: box-u-cardboard-box_to__to 3000ms linear infinite normal forwards\r\n        }@keyframes\r\n        box-u-cardboard-box_to__to { 0% {transform: translate(150.293383px,-173.279668px);animation-timing-function:\r\n        cubic-bezier(0.77,0,0.175,1)} 33.333333% {transform:\r\n        translate(149.868071px,138.116453px);animation-timing-function: cubic-bezier(0.23,1,0.32,1)} 66.666667%\r\n        {transform: translate(149.868071px,138.116453px);animation-timing-function: cubic-bezier(0.23,1,0.32,1)} 100%\r\n        {transform: translate(150.080727px,375.767365px)}} #box-u-cardboard-box {animation: box-u-cardboard-box_c_o\r\n        3000ms linear infinite normal forwards}@keyframes box-u-cardboard-box_c_o { 0% {opacity:\r\n        0;animation-timing-function: cubic-bezier(0.895,0.03,0.685,0.22)} 33.333333% {opacity: 1} 70% {opacity:\r\n        1;animation-timing-function: cubic-bezier(0.165,0.84,0.44,1)} 83.333333% {opacity: 0} 100% {opacity: 0}}\r\n        #box-u-door-r_to {animation: box-u-door-r_to__to 3000ms linear infinite normal forwards}@keyframes\r\n        box-u-door-r_to__to { 0% {transform: translate(233.83369px,225.51624px)} 13.333333% {transform:\r\n        translate(233.83369px,225.51624px)} 30% {transform: translate(233.812282px,225.588086px)} 33.333333% {transform:\r\n        translate(233.833692px,225.51624px)} 70% {transform: translate(233.833692px,225.51624px)} 76.666667% {transform:\r\n        translate(233.83369px,225.219919px)} 100% {transform: translate(233.83369px,225.219919px)}} #box-u-door-r_tr\r\n        {animation: box-u-door-r_tr__tr 3000ms linear infinite normal forwards}@keyframes box-u-door-r_tr__tr { 0%\r\n        {transform: rotate(0.000001deg)} 33.333333% {transform: rotate(0.000001deg)} 63.333333% {transform:\r\n        rotate(-0.114406deg);animation-timing-function: cubic-bezier(0.23,1,0.32,1)} 83.333333% {transform:\r\n        rotate(-120deg);animation-timing-function: cubic-bezier(0.445,0.05,0.55,0.95)} 100% {transform:\r\n        rotate(-0.114406deg)}} #box-u-door-l_to {animation: box-u-door-l_to__to 3000ms linear infinite normal\r\n        forwards}@keyframes box-u-door-l_to__to { 0% {transform: translate(65.738164px,225.503586px)} 13.333333%\r\n        {transform: translate(65.738164px,225.503586px)} 30% {transform: translate(65.738164px,225.503586px)} 33.333333%\r\n        {transform: translate(65.738164px,225.503585px)} 50.666667% {transform: translate(65.738163px,225.710123px)} 70%\r\n        {transform: translate(65.738164px,225.722786px)} 76.666667% {transform: translate(65.738164px,225.503586px)}\r\n        100% {transform: translate(65.738164px,225.503586px)}} #box-u-door-l_tr {animation: box-u-door-l_tr__tr 3000ms\r\n        linear infinite normal forwards}@keyframes box-u-door-l_tr__tr { 0% {transform: rotate(0.000001deg)} 33.333333%\r\n        {transform: rotate(0.000001deg)} 63.333333% {transform: rotate(-0.114406deg);animation-timing-function:\r\n        cubic-bezier(0.23,1,0.32,1)} 83.333333% {transform: rotate(120deg);animation-timing-function:\r\n        cubic-bezier(0.445,0.05,0.55,0.95)} 100% {transform: rotate(-0.114406deg)}}\r\n    "
      }
    </style>
    <g>
      <g
        id="box-u-cardboard-box_to"
        transform="translate(150.293383,-173.279668)"
      >
        <g
          id="box-u-cardboard-box"
          transform="translate(-152.476025,-92.322891)"
        >
          <path
            id="box-u-rectangle"
            d="M0.005336,26.432726c0,0,.000003-44.476224.000002-44.476224c0-18.130404,16.23066-18.130404,24.706684-18.130404c18.775955,0,43.810563,0,62.586518,0c11.044819,0,24.706684-.448459,24.706684,18.130404-.158633,0,0,44.476224,0,44.476224"
            transform="matrix(1.000001 0 0 1 96.384573 69.068466)"
            fill="#ca936c"
            stroke="#000"
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="box-u-rectangle2"
            d="M0,20C-0.01562,0,24.706709,0,24.706709,0h62.586582C87.293291,0,112,0,112,20v50.663633c0,11.045695-11.06157,20-24.706709,20h-62.586582C11.06157,90.663633,0,81.709328,0,70.663633L0,20Z"
            transform="translate(96.389909 61.080733)"
            fill="#e9bb91"
            stroke="#000"
            strokeWidth={10}
            strokeLinejoin="round"
          />
          <rect
            id="box-s-rect1"
            width={48}
            height={15}
            rx={7.53}
            ry={7.53}
            transform="translate(128.607954 80.501192)"
            strokeWidth={0}
          />
          <line
            id="box-s-line1"
            x1={0}
            y1={-13.220902}
            x2={0}
            y2={13.220902}
            transform="translate(152.607954 46.115466)"
            fill="none"
            stroke="#000"
            strokeWidth={10}
          />
        </g>
      </g>
      <rect
        id="box-s-rect2"
        width={163.632636}
        height={33.565669}
        rx={10}
        ry={10}
        transform="matrix(1.181676 0 0 0.824281 53.319621 211.682469)"
        strokeWidth={0}
      />
      <g id="box-u-door-r_to" transform="translate(233.83369,225.51624)">
        <g id="box-u-door-r_tr" transform="rotate(0.000001)">
          <rect
            id="box-u-door-r"
            width={115.853659}
            height={33.565669}
            rx={10}
            ry={10}
            transform="scale(0.82,0.82) translate(-102.473135,-16.782835)"
            strokeWidth={0}
          />
        </g>
      </g>
      <g id="box-u-door-l_to" transform="translate(65.738164,225.503586)">
        <g id="box-u-door-l_tr" transform="rotate(0.000001)">
          <rect
            id="box-u-door-l"
            width={115.853659}
            height={33.565669}
            rx={10}
            ry={10}
            transform="scale(-0.82,-0.82) translate(-102.473135,-16.782835)"
            strokeWidth={0}
          />
        </g>
      </g>
    </g>
  </svg>
)

const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)
export default Memo
