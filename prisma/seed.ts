import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.notification.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.user.deleteMany();
  await prisma.setting.deleteMany();

  // User creation
  const password = await bcrypt.hash('password123', 10);
  const user1 = await prisma.user.create({
    data: {
      username: 'johndoe',
      email: 'john@example.com',
      passwordHash: password,
      isAdmin: true,
      bio: 'I am a software developer',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'janedoe',
      email: 'jane@example.com',
      passwordHash: password,
      bio: 'I love coding and cats',
    },
  });

  // Topics creation
  const topic1 = await prisma.topic.create({
    data: {
      name: 'Technology',
      description: 'Discussions about the latest in tech',
    },
  });

  const topic2 = await prisma.topic.create({
    data: {
      name: 'Programming',
      description: 'Share your coding experiences',
    },
  });

  // Conversations creation
  const conversation1 = await prisma.conversation.create({
    data: {
      title: 'The future of AI',
      content: 'What do you think about the rapid advancements in AI?',
      userId: user1.id,
      topicId: topic1.id,
    },
  });

  const conversation2 = await prisma.conversation.create({
    data: {
      title: 'Best practices in React',
      content: "Let's discuss some best practices when developing with React.",
      userId: user2.id,
      topicId: topic2.id,
    },
  });

  // Comments creation
  await prisma.comment.create({
    data: {
      content: 'I think AI will revolutionize many industries.',
      userId: user2.id,
      conversationId: conversation1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Always use functional components and hooks!',
      userId: user1.id,
      conversationId: conversation2.id,
    },
  });

  // Notifications creation
  await prisma.notification.create({
    data: {
      userId: user1.id,
      type: 'comment',
      message: 'Someone commented on your conversation',
      conversationId: conversation1.id,
    },
  });

  // User Activity creation
  await prisma.userActivity.create({
    data: {
      userId: user1.id,
      activityType: 'create_conversation',
      conversationId: conversation1.id,
    },
  });

  // Configuration settings
  await prisma.setting.create({
    data: {
      key: 'site_name',
      value: 'Community Pro',
    },
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
