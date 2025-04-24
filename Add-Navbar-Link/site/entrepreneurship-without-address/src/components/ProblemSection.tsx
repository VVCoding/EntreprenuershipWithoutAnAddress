const ProblemSection = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">The Problem</h2>
        <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Homeless entrepreneurs face legal, financial, and bureaucratic barriers that block
          paths to opportunity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-2">$80,000+</h3>
            <p className="text-gray-300">The highest average cost of living in high barrier regions</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-2">$13,000</h3>
            <p className="text-gray-300">Average 9-month education program cost for business entrepreneurs</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-2">$30,000+</h3>
            <p className="text-gray-300">Median startup capital for new businesses in the United States</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
