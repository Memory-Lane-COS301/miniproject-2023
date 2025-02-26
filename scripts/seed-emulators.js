require('dotenv').config();
const admin = require('firebase-admin');
const { faker } = require('@faker-js/faker');
const { Timestamp } = require('firebase-admin/firestore');
const { user } = require('firebase-functions/v1/auth');

// ============================================================================
// CONFIG
// ============================================================================

const app = admin.initializeApp({
    projectId: 'demo-project'
});

const firestore = admin.firestore(app);
firestore.settings({
    host: process.env.FIRESTORE_EMULATOR_HOST,
    ssl: false,
});

async function seedData() {
    faker.seed(123)
    await seedUsers();
    await generateMemories(3, 5);
    await seedFriends();
    await generateMemoriesFor('syqx1Gr51RFf2SZ6hLumMSi3tgqt', 2, 2);
    await generateFriendsFor('syqx1Gr51RFf2SZ6hLumMSi3tgqt', 5);
    // await generateCommentsFor('9e03f66e-18f9-4c6a-8b35-b6f5ae92735d', 5);
}

// ============================================================================
// 	MAIN FUNCTIONS
// ============================================================================

async function seedUsers() {
    const users = generateUsers(50);
    const batch = firestore.batch();

    users.forEach((user) => {
        const userRef = admin.firestore().collection('users').doc(user.userId);
        batch.set(userRef, user);
    });

    try {
        await batch.commit();
        console.log('Users seeded successfully.');
    } catch (error) {
        console.error('Error seeding user profiles: ', error);
    }
}

function generateUsers(numUsers) {
  const users = [];

    const now = Timestamp.now();
    const seconds = now.seconds + 24 * 60 * 60;
    const nanoseconds = now.nanoseconds;

    for (let i = 0; i < numUsers; i++) {
        const name = faker.name.firstName();
        const surname = faker.name.lastName();
        const user = {
        userId: faker.datatype.uuid(),
        name: name,
        surname: surname,
        username: faker.internet.userName(name, surname),
        email: faker.internet.email(name, surname),
        profileImgUrl: faker.internet.avatar(),
        bio: faker.lorem.sentence(),
        friendCount: 0,
        memoryCount: 0,
        accountTime: 86400, // 24 hours
        lastOnline: Timestamp.now(),
        online: false,
        created: Timestamp.now(),
        deathTime: new Timestamp(seconds, nanoseconds),
    };

    users.push(user);
}

  return users;
}

async function generateMemories(numMemories, numComments) {
    const usersSnapshot = await firestore.collection('users').get();

    const now = Timestamp.now();
    const seconds = now.seconds + 6 * 60 * 60;
    const nanoseconds = now.nanoseconds;

    for (userDoc of usersSnapshot.docs) {
        const memories = [];
        const user = userDoc.data();

        for (let i = 0; i < numMemories; i++) {
            const memory = {
                userId: user.userId,
                memoryId: faker.datatype.uuid(),
                username: user.username,
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(3),
                imgUrl: faker.image.image(640, 480, true),
                profileImgUrl: user.profileImgUrl,
                created: Timestamp.now(),
                commentsCount: numComments,
                remainingTime: 3600,
                alive: true,
                deathTime: new Timestamp(seconds, nanoseconds),
                comments: await generateComments(numComments, pickRandomElements(usersSnapshot.docs, 20)),
            };

            memories.push(memory);
        }

        for (const memory of memories) {
            const comments = memory.comments;
            delete memory.comments;
            const memoryRef = admin.firestore().collection('memories').doc(memory.memoryId);
            await memoryRef.set(memory);

            for (const comment of comments) {
                const commentRef = admin.firestore().collection(`memories/${memory.memoryId}/comments`).doc(comment.commentId);
                await commentRef.set(comment);
            }
        }
    };

    console.log('Memories seeded successfully.');
}

async function generateMemoriesFor(userId, numMemories, numComments) {
    const usersSnapshot = await firestore.collection('users').get();
    const userDoc = await firestore.collection('users').doc(userId).get();

    const memories = [];
    const user = userDoc.data();

    const now = Timestamp.now();
    const seconds = now.seconds + 6 * 60 * 60;
    const nanoseconds = now.nanoseconds;

    for (let i = 0; i < numMemories; i++) {
        const memory = {
            userId: user.userId,
            memoryId: faker.datatype.uuid(),
            username: user.username,
            title: faker.lorem.words(3),
            description: faker.lorem.paragraph(3),
            imgUrl: faker.image.image(640, 480, true),
            profileImgUrl: user.profileImgUrl,
            created: Timestamp.now(),
            commentsCount: numComments,
            remainingTime: 3600,
            alive: true,
            deathTime: new Timestamp(seconds, nanoseconds),
            comments: await generateComments(numComments, pickRandomElements(usersSnapshot.docs, 20)),
        };

        memories.push(memory);
    }

    for (const memory of memories) {
        const comments = memory.comments;
        delete memory.comments;
        const memoryRef = admin.firestore().collection('memories').doc(memory.memoryId);
        await memoryRef.set(memory);

        for (const comment of comments) {
            const commentRef = admin.firestore().collection(`memories/${memory.memoryId}/comments`).doc(comment.commentId);
            await commentRef.set(comment);
        }
    }

    console.log(`Memories for ${user.username} seeded successfully.`);
}

async function generateCommentsFor(memoryId, numComments) {
    const usersSnapshot = await firestore.collection('users').get();

    const comments = await generateComments(numComments, pickRandomElements(usersSnapshot.docs, 20));

    for (const comment of comments) {
        const commentRef = admin.firestore().collection(`memories/${memoryId}/comments`).doc(comment.commentId);
        await commentRef.set(comment);
    }
}

async function generateComments(numComments, userDocs) {
    const comments = [];

    for (let i = 0; i < numComments; i++) {
        const user = randomElement(userDocs).data();
        const comment = {
            userId: user.userId,
            commentId: faker.datatype.uuid(),
            username: user.username,
            profileImgUrl: user.profileImgUrl,
            text: faker.lorem.paragraph(1),
            created: Timestamp.now(),
        };

        comments.push(comment);
    }

    return comments;
}

async function seedFriends() {
    const usersSnapshot = await firestore.collection('users').get();

    for (userDoc of usersSnapshot.docs) {
        const numFriends = getRandomInt(5);
        const randomUsers = pickRandomElements(usersSnapshot.docs, 6);
        const randomUserIds = randomUsers.map(doc => doc.id)
        const index = randomUserIds.indexOf(userDoc.id);

        if (index !== -1)
            randomUsers.splice(index, 1);
        
        for (let i = 0; i < numFriends; i++) {
            const friend = {
                userId1: userDoc.id,
                userId2: randomUsers[i].id,
                created: Timestamp.now()
            };

            await admin.firestore().collection('friends').doc(faker.datatype.uuid()).set(friend);
        }
    }

    console.log('Friends seeded successfully.');
}

async function generateFriendsFor(userId, numFriends) {
    const usersSnapshot = await firestore.collection('users').get();
    const userDoc = await firestore.collection('users').doc(userId).get();
    const user = userDoc.data();

    const randomUsers = pickRandomElements(usersSnapshot.docs, 6);
    const randomUserIds = randomUsers.map(doc => doc.id)
    const index = randomUserIds.indexOf(userDoc.id);

    if (index !== -1)
        randomUsers.splice(index, 1);
    
    for (let i = 0; i < numFriends; i++) {
        const friend = {
            userId1: userDoc.id,
            userId2: randomUsers[i].id,
            created: Timestamp.now()
        };

        await admin.firestore().collection('friends').doc(faker.datatype.uuid()).set(friend);
    }

    console.log(`Friends for ${user.username} seeded successfully.`);
}

// ============================================================================
// 	UTILITY FUNCTIONS
// ============================================================================

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomElements(arr, n) {
  if (n > arr.length) {
    throw new Error('n cannot be greater than the length of the array');
  }
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

seedData();