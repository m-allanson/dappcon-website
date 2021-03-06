import React from 'react'

const Ticket = ({ width = 45, height = 27, fill = '#FFF', gStyle = {}, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 45 27"
    {...props}
  >
    <g fill="none" fillRule="evenodd" stroke={fill} strokeWidth="3" style={gStyle}>
      <path d="M41.5 19.17a6.363 6.363 0 0 1 0-11.34V3a.5.5 0 0 0-.5-.5H4a.5.5 0 0 0-.5.5v4.83a6.363 6.363 0 0 1 0 11.34V24a.5.5 0 0 0 .5.5h37a.5.5 0 0 0 .5-.5v-4.83z" />
      <path strokeDasharray="3,6" strokeLinecap="square" d="M26.5 3.355V23.5" />
    </g>
  </svg>
)

export default Ticket
