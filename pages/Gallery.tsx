import React from 'react';
import SEO from '../components/SEO.tsx';
import ComplianceNotice from '../components/ComplianceNotice.tsx';

// The results gallery was withdrawn under the NMC advertising guidelines
// (6 Oct 2026, 8.1(v) and 6.2). The URL stays live so old links and search
// results land on the reason instead of a 404.
const Gallery: React.FC = () => (
  <div className="pt-52 pb-32">
    <SEO
      title="Before-and-After Photographs"
      description="Why this website does not show before-and-after photographs, in line with the National Medical Commission's advertising guidelines of 6 October 2026."
      url="/gallery"
      noindex
    />
    <ComplianceNotice
      eyebrow="A note on results photographs"
      title="Before-and-After Photographs"
      intro="This website does not show before-and-after photographs or patients' surgical results. The National Medical Commission's guidelines on advertising by doctors, issued on 6 October 2026, do not allow them."
      clauses={[
        {
          ref: "Clause 8.1(v)",
          text: "[A Registered Medical Practitioner] shall not publish cases for promotional purposes, advertise surgical results, display “before and after” photographs, publicize celebrity patients, promote personal success stories unless published strictly for scientific or educational purposes with anonymized patient consent."
        },
        {
          ref: "Clause 6.2",
          text: "Patient consent shall not, by itself, make permissible any testimonial, endorsement, promotional patient story, before-and-after depiction, success claim or other advertising practice that is otherwise prohibited under these Guidelines or applicable law."
        }
      ]}
      closing={[
        "If photographs of earlier cases would help you understand what an operation can and cannot do, they can be reviewed in person at the clinic during your consultation. Only cases whose patients have consented are shown, with identifying features removed.",
        "Each procedure page on this site sets out how the operation is done, its recovery, its fee range and, where reviewed, its risks with figures from published studies."
      ]}
    />
  </div>
);

export default Gallery;
