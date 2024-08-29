import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const {
        location,   // e.g., { city: "Dallas", state: "TX" }
        sortOrder,  // e.g., "asc" or "desc"
        limit,
        major      // e.g., "latest.academics.program_percentage.computer"
    } = req.query;

    const API_KEY = process.env.COLLEGE_SCORECARD_API_KEY;
    const BASE_URL = `https://api.data.gov/ed/collegescorecard/v1/schools`;

    let fields = [
        'school.name',
        'school.city',
        'school.state',
        'school.school_url',
        'latest.cost.attendance.academic_year',
        'latest.school.price_calculator_url',
        'latest.admissions.admission_rate.overall',
        'latest.school.accreditor',
        'latest.school.main_campus',
        'latest.admissions.sat_scores.average.overall'
    ];

    // Add major to fields if specified
    if (major) {
        fields.push(major);
    }

    let params = {
        api_key: API_KEY,
        fields: fields.join(','),
        per_page: limit || 300, // Default to 20 results if limit not provided
        sort: `school.name:${sortOrder || 'asc'}` // Sort by name, default to ascending
    };

    // Handle location parameter
    if (location) {
        try {
            const locationObj = JSON.parse(location);
            if (locationObj.city) params['school.city'] = locationObj.city;
            if (locationObj.state) params['school.state'] = locationObj.state;
        } catch (error) {
            console.error('Error parsing location parameter:', error.message);
            return res.status(400).json({ error: 'Invalid location format' });
        }
    }

    try {
        const response = await axios.get(BASE_URL, { params });
        let results = response.data.results;

        // Filter results where the major percentage is greater than 0
        if (major) {
            results = results.filter(school => {
                const majorPercentage = school[major];
                return majorPercentage > 0;
            });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch data from College Scorecard API' });
    }
}

