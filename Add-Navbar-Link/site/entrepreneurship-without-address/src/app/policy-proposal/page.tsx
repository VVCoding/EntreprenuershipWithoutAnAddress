import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PolicyProposal() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-primary mb-6 text-center">Policy Proposal</h1>

          <div className="prose prose-lg mx-auto mt-12">
            <p className="font-medium text-lg">
              Homeless individuals in New York City face significant legal, financial, and bureaucratic barriers
              that prevent them from establishing small businesses as a path toward economic stability. Current
              policies and administrative hurdles disproportionately disadvantage those without permanent addresses,
              limiting access to necessary licensing, financing, and tax registration. Without intervention, these
              barriers will continue to prevent thousands of capable entrepreneurs from contributing to the local
              economy and improving their circumstances.
            </p>

            <h2 className="mt-8 text-2xl font-bold">Background</h2>
            <p>
              Data from the U.S. Department of Housing and Urban Development shows that in 2023, New York City had
              over 70,000 homeless individuals on a given night. Despite this, homeless entrepreneurs who attempt
              to start businesses face multiple obstacles. A study from the Institute for Justice found that over
              70% of licensing laws disproportionately impact low-income entrepreneurs, requiring excessive fees
              and unnecessary training that are often inaccessible to those in shelters. Additionally, the National
              Law Center on Homelessness & Poverty reports that homeless individuals often struggle to obtain the
              necessary documentation required to register a business, open a bank account, or secure funding.
            </p>

            <h2 className="mt-8 text-2xl font-bold">Precedents</h2>
            <p>
              Attempts have been made in other jurisdictions to reduce barriers for low-income entrepreneurs. For
              instance, California recently passed legislation waiving business licensing fees for low-income
              applicants, easing the financial burden of registration. Similarly, Washington, D.C., implemented
              an ID exemption program that allows homeless individuals to register businesses without requiring
              a permanent address. New York City must follow suit and introduce targeted policy reforms to enable
              its homeless population to pursue self-sufficiency through entrepreneurship.
            </p>

            <h2 className="mt-8 text-2xl font-bold">Policy Recommendations</h2>
            <p>
              Several existing policies directly inhibit homeless individuals from establishing businesses. First,
              the requirement for a fixed address in business licensing applications should be amended to accept
              shelter addresses or designated business incubator spaces. Second, New York City must create a fee
              waiver program that eliminates or reduces the cost of permits and licenses for homeless entrepreneurs.
              Third, a streamlined identification process should be implemented, allowing shelters and advocacy
              organizations to verify identities for business registration purposes.
            </p>

            <h2 className="mt-8 text-2xl font-bold">Benefits</h2>
            <p>
              Implementing these changes will benefit not only homeless entrepreneurs but also the broader community.
              According to a study by the U.S. Small Business Administration, small businesses generate 44% of
              economic activity in the United States. Enabling homeless individuals to start businesses would
              increase local employment opportunities, reduce reliance on public assistance, and contribute to
              New York City's economy. Addressing this issue now is critical, as the city continues to recover
              from the economic impact of the COVID-19 pandemic, which disproportionately affected low-income
              individuals.
            </p>

            <h2 className="mt-8 text-2xl font-bold">Consequences of Inaction</h2>
            <p>
              Failure to act will perpetuate the cycle of homelessness and economic exclusion, costing the city
              millions in social services and lost economic output. By implementing these reforms, New York City
              would set a precedent for inclusive economic policies that promote entrepreneurship among all its
              residents, regardless of their housing status. Furthermore, this initiative would alleviate strain
              on homeless shelters and public assistance programs by providing individuals with a sustainable path
              to financial independence.
            </p>

            <h2 className="mt-8 text-2xl font-bold">Implementation Strategy</h2>
            <p>
              Given the intersectionality of this issue, collaboration between the Department of Small Business
              Services, the NYC Mayor's Office of Economic Opportunity, and local nonprofit organizations will be
              essential for successful policy implementation. I urge you to introduce and advocate for these reforms
              to ensure that entrepreneurship is a viable pathway out of homelessness in New York City.
            </p>

            <p className="mt-8">
              Thank you for your time and consideration. I look forward to your response and the opportunity to
              discuss this proposal further.
            </p>

            <div className="mt-12">
              <p className="mb-1">Sincerely,</p>
              <p className="font-semibold">Vedant Vohra</p>
              <p>Entrepreneurship Without An Address</p>
              <p className="text-[#4db3cc]">vohra.vedant@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
