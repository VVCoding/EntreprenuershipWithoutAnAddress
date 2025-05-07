'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const resources = [
  {
    id: 1,
    question: 'What are the biggest challenges homeless entrepreneurs face when starting a business?',
    answer: 'Homeless entrepreneurs face numerous challenges including lack of permanent address (required for business registration), limited access to startup capital, difficulty opening business bank accounts, limited internet access, absence of secure storage space, transportation barriers, and stigma when dealing with clients or partners.'
  },
  {
    id: 2,
    question: 'Do I need a business bank account, and how can I get one without a permanent address?',
    answer: 'While a business bank account is important for separating personal and business finances, there are alternatives if you face barriers due to address requirements. Some online banks offer more flexible options, or you can use payment processors like PayPal, Stripe, or Cash App Business. Some credit unions may also be more accommodating than traditional banks.'
  },
  {
    id: 3,
    question: 'How can I start a business with little to no money?',
    answer: 'Starting with low-cost business models like service-based businesses is key. Focus on skills you already have, use free online resources for learning, leverage free marketing through social media, start with a minimal viable product, and consider microloans or grants specifically designed for entrepreneurs facing economic hardship.'
  }
];

const ResourcesSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="section-container bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="heading-secondary mb-12 text-center">Resources</h2>

        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className={`resource-card transition-all duration-200 ${openItem === resource.id ? 'shadow-md' : ''}`}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleItem(resource.id)}
              >
                <h3 className="font-semibold text-lg">{resource.question}</h3>
                <button className="text-gray-500">
                  {openItem === resource.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {openItem === resource.id && (
                <div className="mt-4 text-gray-600">
                  <p>{resource.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
