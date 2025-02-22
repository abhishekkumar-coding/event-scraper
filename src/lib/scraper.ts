import axios from "axios";
import * as cheerio from "cheerio";
import cron from "node-cron"
import Event from "@/model/event";
// import { schedule } from "@/utils/scheduler";

/**
 * Scrapes events from Eventbrite Sydney page.
 */
async function scrapeEvents(): Promise<void> {
  const url = "https://www.eventbrite.com.au/d/australia--sydney/all-events/";

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const events: EventData[] = [];

    $(".discover-search-desktop-card").each((index, element) => {
      const img = $(element).find("img").attr("src") || ""; 
      const title = $(element).find("h3").text().trim();
      const date = $(element).find("p").first().text().trim();
      let link = $(element).find("a").attr("href");

      // Convert relative links to absolute URLs
      if (link && !link.startsWith("http")) {
        link = `https://www.eventbrite.com.au${link}`;
      }

      if (img && title && date && link) {
        events.push({ img, title, date, link });
      }
    });

    if (events.length === 0) {
      console.log("⚠️ No events found. The page might be dynamically loading content.");
      return;
    }

    // Update database
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log("✅ Events updated successfully:", events);
  } catch (error) {
    console.error("❌ Error Occurred:", (error as Error).message);
  }
}

/**
 * Interface for event data.
 */
interface EventData {
  img: string;
  title: string;
  date: string;
  link: string;
}

cron.schedule("0 0 * * *", scrapeEvents);
export { scrapeEvents };
