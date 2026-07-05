import React from 'react';
import Legal from '@/components/common/Legal';

const Privacy = () => (
  <Legal
    title="Privacy Policy"
    sections={[
      { h: 'Introduction', p: 'This Privacy Policy explains how NN Venture collects, uses, and protects information submitted through this website.' },
      { h: 'Information We Collect', p: 'We collect information you voluntarily provide through proposal and contact forms — including name, organisation, email, phone, and message content.' },
      { h: 'How We Use Information', p: 'Submissions are used solely to respond to inquiries and coordinate proposals. Information is not sold or shared with third parties.' },
      { h: 'Data Storage', p: 'Submissions are stored securely in the admin console and retained for as long as required to respond to your inquiry.' },
      { h: 'Your Rights', p: 'You may request deletion or update of your data at any time by writing to the founder’s office at [Business Email].' },
      { h: 'Updates', p: 'This policy may be updated. Material changes will be posted here.' },
    ]}
  />
);
export default Privacy;
