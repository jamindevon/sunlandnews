import https from 'https';
https.get('https://sunlandnews.com/calendars/big-events', (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
        const lines = data.split('\n');
        let inTrombone = false;
        for (let l of lines) {
            if (l.includes('SUMMARY:Trombone Shorty')) console.log(l);
            if (l.startsWith('DTSTART') && l.includes('190000')) console.log(l);
        }
    });
});
