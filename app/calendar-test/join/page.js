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
          <h2 style={{ fontSize: '26px', marginBottom: '12px', color: '#1a202c', textAlign: 'center', fontWeight: 'bold', lineHeight: '1.3' }}>
            Never Miss Another Fort Pierce Event
          </h2>
          <p style={{ fontSize: '16px', color: '#4a5568', lineHeight: '1.5', marginBottom: '24px', textAlign: 'center' }}>
            Get 150+ local events auto-added to your calendar with <strong>one tap</strong> each month
          </p>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '15px', color: '#2d3748', marginBottom: '14px', lineHeight: '1.5' }}>
              ✅ <strong>One tap</strong> adds all events (no manual calendar entry)
            </div>
            <div style={{ fontSize: '15px', color: '#2d3748', marginBottom: '14px', lineHeight: '1.5' }}>
              ✅ <strong>Auto-reminders</strong> before every event
            </div>
            <div style={{ fontSize: '15px', color: '#2d3748', marginBottom: '14px', lineHeight: '1.5' }}>
              ✅ <strong>Updated monthly</strong> with new local events
            </div>
            <div style={{ fontSize: '15px', color: '#2d3748', marginBottom: '14px', lineHeight: '1.5' }}>
              ✅ <strong>Works everywhere</strong> - iPhone, Android, any calendar
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
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              One-Time Payment
            </div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1a202c', marginBottom: '4px' }}>
              $9
            </div>
            <div style={{ fontSize: '14px', color: '#78350f', fontWeight: '500' }}>
              Lifetime access • Never pay again
            </div>
          </div>

          <button
            onClick={() => window.location.href = 'https://buy.stripe.com/00w4gA9Sy5w574idkIcZa0c'}
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
            Get Lifetime Access - $9
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
