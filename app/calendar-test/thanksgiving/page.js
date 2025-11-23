'use client';

import { useRouter } from 'next/navigation';

export default function ThanksgivingWeekCalendar() {
  const router = useRouter();

  const handleDownload = (url) => {
    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Redirect to join page after short delay
    setTimeout(() => {
      router.push('/calendar-test/join');
    }, 1000);
  };
  const events = [
    {
      emoji: "🍷",
      title: "Thanksgiving Wine Tasting",
      date: "Tuesday, Nov 25",
      time: "6:30-8:30 PM",
      location: "The Wine Vault at Pierce Public Market, 111 Orange Avenue, Fort Pierce",
      description: "Holiday wine tastings with charcuterie boards. Reservations required!",
      pricing: "Check pricing online",
      icsFile: "/calendar-test/thanksgiving-events/wine-tasting.ics"
    },
    {
      emoji: "🦃",
      title: "8th Annual Turkey Trot at Tradition",
      date: "Thursday, Nov 27",
      time: "8:00 AM",
      location: "Tradition Square, Port St. Lucie",
      description: "5K race/run/walk benefiting New Horizons of TC, Okeechobee, and TC Food Bank.",
      pricing: "Check pricing - register online",
      icsFile: "/calendar-test/thanksgiving-events/turkey-trot.ics"
    },
    {
      emoji: "🎪",
      title: "2nd Annual Fairgrounds Festival of Lights",
      date: "Thursday, Nov 27 (opens) - runs through Dec 28",
      time: "6-9 PM nightly",
      location: "St. Lucie County Fairgrounds",
      description: "Biggest light show on Treasure Coast! Drive-thru lights, real reindeer (Rudolph!), petting zoo, Santa's Village.",
      pricing: "$10/person advance, $12 at gate",
      icsFile: "/calendar-test/thanksgiving-events/festival-lights.ics"
    },
    {
      emoji: "🎄",
      title: "Christmas on Main Street - Tree Lighting",
      date: "Friday, Nov 28",
      time: "4-7 PM",
      location: "Riverwalk Stage, Downtown Stuart",
      description: "FREE family fun with annual tree lighting ceremony!",
      pricing: "Free",
      icsFile: "/calendar-test/thanksgiving-events/tree-lighting.ics"
    },
    {
      emoji: "🎉",
      title: "Day After Thanksgiving Night Market",
      date: "Friday, Nov 28",
      time: "5-9 PM",
      location: "Tradition Square, Port St. Lucie",
      description: "Skip the big-box chaos! Food trucks, live music, local vendors, holiday shopping.",
      pricing: "Free",
      icsFile: "/calendar-test/thanksgiving-events/night-market.ics"
    },
    {
      emoji: "💡",
      title: "PSL in Lights at The Port",
      date: "Friday, Nov 28 (opens) - runs through Dec 31",
      time: "Dusk-9 PM nightly",
      location: "Port St. Lucie Botanical Gardens",
      description: "Self-guided stroll through beautiful light displays. Food trucks on select nights.",
      pricing: "Free",
      icsFile: "/calendar-test/thanksgiving-events/psl-lights.ics"
    },
    {
      emoji: "🛍️",
      title: "Small Business Saturday Sidewalk Pop Up",
      date: "Saturday, Nov 29",
      time: "10 AM-4 PM",
      location: "Avenue D Corridor, Lincoln Park Main Street, Fort Pierce",
      description: "Shop local with popup vendors! Free vendor spots available.",
      pricing: "Free",
      icsFile: "/calendar-test/thanksgiving-events/small-business-saturday.ics"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      paddingTop: '40px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '30px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🦃</div>
          <h1 style={{ fontSize: '32px', marginBottom: '12px', color: '#1a202c' }}>
            Thanksgiving Week Events
          </h1>
          <p style={{ fontSize: '16px', color: '#718096', marginBottom: '24px' }}>
            Everything happening on the Treasure Coast Nov 25-29
          </p>

          <button
            onClick={() => handleDownload('/calendar-test/thanksgiving-week-2025.ics')}
            style={{
              display: 'inline-block',
              padding: '18px 40px',
              fontSize: '18px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)',
            }}
          >
            ⚡ Add All Events to Calendar
          </button>

          <p style={{ fontSize: '13px', color: '#a0aec0', marginTop: '12px' }}>
            Adds all 7 events with automatic reminders
          </p>
        </div>

        {/* Events List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {events.map((event, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                <div style={{ fontSize: '40px', flexShrink: 0 }}>{event.emoji}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
                    {event.title}
                  </h3>
                  <div style={{ fontSize: '14px', color: '#4a5568', marginBottom: '4px' }}>
                    📅 {event.date}
                  </div>
                  <div style={{ fontSize: '14px', color: '#4a5568', marginBottom: '4px' }}>
                    ⏰ {event.time}
                  </div>
                  <div style={{ fontSize: '14px', color: '#4a5568', marginBottom: '12px' }}>
                    📍 {event.location}
                  </div>
                  <p style={{ fontSize: '14px', color: '#718096', lineHeight: '1.5', marginBottom: '12px' }}>
                    {event.description}
                  </p>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginTop: '4px' }}>
                    <div style={{
                      display: 'inline-block',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: event.pricing === 'Free' ? '#e8f5e9' : '#fff3e0',
                      color: event.pricing === 'Free' ? '#27ae60' : '#f57c00'
                    }}>
                      {event.pricing}
                    </div>
                    <button
                      onClick={() => handleDownload(event.icsFile)}
                      style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      📅 Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '40px',
          padding: '24px',
          background: 'white',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <p style={{ fontSize: '14px', color: '#718096', lineHeight: '1.6' }}>
            <strong>How to add:</strong> Tap the button above to download the .ics file, then open it to add all events to your calendar at once. Works with iPhone Calendar, Google Calendar, Outlook, and more!
          </p>
          <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '12px' }}>
            TEST VERSION - Sunland News VIP Calendar
          </p>
        </div>
      </div>
    </div>
  );
}
