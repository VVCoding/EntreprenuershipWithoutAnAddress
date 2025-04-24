import Link from 'next/link';
import Image from 'next/image';

const partners = [
  {
    id: 1,
    name: 'The Legal Aid Society',
    description: 'Helps homeless individuals secure legal protection, benefits, and business registration assistance.',
    imageUrl: 'https://ext.same-assets.com/4194579130/2634601129.png',
    link: "https://legalaidnyc.org/what-we-do/advocating-for-financial-rights"
  },
  {
    id: 2,
    name: 'City Bar Justice Center',
    description: 'Provides legal aid to address barriers preventing homeless individuals from starting businesses.',
    imageUrl: 'https://ext.same-assets.com/4194579130/2558854071.png',
    link: "https://www.citybarjusticecenter.org/projects/neighborhood-entrepreneur-law-project/"
  },
  {
    id: 3,
    name: 'VOLS Microenterprise Project',
    description: 'Offers free legal help for low-income entrepreneurs to navigate business registration and contracts.',
    imageUrl: 'https://ext.same-assets.com/4194579130/918307603.png',
    link: "https://volsprobono.org/projects/microenterprise/"
  },
  {
    id: 4,
    name: 'Kiva',
    description: 'Provides 0% interest microloans for entrepreneurs who lack access to traditional bank loans.',
    imageUrl: 'https://ext.same-assets.com/4194579130/825456523.png',
    link: "https://www.kiva.org/borrow"
  },
  {
    id: 5,
    name: 'Harlem Entrepreneurial Fund',
    description: "The Harlem Entrepreneurial Fund (HEF) supports minority and women-owned businesses in NYC with affordable loans and technical assistance.",
    imageUrl: 'https://ext.same-assets.com/4194579130/825456523.png',
    link: "https://www.hefnyc.org/"
  },
  {
    id: 6,
    name: 'Brooklyn Chamber of Commerce',
    description: 'Brooklyn Alliance Capital provides micro-loans and financing up to $50,000 to support minority, immigrant, and low-income entrepreneurs.',
    imageUrl: 'https://ext.same-assets.com/4194579130/825456523.png',
    link: "https://www.brooklynchamber.com/services/financing/"
  },
  {
    id: 7,
    name: 'Start Small Think Big',
    description: 'Start Small Think Big is a nonprofit that helps under-resourced entrepreneurs grow their businesses by offering free legal, financial, and marketing support.',
    imageUrl: 'https://ext.same-assets.com/4194579130/825456523.png',
    link: "https://www.startsmallthinkbig.org/"
  },
  {
    id: 8,
    name: 'Rising Tide Capital',
    description: 'Rising Tide Capital empowers underserved entrepreneurs through comprehensive business education and personalized support, helping them grow and scale their ventures.',
    imageUrl: 'https://ext.same-assets.com/4194579130/825456523.png',
    link: "https://programs.risingtidecapital.org/?_gl=1%2A1xocmbk%2A_ga%2AMzQxNjc4NTY0LjE3NDI3MDY2MjU.%2A_ga_WM1HX693L6%2AMTc0MjcwNjYyNS4xLjEuMTc0MjcwNjc4Ny42MC4wLjA."
  },
  {
    id: 9,
    name: 'Homeless Entrepreneur',
    description: 'Homeless Entrepreneur is a nonprofit that supports individuals experiencing homelessness by offering resources for employment and entrepreneurship.',
    imageUrl: 'https://ext.same-assets.com/4194579130/825456523.png',
    link: "https://www.homelessentrepreneur.org/en/homeless"
  },
  {
    id: 10,
    name: 'SCORE Business Mentoring',
    description: 'SCORE, a resource partner of the SBA, offers free business mentoring to help small businesses succeed.',
    imageUrl: 'https://ext.same-assets.com/4194579130/825456523.png',
    link: "https://www.sba.gov/local-assistance/resource-partners/score-business-mentoring"
  },
  {
    id: 11,
    name: 'Street Vendor Project',
    description: "The Street Vendor Project is a New York City-based organization that advocates for street vendors' rights and provides legal and business support.",
    imageUrl: 'https://ext.same-assets.com/4194579130/825456523.png',
    link: "https://www.streetvendor.org/"
  },
  {
    id: 12,
    name: 'National Coalition for the Homeless',
    description: 'The National Coalition for the Homeless (NCH) is dedicated to preventing and ending homelessness through advocacy, resources, and policy work.',
    imageUrl: 'https://ext.same-assets.com/4194579130/825456523.png',
    link: "https://nationalhomeless.org/"
  },
];

const PartnersSection = () => {
  return (
    <section className="section-container">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div key={partner.id} className="partner-card">
              <div className="mb-4 relative h-14">
                <Image
                  src={partner.imageUrl}
                  alt={partner.name}
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left' }}
                />
              </div>
              <h3 className="font-semibold text-xl mb-2">{partner.name}</h3>
              <p className="text-gray-600 mb-4">{partner.description}</p>
              <Link href={partner.link} className="text-[#4db3cc] font-medium hover:underline">
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
