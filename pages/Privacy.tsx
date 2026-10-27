import React from 'react';
import SEO from '../components/SEO.tsx';
import { BRAND, CONTACT } from '../constants.ts';

// Website privacy notice. The NMC advertising guidelines (6 Oct 2026, 7.6)
// require digital communication that handles personal data to comply with the
// IT Act 2000 and the Digital Personal Data Protection Act 2023 and its Rules.
const LAST_UPDATED = '27 October 2026';

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Who is responsible for your data',
    body: (
      <p>
        This website is run by {BRAND.name}, plastic surgeon at {CONTACT.location}. For any question about your personal data, write to{' '}
        <a href={`mailto:${CONTACT.email}`} className="text-[#4A90E2] hover:underline">{CONTACT.email}</a>.
      </p>
    ),
  },
  {
    title: 'What this website collects',
    body: (
      <ul className="list-disc ml-5 space-y-3">
        <li>
          <strong className="text-white">Usage statistics.</strong> The site uses Google Analytics, which sets cookies and records the pages you view,
          how long you stay, your device and browser, the site that referred you and your approximate location from your IP address.
          We look at these figures in aggregate, to see which pages are read.
        </li>
        <li>
          <strong className="text-white">The contact form.</strong> The form is not stored on this website. Pressing the button opens WhatsApp with
          your details in a message, and nothing is sent unless you send it. A message you send reaches the clinic's WhatsApp number and is
          handled by WhatsApp under its own terms.
        </li>
        <li>
          <strong className="text-white">Calls, emails and WhatsApp messages</strong> you start yourself, with whatever you choose to include.
        </li>
        <li>
          <strong className="text-white">Embedded content.</strong> Videos are embedded from YouTube in its privacy-enhanced mode, and the contact page
          shows a Google Map. These services may set their own cookies when they load or play.
        </li>
      </ul>
    ),
  },
  {
    title: 'How it is used',
    body: (
      <p>
        Your contact details and messages are used only to answer your enquiry and arrange appointments. They are not sold, and they are not used
        to send you promotional messages.
      </p>
    ),
  },
  {
    title: 'How long it is kept',
    body: (
      <p>
        Enquiries are kept for as long as needed to answer them. If you become a patient, your medical records are kept for the period the law
        requires. Google Analytics data is kept for the retention period set in Google Analytics.
      </p>
    ),
  },
  {
    title: 'Your rights',
    body: (
      <>
        <p>
          Under the Digital Personal Data Protection Act, 2023, you can ask for a summary of the personal data held about you, ask for it to be
          corrected, completed, updated or erased, withdraw consent you have given, nominate someone to exercise these rights for you, and raise a
          grievance. Write to <a href={`mailto:${CONTACT.email}`} className="text-[#4A90E2] hover:underline">{CONTACT.email}</a>.
        </p>
        <p>
          If you are not satisfied with the response, you can complain to the Data Protection Board of India.
        </p>
      </>
    ),
  },
  {
    title: 'Cookies',
    body: (
      <p>
        You can block or delete cookies in your browser settings, and Google offers a browser add-on that stops Google Analytics from recording
        your visits. The site works without cookies.
      </p>
    ),
  },
];

const Privacy: React.FC = () => (
  <div className="pt-52 pb-32">
    <SEO
      title="Privacy Notice"
      description="How drsumitaesthetics.com handles personal data: usage statistics, the WhatsApp contact form, embedded videos and maps, and your rights under the DPDP Act 2023."
      url="/privacy"
    />
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Privacy</span>
          <h1 className="text-5xl md:text-7xl font-serif">Privacy Notice</h1>
          <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
        {sections.map((section) => (
          <section key={section.title} className="space-y-4">
            <h2 className="text-2xl font-serif text-white">{section.title}</h2>
            <div className="text-gray-300 font-light leading-relaxed space-y-4">{section.body}</div>
          </section>
        ))}
      </div>
    </div>
  </div>
);

export default Privacy;
