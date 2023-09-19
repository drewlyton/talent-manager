import { useState } from "react";
import { Button } from "../ui/button";

export default function Affiliate() {
  const [hideAffiliate, setHide] = useState(false);

  function toggleAffiliate() {
    setHide((x) => !x);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h3 className="flex-1 font-mono uppercase">Offers</h3>
        <Button
          className="font-mono"
          size={"sm"}
          onClick={toggleAffiliate}
          variant={hideAffiliate ? "outline" : "default"}
        >
          {hideAffiliate ? "Show All" : "👋 Goodbye"}
        </Button>
      </div>
      <div className="relative">
        <div
          className={`top-0 inset-0 absolute z-10 dark:bg-slate-900 bg-slate-100 h-fit ${
            hideAffiliate ? "opacity-0" : ""
          }`}
        >
          <div className="flex flex-col gap-3">
            <DealCard title="Axie Forever" />
            <DealCard title="League of Scam" type="Flat" />
            <DealCard title="CryptoPuppies" type="CPM" />
          </div>
        </div>
        <div className="h-[19rem] z-0 overflow-hidden">
          <div className="bg-slate-800 rounded-md px-4 py-6 h-full relative">
            <div className="w-[5rem] absolute bottom-24 left-[calc(35%-5rem)]">
              <Flag />
            </div>
            <div className="absolute bottom-16 right-[calc(65%+2px)]">
              <div className="relative">
                <Flagpole className="h-20 absolute bottom-0 left-0" />
                <RepbotLookUp className="w-12 absolute bottom-0 left-[3px]" />
              </div>
            </div>
            <div className="absolute border-t bottom-0 h-16 dark:bg-slate-800 z-10 left-0 w-full"></div>
            <div>
              <div className="firework"></div>

              <div className="firework"></div>
              <div className="firework"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DealCard({ title = "", type = "Affiliate" }) {
  return (
    <div className="border dark:border-slate-400 rounded-md p-4 flex flex-col gap-2">
      <div className="flex items-center">
        <h4 className="flex-1 ">{title}</h4>
        <p className="font-mono">$_</p>
      </div>
      <div className="flex items-center gap-2 uppercase">
        <div className="text-xs border border-yellow-500 rounded inline-block px-2 py-1 text-yellow-500">
          Spam
        </div>
        <div className="text-xs border border-slate-300 text-slate-300 rounded inline-block px-2 py-1">
          {type}
        </div>
      </div>
    </div>
  );
}

function Flag({ numOfColumns = 6, staggeredDelay = 100, billow = 1 }) {
  return (
    <div className="flag">
      {new Array(numOfColumns).fill(1).map((_, columnIndex) => (
        <div
          key={columnIndex}
          className="flag-column"
          style={{
            animationDelay: columnIndex * staggeredDelay + "ms",
            // @ts-ignore
            "--billow": columnIndex * billow + "px",
          }}
        />
      ))}
    </div>
  );
}

<svg
  width="603"
  height="962"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
></svg>;

const Flagpole = ({ className = "" }) => (
  <svg
    viewBox="0 0 72 962"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    id="repbot-look-up"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M55 66.5835C65.2065 60.2295 72 48.9082 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 48.9082 6.79346 60.2295 17 66.5835V962H55V66.5835Z"
      fill="currentColor"
    />
  </svg>
);

const RepbotLookUp = ({ className = "" }) => (
  <svg
    viewBox="0 0 572 480"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M163.766 477.805C117.067 469.834 80.5104 433.773 57.5776 394.086C57.8292 393.896 102.825 386.642 108.336 398.257C127.821 422.914 158.009 443.562 190.727 439.284C228.419 430.113 253.733 398.073 281.299 373.14C301.213 354.571 322.822 333.754 350.807 329.78C384.343 329.565 417.877 329.349 451.413 329.136C447.975 343.056 441.036 355.732 434.535 368.413C406.507 369.185 378.025 368.156 350.278 370.047C317.184 386.731 295.367 418.369 266.606 440.911C238.837 465.739 202.11 485.735 163.766 477.805ZM283.681 452.993C293.562 443.749 303.187 434.229 313.367 425.31C334.538 438.376 360.932 444.334 384.918 436.035C424.437 423.834 450.308 387.135 465.287 350.372C484.12 302.847 488.464 250.547 483.075 200.02C476.483 147.366 456.411 92.8203 413.974 58.7311C359.185 16.1844 326.017 61.7252 317.327 46.4269C309.158 39.1687 301.168 31.7015 292.528 24.9955C318.219 7.38669 349.754 -4.35432 381.162 1.5358C427.908 9.88625 464.934 45.6932 487.541 85.871C510.8 126.748 522.338 173.89 524.276 220.667C524.735 249.372 524.718 278.164 518.762 306.396C508.674 360.561 485.096 415.122 441.295 450.307C417.189 469.297 386.848 480.828 355.944 479.029C329.757 478.981 305.122 467.182 283.681 452.993ZM171.109 373.097L0 372.636V332.957C63.8437 333.458 127.894 332.705 191.609 333.989C215.205 340.593 233.384 357.81 251.187 373.746C242.722 383.623 232.197 392.266 222.202 400.834C207.244 387.789 192.615 371.158 171.109 373.097ZM534.329 329.195L565.865 329.712L566.375 368.886H521.817C526.407 355.803 530.912 342.645 534.329 329.195ZM28.7916 161.424C29.6531 160.626 77.0308 151.391 67.6503 168.496C56.2345 218.123 58.1248 272.745 68.1653 313.194H27.6317C21.3912 281.09 14.2393 227.376 28.7916 161.424ZM277.199 90.4C250.917 66.4096 220.932 40.1957 183.46 39.334C154.814 40.3322 128.859 56.0259 110.529 77.4191C106.219 81.1101 58.6034 83.0789 62.5859 76.1889C79.9135 48.6758 103.766 23.9887 134.187 11.3041C168.376 -5.13164 210.454 -3.09679 243.295 15.872C285.115 36.7723 313.895 75.3854 351.6 101.967C373.414 110.017 406.206 106.455 430.44 106.465C438.853 118.671 444.857 132.337 450.211 146.111C423.55 145.669 360.915 146.84 352.915 144.901C322.029 135.915 300.517 111.022 277.199 90.4ZM519.884 106.467H571.056V146.114H533.241C529.048 132.821 524.902 119.481 519.884 106.467ZM9.5619 99.8597H193.428C207.671 95.8317 218.566 84.5294 230.522 77.2048C240.835 85.3294 251.301 93.2725 260.821 102.339C242.16 118.061 221.82 135.495 197.047 139.04C133.253 139.212 69.4581 139.385 5.66345 139.556C7.04572 129.25 5.64727 106.64 9.5619 99.8597Z"
      fill="currentColor"
    />
    <path
      d="M194.987 228.046C197.31 246.012 206.434 258.414 221.931 261.06C232.433 262.587 243.21 259.173 250.791 251.717C259.555 242.284 262.86 229.19 261.255 216.777C257.766 198.615 257.104 179.249 248.617 162.477C242.606 153.764 231.962 146.961 221 147.222C205.394 147.505 191.388 158.859 188.691 174.407C189.474 192.168 193.119 210.188 194.987 228.046Z"
      fill="currentColor"
    />
    <path
      d="M326.977 210.98C329.007 226.681 338.425 241.348 353.921 243.995C365.458 245.644 378.921 241.261 385.367 230.998C395.094 220.094 393.857 205.223 392.135 192.278C390.429 179.09 386.604 159.961 380.546 145.238C374.364 136.657 363.938 129.873 352.99 130.156C337.385 130.441 323.378 141.793 320.68 157.341C321.465 175.102 325.111 193.122 326.977 210.98Z"
      fill="currentColor"
    />
  </svg>
);
