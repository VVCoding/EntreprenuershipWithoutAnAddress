import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutUs() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-primary mb-6 text-center">About Us</h1>

          <div className="prose prose-lg mx-auto">
            <p>
              Entrepreneurship Without an Address is a platform dedicated to breaking down the barriers
              that prevent homeless individuals from starting and running successful businesses.
            </p>

            <p>
              Our mission is to empower homeless entrepreneurs with the resources, guidance, and
              support they need to achieve financial independence through business ownership.
            </p>

            <h2 className="mt-8 mb-4 text-2xl font-bold">Our Mission</h2>
            <p>
              We believe entrepreneurship should be accessible to everyone, regardless of housing status.
              By connecting homeless entrepreneurs with mentors, resources, and funding opportunities,
              we aim to create pathways out of homelessness through business ownership.
            </p>

            <h2 className="mt-8 mb-4 text-2xl font-bold">Our Team</h2>
            <p>
              Our team consists of business professionals, legal experts, social workers, and former
              homeless entrepreneurs who understand the unique challenges facing homeless individuals
              in the business world.
            </p>

            <h2 className="mt-8 mb-4 text-2xl font-bold">Join Us</h2>
            <p>
              Whether you're a homeless entrepreneur looking for support, a business professional
              wanting to mentor, or someone interested in contributing to our cause, we welcome you
              to join our community.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
