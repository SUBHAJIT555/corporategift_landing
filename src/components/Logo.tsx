import LogoWhite from "../assets/logo/logo.svg";

const Logo = () => {
  return (
    <div className="w-28 h-7 sm:w-36 sm:h-9 md:w-44 md:h-11 lg:w-52 lg:h-13 xl:w-60 xl:h-15">
      <img src={LogoWhite} alt="Logo" className="w-full h-full object-contain" />
    </div>
  );
};

export default Logo;
