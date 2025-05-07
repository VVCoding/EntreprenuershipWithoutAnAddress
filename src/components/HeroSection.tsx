import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="heading-primary mb-4">
            Entrepreneurship
            <br />
            <span className="text-[#bd6650]">Without</span> an <span className="text-[#4db3cc]">Address</span>.
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            A platform for policy change to permit business registration, prevent startup capital, higher
            education barriers, and reduce employment and income inequality.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md h-[400px]">
            <Image
              src="https://ext.same-assets.com/4194579130/825456523.png"
              alt="Entrepreneurship Without An Address illustration"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
