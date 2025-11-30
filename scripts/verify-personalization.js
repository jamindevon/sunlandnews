const events = [
    {
        title: 'Jazz in the Park',
        location_city: 'Fort Pierce',
        categories: ['Live Music', 'Arts & Culture', 'Nightlife'],
        start_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
    },
    {
        title: 'Morning Yoga',
        location_city: 'Fort Pierce',
        categories: ['Outdoors', 'Health & Wellness'],
        start_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
    {
        title: 'Food Truck Frenzy',
        location_city: 'Port St. Lucie',
        categories: ['Food & Drink', 'Family & Kids'],
        start_datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    }
];

function testFilter(userPrefs, testName) {
    console.log(`\n--- Testing: ${testName} ---`);
    console.log('Preferences:', JSON.stringify(userPrefs, null, 2));

    const filtered = events.filter(event => {
        // A. Interest Match
        const userInterests = userPrefs.interests || [];
        const eventCategories = event.categories || [];
        const hasInterestMatch = userInterests.length === 0 || eventCategories.some(cat => userInterests.includes(cat));

        if (!hasInterestMatch) return false;

        // B. Location Match
        const userLoc = userPrefs.location_preference;
        const eventCity = event.location_city || '';
        let hasLocationMatch = true;

        if (userLoc === 'fort_pierce') {
            hasLocationMatch = eventCity.toLowerCase().includes('fort pierce');
        } else if (userLoc === 'psl_fp') {
            hasLocationMatch = eventCity.toLowerCase().includes('fort pierce') || eventCity.toLowerCase().includes('port st. lucie');
        }

        if (!hasLocationMatch) return false;

        return true;
    });

    console.log('Matched Events:', filtered.map(e => e.title));
    return filtered;
}

// Test 1: Likes Music in Fort Pierce
testFilter({
    interests: ['Live Music'],
    location_preference: 'fort_pierce'
}, 'Music Lover in FP');

// Test 2: Likes Food in PSL
testFilter({
    interests: ['Food & Drink'],
    location_preference: 'psl_fp'
}, 'Foodie in PSL/FP');

// Test 3: Likes Outdoors but only in PSL (Should match nothing if Yoga is in FP)
testFilter({
    interests: ['Outdoors'],
    location_preference: 'port_st_lucie' // Assuming strict check, but our logic only has specific cases
}, 'Outdoors in PSL (Mismatch)');
