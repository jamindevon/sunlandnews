'use client';

import { useState } from 'react';

export default function CalendarTest() {
  const [showCalendar, setShowCalendar] = useState(false);

  const events = [
    {
      id: 1,
      title: "Fort Pierce Farmers Market",
      emoji: "🌽",
      date: "Every Saturday",
      time: "10:00 AM - 12:00 PM",
      location: "Downtown Fort Pierce",
      description: "Fresh local produce, artisanal goods, and live music",
      badge: "RECURRING",
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Fort+Pierce+Farmers+Market&dates=20251129T150000Z/20251129T170000Z&details=Fresh+local+produce,+artisanal+goods,+live+music,+and+food+vendors.+Come+early+for+the+best+selection!&location=Downtown+Fort+Pierce,+FL&recur=RRULE:FREQ=WEEKLY;COUNT=20",
      icsUrl: "/calendar-test/farmers-market.ics"
    },
    {
      id: 2,
      title: "Sunset Concert Series",
      emoji: "🎸",
      date: "Every Other Friday",
      time: "6:00 PM - 8:00 PM",
      location: "Riverside Park",
      description: "Live music by local bands. Bring blankets and lawn chairs!",
      badge: "FREE",
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sunset+Concert+Series&dates=20251129T230000Z/20251130T010000Z&details=Live+music+performances+by+local+bands.+Bring+your+own+blankets+and+lawn+chairs.+Food+vendors+on+site.&location=Riverside+Park,+Fort+Pierce,+FL&recur=RRULE:FREQ=WEEKLY;INTERVAL=2;COUNT=12",
      icsUrl: "/calendar-test/sunset-concerts.ics"
    },
    {
      id: 3,
      title: "Downtown Art Walk",
      emoji: "🎨",
      date: "2nd Saturday Monthly",
      time: "6:00 PM - 9:00 PM",
      location: "Downtown Arts District",
      description: "Gallery openings, street performers, and local artists",
      badge: "VIP PERK",
      vipPerk: "Show this invite for complimentary wine at The Loft Gallery",
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Downtown+Art+Walk&dates=20251213T230000Z/20251214T020000Z&details=Monthly+art+walk+featuring+gallery+openings,+street+performers,+and+local+artists.%0A%0A✨+VIP+PERK:+Show+this+invite+for+complimentary+wine+at+The+Loft+Gallery&location=Downtown+Arts+District,+Fort+Pierce,+FL&recur=RRULE:FREQ=MONTHLY;BYDAY=2SA;COUNT=12",
      icsUrl: "/calendar-test/art-walk.ics"
    },
    {
      id: 4,
      title: "Food Truck Friday",
      emoji: "🍔",
      date: "Every Friday",
      time: "5:00 PM - 9:00 PM",
      location: "City Hall Plaza",
      description: "Rotating selection of gourmet food trucks",
      badge: "VIP PERK",
      vipPerk: "$5 off any $25+ purchase (show this calendar invite)",
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Food+Truck+Friday&dates=20251128T220000Z/20251129T020000Z&details=Weekly+gathering+of+gourmet+food+trucks.+Variety+of+cuisines!%0A%0A✨+VIP+PERK:+$5+off+any+$25%2B+purchase+(show+this+calendar+invite)&location=City+Hall+Plaza,+Fort+Pierce,+FL&recur=RRULE:FREQ=WEEKLY;COUNT=16",
      icsUrl: "/calendar-test/food-truck.ics"
    },
    {
      id: 5,
      title: "Holiday Market",
      emoji: "🎄",
      date: "Saturday, Dec 6",
      time: "10:00 AM - 4:00 PM",
      location: "Harbor Square",
      description: "Holiday shopping with local vendors and crafters",
      badge: "SPECIAL EVENT",
      vipPerk: "VIP early entry at 9:30am + complimentary tote bag",
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Holiday+Market&dates=20251206T150000Z/20251206T210000Z&details=Annual+holiday+shopping+market+featuring+local+vendors+and+crafters.%0A%0A✨+VIP+PERKS:+Early+entry+at+9:30am,+complimentary+tote+bag,+10%25+off+all+purchases&location=Harbor+Square,+Fort+Pierce,+FL",
      icsUrl: "/calendar-test/holiday-market.ics"
    }
  ];

  if (!showCalendar) {
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
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📅</div>
          <h1 style={{ fontSize: '28px', marginBottom: '16px', color: '#1a202c' }}>
            One-Tap Event Calendar
          </h1>
          <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px', lineHeight: '1.6' }}>
            Never miss a local event again. Get all Sunland events added to your calendar with automatic reminders + exclusive VIP perks.
          </p>

          <div style={{
            background: '#f7fafc',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '30px',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#2d3748' }}>
              What you get:
            </h3>
            <ul style={{ fontSize: '14px', color: '#4a5568', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>One-click calendar adds (works on any device)</li>
              <li>Automatic reminders before each event</li>
              <li>Recurring events auto-populate weekly</li>
              <li>Exclusive VIP perks at select events</li>
            </ul>
          </div>

          <button
            onClick={() => setShowCalendar(true)}
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
              transition: 'transform 0.2s',
              boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Access My Calendar
          </button>

          <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '20px' }}>
            TEST VERSION - Calendar functionality test
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f7fafc',
      padding: '20px',
      paddingTop: '40px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '8px', color: '#1a202c' }}>
            Your VIP Event Calendar
          </h1>
          <p style={{ color: '#718096', fontSize: '16px' }}>
            Tap any event to add it to your calendar
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '40px', flexShrink: 0 }}>{event.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                      {event.title}
                    </h3>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 'bold',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: event.badge === 'VIP PERK' ? '#fef5e7' :
                                  event.badge === 'FREE' ? '#e8f5e9' :
                                  event.badge === 'SPECIAL EVENT' ? '#fce4ec' : '#f3e5f5',
                      color: event.badge === 'VIP PERK' ? '#f39c12' :
                             event.badge === 'FREE' ? '#27ae60' :
                             event.badge === 'SPECIAL EVENT' ? '#e91e63' : '#9c27b0'
                    }}>
                      {event.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#4a5568', marginBottom: '4px' }}>
                    📅 {event.date} • {event.time}
                  </div>
                  <div style={{ fontSize: '14px', color: '#4a5568', marginBottom: '12px' }}>
                    📍 {event.location}
                  </div>
                  <p style={{ fontSize: '14px', color: '#718096', lineHeight: '1.5', marginBottom: '12px' }}>
                    {event.description}
                  </p>
                  {event.vipPerk && (
                    <div style={{
                      background: '#fffbeb',
                      border: '2px solid #fbbf24',
                      borderRadius: '8px',
                      padding: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#92400e', marginBottom: '4px' }}>
                        ⭐ VIP MEMBER PERK
                      </div>
                      <div style={{ fontSize: '13px', color: '#78350f' }}>
                        {event.vipPerk}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={event.googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: '1',
                    minWidth: '180px',
                    padding: '14px 20px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                  }}
                >
                  📅 Add to Google Calendar
                </a>
                <a
                  href={event.icsUrl}
                  download
                  style={{
                    flex: '1',
                    minWidth: '180px',
                    padding: '14px 20px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    background: 'white',
                    color: '#667eea',
                    border: '2px solid #667eea',
                    borderRadius: '10px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  💾 Download .ics File
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '40px',
          padding: '24px',
          background: 'white',
          borderRadius: '16px',
          textAlign: 'center',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#1a202c' }}>
            How to Use
          </h3>
          <div style={{ fontSize: '14px', color: '#718096', lineHeight: '1.6', textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
            <p><strong>On Mobile:</strong> Tap "Add to Google Calendar" for instant adding. The .ics file will download and can be opened in any calendar app.</p>
            <p style={{ marginTop: '12px' }}><strong>On Desktop:</strong> Both buttons work great. Google Calendar opens in your browser, .ics files open in Outlook/Apple Calendar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
