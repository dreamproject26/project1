import React from 'react';
import Legal from '@/components/common/Legal';

const Terms = () => (
  <Legal
    title="Terms & Disclaimer"
    sections={[
      { h: 'Use of Website', p: 'This website is a corporate portfolio for NN Venture. Content is intended for information, proposals and partnership discussions only.' },
      { h: 'Editable Content', p: 'Certain content on this site is editable placeholder content and does not represent verified metrics, endorsements, or legal claims until formally updated by an authorised administrator.' },
      { h: 'Intellectual Property', p: 'All brand assets, logos, and content are the property of NN Venture and its authorised partners.' },
      { h: 'No Investment Advice', p: 'Information on this site does not constitute investment advice or a solicitation to invest.' },
      { h: 'Limitation of Liability', p: 'NN Venture accepts no liability for actions taken solely on the basis of information presented on this website.' },
      { h: 'Governing Law', p: 'These terms are governed by the laws of the People’s Republic of Bangladesh.' },
    ]}
  />
);
export default Terms;
