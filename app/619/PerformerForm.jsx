'use client';
import { useState } from 'react';

export default function PerformerForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    stageName: '',
    phone: '',
    email: '',
    cityState: '',
    // Step 2
    talentType: '',
    groupName: '',
    numPerformers: '',
    description: '',
    perfLength: '',
    // Step 3
    videoLink: '',
    socialHandles: '',
    experience: '',
    // Step 4
    musicPlayback: '',
    bringEquipment: '',
    equipmentDetails: '',
    specialReqs: '',
    // Step 5
    acknowledgement: false,
    contentShoot: ''
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const nextStep = () => {
    // Basic validation before proceeding
    let isValid = true;
    if (step === 1) {
      if (!formData.fullName || !formData.phone || !formData.email || !formData.cityState) isValid = false;
    } else if (step === 2) {
      if (!formData.talentType || !formData.groupName || !formData.numPerformers || !formData.description || !formData.perfLength) isValid = false;
    } else if (step === 3) {
      if (!formData.videoLink || !formData.socialHandles) isValid = false;
    } else if (step === 4) {
      if (!formData.musicPlayback || !formData.bringEquipment) isValid = false;
    }

    if (!isValid) {
      setError('Please fill out all required (*) fields before continuing.');
      return;
    }

    setError('');
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acknowledgement || !formData.contentShoot) {
      setError('You must acknowledge the terms and answer the content shoot question to submit.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/619/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="animate-fade-in-up" style={{ textAlign: 'center', padding: '1rem', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
        <h3 style={{ color: 'var(--poster-green)', marginBottom: '1rem', fontSize: '2rem', lineHeight: 1.2 }}>★ APPLICATION RECEIVED ★</h3>
        <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem' }}>
          Thank you for your interest in performing at the TCBU Juneteenth Festival!
        </p>
        <p style={{ fontSize: '1rem' }}>
          Selected performers will be notified via email by Saturday, May 23 from <br/><strong style={{wordBreak: 'break-all'}}>kayylovemanagement@gmail.com.</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up" style={{ position: 'relative' }}>
      
      {/* Intro Text - Only visible on Step 1 */}
      {step === 1 && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--poster-cream)', border: 'var(--border-thick) solid var(--poster-black)', boxShadow: '4px 4px 0px var(--poster-black)' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--poster-red)', fontSize: '2rem' }}>TCBU Juneteenth Festival – Performer Interest Form</h3>
          <p style={{ marginBottom: '1rem', fontWeight: 600 }}>
            Thank you for your interest in performing at the TCBU Juneteenth Festival taking place on June 19, 2026 in Fort Pierce, FL. Please complete the form below to be considered.
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <li>Submission of this form does not guarantee selection.</li>
            <li>Selected performers will be notified via email by Saturday, May 23 from <br/><strong>kayylovemanagement@gmail.com.</strong></li>
            <li style={{ marginBottom: '1rem' }}>If selected, you understand that this is a voluntary performance opportunity and will not be a paid booking.</li>
            <li>If selected, the Juneteenth Festival Media Partner, Sunland News, will contact you to schedule your content shoot. Content will be filmed during the week of May 25 through May 29.</li>
          </ul>
          <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>Please ensure all information submitted is accurate and up to date.</p>
        </div>
      )}

      {/* Progress Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} style={{ flex: 1, height: '8px', backgroundColor: step >= s ? 'var(--poster-green)' : '#e0e0e0', transition: 'all 0.3s', border: '1px solid var(--poster-black)' }} />
        ))}
      </div>

      <h3 style={{ marginBottom: '1.5rem', borderBottom: '3px solid var(--poster-black)', paddingBottom: '0.5rem', display: 'inline-block' }}>
        {step === 1 && 'Step 1: Contact Information'}
        {step === 2 && 'Step 2: Performance Details'}
        {step === 3 && 'Step 3: Media & Experience'}
        {step === 4 && 'Step 4: Logistics'}
        {step === 5 && 'Step 5: Agreement'}
      </h3>

      {error && (
        <div className="animate-fade-in-up" style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontWeight: 'bold', border: '2px solid #991b1b' }}>
          {error}
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        
        {/* STEP 1 */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Stage Name (if applicable)</label>
              <input type="text" name="stageName" value={formData.stageName} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label>Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label>City/State *</label>
              <input type="text" name="cityState" value={formData.cityState} onChange={handleChange} className="form-control" placeholder="e.g. Fort Pierce, FL" />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <div className="form-group">
              <label>Type of Talent *</label>
              <select name="talentType" value={formData.talentType} onChange={handleChange} className="form-control" style={{ appearance: 'auto' }}>
                <option value="">Select Talent Type...</option>
                <option value="Singer">Singer</option>
                <option value="Rapper">Rapper</option>
                <option value="Band">Band</option>
                <option value="Dancer">Dancer</option>
                <option value="Spoken Word">Spoken Word</option>
                <option value="DJ">DJ</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '2 1 200px' }}>
                <label>Performance Name or Group Name *</label>
                <input type="text" name="groupName" value={formData.groupName} onChange={handleChange} className="form-control" />
              </div>
              <div style={{ flex: '1 1 100px' }}>
                <label>Number of Performers *</label>
                <input type="number" name="numPerformers" value={formData.numPerformers} onChange={handleChange} className="form-control" min="1" />
              </div>
            </div>
            <div className="form-group">
              <label>Brief Description of Your Act * <span style={{fontWeight: 'normal', fontSize:'0.85rem'}}>(2–3 sentences)</span></label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows={3}></textarea>
            </div>
            <div className="form-group">
              <label>Preferred Performance Length *</label>
              <select name="perfLength" value={formData.perfLength} onChange={handleChange} className="form-control" style={{ appearance: 'auto' }}>
                <option value="">Select Length...</option>
                <option value="5 minutes">5 minutes</option>
                <option value="10 minutes">10 minutes</option>
                <option value="15 minutes">15 minutes</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <div className="form-group">
              <label>Link to Performance Video * <span style={{fontWeight: 'normal', fontSize:'0.85rem'}}>(Type N/A if none)</span></label>
              <input type="text" name="videoLink" value={formData.videoLink} onChange={handleChange} className="form-control" placeholder="https://..." />
            </div>
            <div className="form-group">
              <label>Social Media Handles * <span style={{fontWeight: 'normal', fontSize:'0.85rem'}}>(Instagram, TikTok, etc.)</span></label>
              <input type="text" name="socialHandles" value={formData.socialHandles} onChange={handleChange} className="form-control" placeholder="@yourhandle" />
            </div>
            <div className="form-group">
              <label>Previous Performance Experience <span style={{fontWeight: 'normal', fontSize:'0.85rem'}}>(if applicable)</span></label>
              <textarea name="experience" value={formData.experience} onChange={handleChange} className="form-control" rows={3}></textarea>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="animate-fade-in-up">
            <div className="form-group">
              <label>Do you require music playback? *</label>
              <select name="musicPlayback" value={formData.musicPlayback} onChange={handleChange} className="form-control" style={{ appearance: 'auto' }}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Will you be bringing your own band or equipment? *</label>
              <select name="bringEquipment" value={formData.bringEquipment} onChange={handleChange} className="form-control" style={{ appearance: 'auto' }}>
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {formData.bringEquipment === 'Yes' && (
              <div className="form-group animate-fade-in-up">
                <label>If yes, please explain equipment:</label>
                <textarea name="equipmentDetails" value={formData.equipmentDetails} onChange={handleChange} className="form-control" rows={2}></textarea>
              </div>
            )}
            <div className="form-group">
              <label>Any special requirements we should be aware of?</label>
              <textarea name="specialReqs" value={formData.specialReqs} onChange={handleChange} className="form-control" rows={2}></textarea>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className="animate-fade-in-up">
            <div className="form-group">
              <label>Are you available for a content shoot during the week of May 25 to May 29? *</label>
              <p style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}>The Juneteenth Festival Media Partner, Sunland News will contact you to schedule your specific date and time if you are selected.</p>
              <select name="contentShoot" value={formData.contentShoot} onChange={handleChange} className="form-control" style={{ appearance: 'auto' }}>
                <option value="">Select...</option>
                <option value="Yes, I am available">Yes, I am available</option>
                <option value="No, I am not available">No, I am not available</option>
              </select>
            </div>

            <div className="form-group" style={{ marginTop: '2rem', padding: '1rem', border: '3px solid var(--poster-black)', backgroundColor: '#f9fafb' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', gap: '1rem' }}>
                <input 
                  type="checkbox" 
                  name="acknowledgement" 
                  checked={formData.acknowledgement} 
                  onChange={handleChange} 
                  style={{ width: '20px', height: '20px', marginTop: '0.2rem', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.95rem', fontWeight: 'normal', lineHeight: '1.4' }}>
                  <strong>Acknowledgement *</strong><br/>
                  I understand that submission does not guarantee selection and that I will be contacted if selected to perform.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '2px solid #eaeaea' }}>
          {step > 1 ? (
            <button type="button" onClick={prevStep} className="btn-primary" style={{ backgroundColor: 'var(--poster-black)', color: 'var(--poster-cream)', fontSize: '1.5rem', padding: '0.5rem 1.5rem' }}>
              ← Back
            </button>
          ) : <div></div>}

          {step < 5 ? (
            <button type="button" onClick={nextStep} className="btn-primary" style={{ fontSize: '1.5rem', padding: '0.5rem 2.5rem' }}>
              Next →
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} disabled={submitting} className="btn-primary" style={{ backgroundColor: 'var(--poster-red)', fontSize: '1.5rem', padding: '0.5rem 2.5rem', opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>

      </form>
    </div>
  );
}
