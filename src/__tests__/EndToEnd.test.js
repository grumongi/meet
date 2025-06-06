/**
 * @jest-environment node
 */
import puppeteer from 'puppeteer';
import React from 'react';

describe('show/hide event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({headless: false, slowMo: 250, timeout: 0});// removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.event');
 });

  afterAll(() => {
   browser.close();
 });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
    });
});
