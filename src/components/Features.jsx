import { useRef, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={`${className} cursor-pointer`}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  id,
  src,
  title,
  description,
  titleClass,
  descriptionClass,
  isComing = false,
  link = "#",
  activeCardId,
  setActiveCardId,
}) => {
  const isVisible = activeCardId === id;

  const handleCardClick = () => {
    if (!isVisible) {
      setActiveCardId(id); // buka overlay kartu ini
    } else {
      window.open(link, "_blank"); // jika sudah terbuka, buka link
      setActiveCardId(null); // tutup overlay
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setActiveCardId(null);
  };

  return (
    <div
      id="project"
      className="relative size-full cursor-pointer"
      onClick={handleCardClick}
    >
      {isComing && (
        <div className="absolute text-7xl flex items-end justify-end font-zentry text-violet-300 bg-gray-900/50 backdrop-blur-md z-10 inset-0">
          Coming Soon
        </div>
      )}

      {isVisible && (
        <div className="absolute z-50 inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm text-blue-50 transition-opacity duration-300">
          {/* Close button */}
          <button
            onClick={handleCloseClick}
            className="absolute top-4 right-4 text-3xl text-white hover:text-red-400 transition"
          >
            <IoMdClose />
          </button>

          {/* Visit message */}
          <div className="flex gap-x-4 items-center text-2xl md:text-4xl xl:text-5xl font-general font-black">
            Visit The Website <FaExternalLinkAlt />
          </div>
        </div>
      )}

      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      <div className="relative bg-black/55 lg:bg-transparent z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className={`bento-title special-font ${titleClass}`}>{title}</h1>
          {description && (
            <p
              className={`mt-3 max-w-64 text-xs md:text-base ${descriptionClass}`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      {title}
    </div>
  );
};

export default function Features() {
  const [activeCardId, setActiveCardId] = useState(null);

  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Take a look into my project showcase
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Here’s where ideas turn into real websites. My project showcase is
            filled with things I’ve built, explored, and had fun creating — feel
            free to dive in!
          </p>
        </div>
        <BentoTilt className="border-hsla relative mb-7 h-100 size-full w-full overflow-hidden rounded-md md:h-[77vh]">
          <BentoCard
            id="card-1"
            src="videos/wj-mockup.mp4"
            link="https://warungjurnalis.com/"
            title={
              <>
                W<b>a</b>rung J<b>u</b>rn<b>a</b>lis
              </>
            }
            description="As a Frontend Engineer Intern, I had the chance to build the news portal for PT Dunia Jurnalis Indonesia, also known as Warung Jurnalis. I designed and developed the frontend from scratch using Next.js, TailwindCSS, and shadcn/ui. I also made sure the site was fast and SEO-friendly by applying Server-Side Rendering (SSR) and SEO optimizations."
            descriptionClass="lg:!max-w-90"
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
          />
        </BentoTilt>
        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7 ">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              id="card-2"
              src="videos/feature-2.mp4"
              title={
                <>
                  zig<b>m</b>a
                </>
              }
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion"
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-2 md:ms-0">
            <BentoCard
              id="card-3"
              src="videos/rsthb-mockup.mp4"
              link="https://rstamanharapanbaru.com/"
              title={
                <>
                  RS T<b>a</b>man Har<b>a</b>pan Bar<b>u</b> Bekasi
                </>
              }
              titleClass="!text-3xl lg:!text-6xl !text-blue-50"
              description="Built the official website for RS Taman Harapan Baru as a Fullstack Freelance Developer using WordPress, PHP, and Animate.css, featuring doctor schedules, hospital info, and WhatsApp-based registration."
              descriptionClass="!text-blue-50 !max-w-60"
              activeCardId={activeCardId}
              setActiveCardId={setActiveCardId}
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 md:col-span-1 md:me-0">
            <BentoCard
              id="card-4"
              src="videos/stevara-mockup.mp4"
              link="https://stevara.id/"
              isComing={true}
              title={
                <>
                  st<b>e</b>vara.id
                </>
              }
              description="Built a sleek company profile site for stevara.id using Vue.js, TailwindCSS, and GSAP. It’s packed with smooth animations and a modern layout — still in progress and not live yet.
              
"
              activeCardId={activeCardId}
              setActiveCardId={setActiveCardId}
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div
              onClick={() =>
                window.open("https://github.com/garincsr", "_blank")
              }
              className="flex size-full flex-col justify-between bg-violet-300 p-5"
            >
              <h1 className="bento-title special-font max-w-64 text-black">
                M<b>o</b>re <b>o</b>n GitHub
              </h1>
              <FaGithub className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
}
