import Music from "../../asset/music.png"
const Logo = () => {
    return (
      <aside className="basis-[15%]">
        <figure>
        <img src={Music} alt="" 
        className="inline-block h-[70px] w-[130px] fir ml-6 scale-125 cursor-pointer" />
        </figure>
      </aside>
    );
  };
  
  export default Logo;
  