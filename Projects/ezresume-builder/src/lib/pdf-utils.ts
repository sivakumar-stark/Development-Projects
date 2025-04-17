import { ResumeData } from './types';

/**
 * Creates a printable HTML version of the resume
 */
export const generateResumeHTML = (data: ResumeData): string => {
  // Create a styled HTML document for the resume
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.personalInfo.name || 'Resume'}</title>
      <style>
        @page {
          size: letter;
          margin: 0.5in;
        }
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 7.5in;
          margin: 0 auto;
          padding: 0;
          box-sizing: border-box;
        }
        * {
          box-sizing: border-box;
        }
        h1, h2, h3, h4, h5 {
          margin-top: 0;
          color: #2a4365;
          page-break-after: avoid;
        }
        h1 {
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 0.2rem;
        }
        h2 {
          font-size: 1.2rem;
          border-bottom: 1px solid #2a4365;
          padding-bottom: 0.2rem;
          margin-bottom: 0.5rem;
        }
        h3 {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }
        .contact-info {
          text-align: center;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .section {
          margin-bottom: 1rem;
          page-break-inside: avoid;
        }
        .experience-item, .education-item {
          margin-bottom: 0.8rem;
          page-break-inside: avoid;
        }
        .job-title, .degree {
          font-weight: bold;
        }
        .company-location, .school-location {
          font-style: italic;
          font-size: 0.9rem;
        }
        .dates {
          font-size: 0.8rem;
          color: #555;
        }
        .responsibilities {
          margin-top: 0.3rem;
        }
        ul {
          margin: 0.2rem 0;
          padding-left: 1.5rem;
        }
        li {
          margin-bottom: 0.1rem;
        }
        .section-content {
          white-space: pre-wrap;
        }
        @media print {
          body {
            width: 100%;
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <!-- Personal Info / Header -->
      <header>
        <h1>${data.personalInfo.name || ''}</h1>
        <div class="contact-info">
          ${data.personalInfo.address ? `${data.personalInfo.address}` : ''}
          ${data.personalInfo.phone ? `${data.personalInfo.address ? ' | ' : ''}${data.personalInfo.phone}` : ''}
          ${data.personalInfo.email ? `${(data.personalInfo.address || data.personalInfo.phone) ? ' | ' : ''}${data.personalInfo.email}` : ''}
          ${data.personalInfo.linkedin || data.personalInfo.website ? '<br>' : ''}
          ${data.personalInfo.linkedin ? `LinkedIn: ${data.personalInfo.linkedin}` : ''}
          ${data.personalInfo.website ? `${data.personalInfo.linkedin ? ' | ' : ''} Website: ${data.personalInfo.website}` : ''}
        </div>
      </header>

      <!-- Summary Section -->
      ${data.summary ? `
      <section class="section">
        <h2>Summary</h2>
        <p class="section-content">${data.summary.replace(/\n/g, '<br>')}</p>
      </section>
      ` : ''}

      <!-- Work Experience Section -->
      ${data.workExperience.length > 0 ? `
      <section class="section">
        <h2>Work Experience</h2>
        ${data.workExperience.map(job => `
          <div class="experience-item">
            <h3 class="job-title">${job.jobTitle || ''}</h3>
            <div class="company-location">${job.company || ''} - ${job.location || ''}</div>
            <div class="dates">${job.startDate || ''} - ${job.endDate || ''}</div>
            <div class="responsibilities">
              ${job.responsibilities.filter(r => r.trim()).map(resp => `
                <p class="section-content">${resp.replace(/\n/g, '<br>')}</p>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </section>
      ` : ''}

      <!-- Education Section -->
      ${data.education.length > 0 ? `
      <section class="section">
        <h2>Education</h2>
        ${data.education.map(edu => `
          <div class="education-item">
            <h3 class="degree">${edu.degree || ''}</h3>
            <div class="school-location">${edu.school || ''} - ${edu.location || ''}</div>
            <div class="dates">Graduated: ${edu.graduationDate || ''}</div>
          </div>
        `).join('')}
      </section>
      ` : ''}

      <!-- Skills Section -->
      ${data.skills.length > 0 && data.skills.some(skill => skill.name) ? `
      <section class="section">
        <h2>Skills</h2>
        <ul>
          ${data.skills.filter(skill => skill.name).map(skill => `
            <li>${skill.name}</li>
          `).join('')}
        </ul>
      </section>
      ` : ''}

      <!-- Languages Section -->
      ${data.languages.length > 0 && data.languages.some(lang => lang.name) ? `
      <section class="section">
        <h2>Languages</h2>
        <ul>
          ${data.languages.filter(lang => lang.name).map(lang => `
            <li>${lang.name}${lang.level ? ` (${lang.level})` : ''}</li>
          `).join('')}
        </ul>
      </section>
      ` : ''}

      <!-- Certifications Section -->
      ${data.certifications.length > 0 && data.certifications.some(cert => cert.name) ? `
      <section class="section">
        <h2>Certifications</h2>
        <ul>
          ${data.certifications.filter(cert => cert.name).map(cert => `
            <li>
              ${cert.name}
              ${cert.issuingOrganization ? ` - ${cert.issuingOrganization}` : ''}
              ${cert.date ? ` (${cert.date})` : ''}
            </li>
          `).join('')}
        </ul>
      </section>
      ` : ''}

      <!-- Awards & Activities Section -->
      ${data.awardsActivities.length > 0 && data.awardsActivities.some(item => item.name) ? `
      <section class="section">
        <h2>Awards & Activities</h2>
        <ul>
          ${data.awardsActivities.filter(item => item.name).map(item => `
            <li>
              ${item.name}
              ${item.dateOrDescription ? ` - ${item.dateOrDescription}` : ''}
            </li>
          `).join('')}
        </ul>
      </section>
      ` : ''}
    </body>
    </html>
  `;

  return html;
};

/**
 * Triggers the download of the resume as an HTML file that can be opened and printed
 */
export const downloadResumeAsHTML = (data: ResumeData) => {
  const html = generateResumeHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.personalInfo.name || 'resume'}.html`;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

/**
 * Opens the resume in a new tab for printing
 */
export const printResume = (data: ResumeData) => {
  const html = generateResumeHTML(data);
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    
    // Allow time for styles to load, then print
    setTimeout(() => {
      printWindow.print();
    }, 250);
  } else {
    alert('Please allow pop-ups to print your resume');
  }
};