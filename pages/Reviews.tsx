import React from 'react';
import SEO from '../components/SEO.tsx';
import ComplianceNotice from '../components/ComplianceNotice.tsx';

// The patient reviews page was withdrawn under the NMC advertising guidelines
// (6 Oct 2026, 3.2 Explanation V and 8.1(xi)). The URL stays live so old links
// and search results land on the reason instead of a 404.
const Reviews: React.FC = () => (
  <div className="pt-52 pb-32">
    <SEO
      title="Patient Reviews"
      description="Why this website does not publish patient reviews or testimonials, in line with the National Medical Commission's advertising guidelines of 6 October 2026."
      url="/reviews"
      noindex
    />
    <ComplianceNotice
      eyebrow="A note on patient reviews"
      title="Patient Reviews"
      intro="This website does not publish patient reviews, ratings or testimonials. The National Medical Commission's guidelines on advertising by doctors, issued on 6 October 2026, do not allow them."
      clauses={[
        {
          ref: "Clause 3.2, Explanation V",
          text: "No RMP or hospital/medical institution shall solicit, purchase, procure, manipulate or cause to be published fake, paid or misleading patient reviews, ratings, testimonials, endorsements or recommendations for the promotion of medical services. An RMP shall not request or share patient testimonials, recommendations, endorsements or reviews for professional promotion on social media."
        },
        {
          ref: "Clause 8.1(xi)",
          text: "No RMP shall use or permit any celebrity, influencer, patient, employee or third party to promote professional services through prohibited testimonials, endorsements or recommendations."
        }
      ]}
      closing={[
        "Dr. Sumit's qualifications and training are set out on the About page, and each procedure page describes how the operation is done, its recovery, its fee range and, where reviewed, its risks with figures from published studies."
      ]}
    />
  </div>
);

export default Reviews;
