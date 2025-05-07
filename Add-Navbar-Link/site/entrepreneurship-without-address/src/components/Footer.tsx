import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-lg font-bold">
              <span className="text-black">Entrepreneurship</span>
              <span className="text-[#bd6650]"> Without</span>
              <span className="text-[#4db3cc]"> An</span>
              <span className="text-[#f6abb3]"> Address</span>
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Entrepreneurship Without An Address. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
