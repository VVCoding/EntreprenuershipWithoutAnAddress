import Image from 'next/image';
import Link from 'next/link';

const BarriersSection = () => {
  return (
    <section className="section-container">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading-secondary mb-4 text-center">
          Breaking Barriers To Business<br />
          <span className="text-[#bd6650]">Ownership</span>.
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Empowering homeless entrepreneurs with the essentials: funding, and support they need
          to succeed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6 relative h-48">
              <Image
                src="https://ext.same-assets.com/4194579130/2204497967.png"
                alt="Start a business with no address"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3 className="heading-tertiary mb-3">Start a business with no Address</h3>
            <p className="text-gray-600 mb-4">
              Learn how to register a business without a permanent address, and use alternatives
              like virtual mailboxes and PO boxes.
            </p>
            <Link href="#" className="text-[#4db3cc] font-medium hover:underline">
              Learn more →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6 relative h-48">
              <Image
                src="https://ext.same-assets.com/4194579130/3467030637.png"
                alt="Access Microloans and Grants"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3 className="heading-tertiary mb-3">Access Microloans and Grants</h3>
            <p className="text-gray-600 mb-4">
              Find financial support designed specifically for homeless entrepreneurs and small business
              owners with limited resources.
            </p>
            <Link href="#" className="text-[#4db3cc] font-medium hover:underline">
              Find funding →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6 relative h-48">
              <Image
                src="https://ext.same-assets.com/4194579130/1059032794.png"
                alt="Learn from Experts"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h3 className="heading-tertiary mb-3">Learn from Experts</h3>
            <p className="text-gray-600 mb-4">
              Get business mentorship and guidance from experienced entrepreneurs who understand
              the unique challenges you face.
            </p>
            <Link href="#" className="text-[#4db3cc] font-medium hover:underline">
              Find mentoring →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BarriersSection;
