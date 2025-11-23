'use client';

export default function JoinCalendarClub() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* UPSELL PITCH FIRST - Above the fold on mobile */}
        <div style={{
          background: '#f7fafc',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          border: '2px solid #667eea'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#1a202c', textAlign: 'center' }}>
            Want Events Like This Every Month?
          </h2>
          <p style={{ fontSize: '15px', color: '#4a5568', lineHeight: '1.6', marginBottom: '20px', textAlign: 'center' }}>
            Join the <strong>Sunland VIP Calendar Club</strong> and never miss a local event again.
          </p>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px' }}>
              ✅ <strong>New events every month</strong> - automatically added to your calendar
            </div>
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px' }}>
              ✅ <strong>Exclusive VIP perks</strong> - discounts and early access at local events
            </div>
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px' }}>
              ✅ <strong>Never miss out</strong> - reminders before every event
            </div>
            <div style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px' }}>
              ✅ <strong>Support local</strong> - discover Fort Pierce's best events
            </div>
          </div>

          <div style={{
            background: '#fffbeb',
            border: '2px solid #fbbf24',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px' }}>
              LIMITED TIME OFFER
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a202c', marginBottom: '4px' }}>
              $10 <span style={{ fontSize: '16px', color: '#718096', fontWeight: 'normal' }}>one-time</span>
            </div>
            <div style={{ fontSize: '13px', color: '#78350f' }}>
              Lifetime access • 150+ events per year
            </div>
          </div>

          <button
            onClick={() => window.location.href = 'mailto:join@sunlandnews.com?subject=Join%20Calendar%20Club'}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '18px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              marginBottom: '12px',
              boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)'
            }}
          >
            Join Calendar Club - $10
          </button>

          <p style={{ fontSize: '12px', color: '#a0aec0', textAlign: 'center', marginTop: '12px' }}>
            One-time payment • Works with any calendar app
          </p>
        </div>

        {/* CONFIRMATION - Below the pitch */}
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
          <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#1a202c' }}>
            Events Added to Your Calendar
          </h3>
          <p style={{ fontSize: '14px', color: '#718096' }}>
            Check your calendar for automatic reminders
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a
            href="/"
            style={{
              fontSize: '14px',
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            ← Back to Sunland News
          </a>
        </div>
      </div>
    </div>
  );
}
