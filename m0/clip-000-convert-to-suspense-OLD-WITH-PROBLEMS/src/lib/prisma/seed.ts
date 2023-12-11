const { PrismaClient } = require("@prisma/client");
const data = require("../../../db.json");

// import { createGUID } from "@/lib/general-utils";
// const { createGUID } = require("@/lib/general-utils");
// const createGUID = require("@/lib/general-utils").createGUID;
const prisma = new PrismaClient();

function createGUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// seed all the tables for all data scenarios in the course
async function main() {
  // Seed Sessions
  for (const session of data.sessions) {
    await prisma.session.create({
      data: {
        id: session.id,
        title: session.title,
        description: session.description,
        //sessionStart: session.sessionStart,
        // speakers will be linked later
      },
    });
  }

  // Seed Speakers
  for (const speaker of data.speakers) {
    const createdSpeaker = await prisma.speaker.create({
      data: {
        id: speaker.id,
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        company: speaker.company,
        twitterHandle: speaker.twitterHandle,
        userBioShort: speaker.userBioShort,
        timeSpeaking: speaker.timeSpeaking,
      },
      // sessions and favorites will be handled separately
    });

    // Seed SpeakerSessions
    for (const sessionId of speaker.sessionIds) {
      await prisma.speakerSession.create({
        data: {
          speakerId: createdSpeaker.id,
          sessionId: sessionId,
        },
      });
    }
  }

  await prisma.attendee.create({
    data: {
      id: createGUID(),
      firstName: "admin",
      lastName: "admin",
      email: "admin@siliconvalley-codecamp.com",
      createdDate: new Date(),
    },
  });

  // Seed Attendees
  for (const attendee of data.attendees) {
    await prisma.attendee.upsert({
      where: { id: attendee.id },
      update: {},
      create: {
        id: attendee.id,
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        email: attendee.email,
        createdDate: attendee.createdDate,
        // favorites will be handled separately
      },
    });
  }

  // Seed AttendeeFavorites
  for (const favorite of data.attendeeFavorites) {
    const attendeeRecExists = await prisma.attendee.findUnique({
      where: { id: favorite.attendeeId },
    });
    if (!attendeeRecExists) {
      console.log("no attendee found");
      console.log(`Attendee ${favorite.attendeeId} does not exist`);
    }

    await prisma.attendeeFavorite.create({
      data: {
        attendeeId: favorite.attendeeId,
        speakerId: favorite.speakerId,
      },
    });
  }
}

main()
  .then(async () => {
    console.log("Seeding from db.json complete");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
