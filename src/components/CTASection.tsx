import MyButton from './MyButton'

const CTASection = () => {
  return (
    <section className="section-container border-t border-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="heading-secondary mb-4">Join The Team</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Help bring business entrepreneurship everywhere.
        </p>
        <MyButton className="btn-primary">
          Get Involved
        </MyButton>
      </div>
    </section>
  );
};

export default CTASection;
