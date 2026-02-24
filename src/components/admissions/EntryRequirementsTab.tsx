import { CheckCircle, FileCheck } from 'lucide-react';

const bachelorDocs = [
  { label: 'Academic Transcripts', detail: 'High School/Intermediate (HSSC) certificates and mark sheets.' },
  { label: 'English Proficiency', detail: "You don't need a specific IELTS or PTE score to apply. A simple letter of proficiency is sufficient, as a general English evaluation will be conducted once you arrive on campus." },
  { label: 'Personal Statement', detail: 'A 4,000-character essay focusing on your interest in the subject.' },
  { label: 'Reference Letter', detail: 'One academic reference from a teacher or principal.' },
  { label: 'Passport', detail: 'Copy of the photo page.' },
  { label: 'Financial Declaration', detail: 'Initial proof that you can cover tuition and living costs.' },
  { label: 'Curriculum Vitae (CV)', detail: 'Highlighting your education, achievements, and extracurricular activities.' },
];

const masterDocs = [
  { label: 'Degree Certificate', detail: "Evidence of your 4-year Bachelor's degree." },
  { label: 'Final Transcripts', detail: 'Year-by-year breakdown of your university grades.' },
  { label: 'Statement of Purpose (SOP)', detail: 'Tailored specifically to the programme and your career goals.' },
  { label: 'Two Letters of Recommendation (LOR)', detail: 'Usually one academic and one professional (if you have work experience).' },
  { label: 'Curriculum Vitae (CV)', detail: 'Highlighting your education, internships, and skills.' },
  { label: 'English Proficiency', detail: "You don't need a specific IELTS or PTE score to apply. A simple letter of proficiency is sufficient, as a general English evaluation will be conducted once you arrive on campus." },
];

const phdDocs = [
  { label: 'Research Proposal', detail: 'A detailed document (1,000–3,000 words) outlining your research question, methodology, and contribution to the field.' },
  { label: "Master's Degree & Transcripts", detail: "Proof of completion of a relevant Master's programme." },
  { label: 'Academic References', detail: 'Two references from professors who can vouch for your research potential.' },
  { label: 'Supervisor Confirmation', detail: 'Some universities require an email from a professor agreeing to supervise you.' },
  { label: 'Writing Sample', detail: 'A previous thesis or published paper (if requested).' },
  { label: 'Curriculum Vitae (CV)', detail: 'Highlighting your academic background, research experience, and publications.' },
];

const diplomaDocs = [
  { label: 'Highest Qualification', detail: 'Most recent school or college certificates.' },
  { label: 'Proof of Experience', detail: 'Some diplomas require 1–2 years of work history in a related field.' },
  { label: 'English Language Proof', detail: "You don't need a specific IELTS or PTE score to apply. A simple letter of proficiency is sufficient, as a general English evaluation will be conducted once you arrive on campus." },
  { label: 'Letter of Intent', detail: 'A short explanation of why you are taking this specific vocational route.' },
  { label: 'Curriculum Vitae (CV)', detail: 'Highlighting your qualifications, skills, and relevant experience.' },
];

const shortTermDocs = [
  { label: 'Professional License', detail: 'If the training is for a regulated profession (like Law, Medicine, or Engineering).' },
  { label: 'Employer Support Letter', detail: 'Often required if your company is sponsoring the training.' },
  { label: 'CV/Resume', detail: 'Showing your current job role and relevance to the training.' },
  { label: 'Previous Certificates', detail: 'Proof of baseline knowledge in the subject area.' },
];

const categories = [
  {
    number: 1,
    title: "Bachelor's Degree (Undergraduate)",
    note: 'Applications are usually processed through the internal system of Oxford Skills Center of Technology, known as the OSCT-Scrutiny Cell.',
    docs: bachelorDocs,
  },
  {
    number: 2,
    title: "Master's Degree (Postgraduate Taught)",
    note: "Applications are usually made directly to the university's website.",
    docs: masterDocs,
  },
  {
    number: 3,
    title: 'PhD (Postgraduate Research)',
    note: null,
    docs: phdDocs,
  },
  {
    number: 4,
    title: 'Diplomas & Certificates',
    note: '(e.g., Level 3–5 Vocational Diplomas or Graduate Certificates)',
    docs: diplomaDocs,
  },
  {
    number: 5,
    title: 'Short-Term Trainings & Professional Courses',
    note: '(e.g., CPD – Continuing Professional Development)',
    docs: shortTermDocs,
  },
];

const EntryRequirementsTab = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          <FileCheck size={24} />
        </div>
        <h3 className="text-xl font-bold text-foreground">Entry Requirements</h3>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed">
        Applying to Oxford Skills Center is a straightforward process designed to identify students with the potential to thrive in our rigorous academic environment.
      </p>

      <div className="bg-muted rounded-lg p-5 border border-border space-y-6">
        <h4 className="font-bold text-foreground text-base mb-1">Required Documents</h4>

        {categories.map((cat, catIdx) => (
          <div key={catIdx} className={`space-y-2 ${catIdx > 0 ? 'border-t border-border pt-4' : ''}`}>
            <h5 className="font-bold text-foreground text-sm flex items-center gap-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                {cat.number}
              </span>
              {cat.title}
            </h5>
            {cat.note && (
              <p className="text-xs text-muted-foreground italic pl-8">{cat.note}</p>
            )}
            <ul className="space-y-1.5 pl-8">
              {cat.docs.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold text-foreground">{doc.label}:</span> {doc.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-6">
        <h4 className="font-bold text-foreground text-sm mb-3">International Students</h4>
        <p className="text-muted-foreground text-xs mb-4">
          International applicants must apply at least 3 months prior to the start date.
        </p>
        <button className="px-4 py-2 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
          Start Application
        </button>
      </div>
    </div>
  );
};

export default EntryRequirementsTab;
