export const OrganicTrashIcon = ({ size = 100, color = "#16A085" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bin Body */}
    <path
      d="M20 35 L22 85 C22 87.7614 24.2386 90 27 90 L73 90 C75.7614 90 78 87.7614 78 85 L80 35 Z"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />

    {/* Bin Lid */}
    <rect
      x="15"
      y="28"
      width="70"
      height="10"
      rx="5"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />

    {/* Lid Handle */}
    <rect
      x="40"
      y="20"
      width="20"
      height="8"
      rx="4"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />

    {/* Leaf Icon - Positioned in center */}
    <g transform="translate(35, 50) scale(1.3)">
      <path
        d="M8 18C19.9545 18 20.9173 7.82917 20.9935 2.99666C21.0023 2.44444 20.54 1.99901 19.9878 2.00915C3 2.32115 3 10.5568 3 18V22"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 18C3 18 3 12 11 11"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
export const PlasticTrashIcon = ({ size = 100, color = "#3498DB" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bin Body */}
    <path
      d="M20 35 L22 85 C22 87.7614 24.2386 90 27 90 L73 90 C75.7614 90 78 87.7614 78 85 L80 35 Z"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />

    {/* Bin Lid */}
    <rect
      x="15"
      y="28"
      width="70"
      height="10"
      rx="5"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />

    {/* Lid Handle */}
    <rect
      x="40"
      y="20"
      width="20"
      height="8"
      rx="4"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />

    {/* Bottle Icon Group - translated and scaled */}
    <g transform="translate(30, 42) scale(0.5)">
      <g>
        <path
          d="M31,33l0,25.83c0,1.624,1.216,3.081,2.839,3.165C35.569,62.086,37,60.71,37,59c0,1.657,1.343,3,3,3s3-1.343,3-3
        c0,1.71,1.431,3.086,3.161,2.996C47.784,61.911,49,60.455,49,58.83V33c0-4.971-4.029-9-9-9h0C35.029,24,31,28.029,31,33z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
        />
        <path
          d="M41.6,18h-3.2c-1.325,0-2.4,1.075-2.4,2.4v1.2c0,1.325,1.075,2.4,2.4,2.4h3.2c1.325,0,2.4-1.075,2.4-2.4v-1.2
        C44,19.075,42.925,18,41.6,18z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
        />
        <line
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
          x1={31}
          x2={49}
          y1={41}
          y2={41}
        />
        <line
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
          x1={31}
          x2={49}
          y1={52}
          y2={52}
        />
      </g>
      <g>
        <polyline
          fill="none"
          points="5.055,17.84 13.99,16.581 15.256,25.527"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
        />
        <path
          d="M10.565,58.929C7.37,53.972,5.379,48.144,5.048,41.832C4.542,32.18,7.996,23.238,13.99,16.581"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
        />
        <polyline
          fill="none"
          points="17.84,74.945 16.581,66.01 25.527,64.744"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
        />
        <path
          d="M58.929,69.435c-4.958,3.195-10.785,5.187-17.097,5.517c-9.652,0.506-18.595-2.948-25.251-8.942"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
        />
        <polyline
          fill="none"
          points="74.945,62.16 66.01,63.419 64.744,54.473"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
        />
        <path
          d="M69.435,21.071c3.195,4.958,5.187,10.785,5.517,17.097c0.506,9.652-2.948,18.595-8.942,25.251"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
        />
        <polyline
          fill="none"
          points="62.16,5.055 63.419,13.99 54.473,15.256"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
        />
        <path
          d="M21.071,10.565c4.958-3.195,10.785-5.187,17.097-5.517c9.652-0.506,18.595,2.948,25.251,8.942"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={4}
        />
      </g>
    </g>
  </svg>
);

export const TrashIcon = ({ size = 100, color = "#000" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bin Body */}
    <path
      d="M20 35 L22 85 C22 87.7614 24.2386 90 27 90 L73 90 C75.7614 90 78 87.7614 78 85 L80 35 Z"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />

    {/* Bin Lid */}
    <rect
      x="15"
      y="28"
      width="70"
      height="10"
      rx="5"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />

    {/* Lid Handle */}
    <rect
      x="40"
      y="20"
      width="20"
      height="8"
      rx="4"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />
  </svg>
);

export const leafIconMarker = (size = 20, color = "#16A085") => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(3, 5)">
      <path
        d="M8 18C19.9545 18 20.9173 7.82917 20.9935 2.99666C21.0023 2.44444 20.54 1.99901 19.9878 2.00915C3 2.32115 3 10.5568 3 18V22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.3"
      />
      <path
        d="M3 18C3 18 3 12 11 11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

export const plasticIconMarker = (size = 20, color = "#3498DB") => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <g>
        <path
          d="M31,33l0,25.83c0,1.624,1.216,3.081,2.839,3.165C35.569,62.086,37,60.71,37,59c0,1.657,1.343,3,3,3s3-1.343,3-3
            c0,1.71,1.431,3.086,3.161,2.996C47.784,61.911,49,60.455,49,58.83V33c0-4.971-4.029-9-9-9h0C35.029,24,31,28.029,31,33z"
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="6"
        />
        <path
          d="M41.6,18h-3.2c-1.325,0-2.4,1.075-2.4,2.4v1.2c0,1.325,1.075,2.4,2.4,2.4h3.2c1.325,0,2.4-1.075,2.4-2.4v-1.2
            C44,19.075,42.925,18,41.6,18z"
          fill={color}
          fillOpacity="0.4"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="6"
        />
        <line
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="3"
          x1="31"
          x2="49"
          y1="41"
          y2="41"
        />
        <line
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="3"
          x1="31"
          x2="49"
          y1="52"
          y2="52"
        />
      </g>
      <g>
        <polyline
          fill="none"
          points="5.055,17.84 13.99,16.581 15.256,25.527"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="6"
        />
        <path
          d="M10.565,58.929C7.37,53.972,5.379,48.144,5.048,41.832C4.542,32.18,7.996,23.238,13.99,16.581"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="6"
        />
        <polyline
          fill="none"
          points="17.84,74.945 16.581,66.01 25.527,64.744"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="6"
        />
        <path
          d="M58.929,69.435c-4.958,3.195-10.785,5.187-17.097,5.517c-9.652,0.506-18.595-2.948-25.251-8.942"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="6"
        />
        <polyline
          fill="none"
          points="74.945,62.16 66.01,63.419 64.744,54.473"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="6"
        />
        <path
          d="M69.435,21.071c3.195,4.958,5.187,10.785,5.517,17.097c0.506,9.652-2.948,18.595-8.942,25.251"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="6"
        />
        <polyline
          fill="none"
          points="62.16,5.055 63.419,13.99 54.473,15.256"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="6"
        />
        <path
          d="M21.071,10.565c4.958-3.195,10.785-5.187,17.097-5.517c9.652-0.506,18.595,2.948,25.251,8.942"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="6"
        />
      </g>
    </g>
  </svg>
)
