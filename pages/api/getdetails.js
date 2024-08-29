import puppeteer from 'puppeteer';
const cheerio = require('cheerio');

export default async function handler(req, res) {
  const { universityName } = req.query;
  console.log("The university name is: " + universityName);

  if (!universityName) {
    return res.status(400).json({ error: 'University name is required' });
  }

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });

    const searchUrl = `https://www.niche.com/colleges/${universityName.replace(/\s+/g, '-').toLowerCase()}/`;
    console.log("The searchUrl is: " + searchUrl);

    await page.goto(searchUrl);

    // Wait for the content to load
    await page.waitForSelector('#admissions');

    // Get the page content
    const content = await page.content();

    // Load content into Cheerio
    const $ = cheerio.load(content);

    // Extract the university image src (if needed)
    const universityImageSrc = $('.postcard__figure__image source').attr('srcset');
    console.log("The src is: " + universityImageSrc);

    // Extract admissions details
    const admissionsDetails = {
      acceptanceRate: $('#admissions .profile__bucket--1 .scalar__value span').text(),
      satRange: $('#admissions .profile__bucket--3 .scalar--three:nth-of-type(1) .scalar__value span').text(),
      actRange: $('#admissions .profile__bucket--3 .scalar--three:nth-of-type(2) .scalar__value span').text(),
      applicationFee: $('#admissions .profile__bucket--3 .scalar--three:nth-of-type(3) .scalar__value span').text(),
      satOrActRecommended: $('#admissions .profile__bucket--3 .scalar--three:nth-of-type(4) .scalar__value span').text(),
      highSchoolGpa: $('#admissions .profile__bucket--3 .scalar--three:nth-of-type(5) .scalar__value span').text(),
      earlyDecisionEearlyAction: $('#admissions .profile__bucket--3 .scalar--three:nth-of-type(6) .scalar__value span').text(),
    };

    await browser.close();

    // Return the admissions details as a JSON response
    res.status(200).json({ universityImageSrc, admissionsDetails });
  } catch (error) {
    console.error('Error fetching admissions details:', error);
    res.status(500).json({ error: 'Failed to fetch admissions details' });
  }
}
