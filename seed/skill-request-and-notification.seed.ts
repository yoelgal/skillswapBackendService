import { userSkillSeed } from './user-skill.seed';
import { userInterestSeed } from './user-interest.seed';
import { skillSeed } from './skill.seed';

// Function to generate a random note or message
function generateRandomText(skillId: number): string {
  const actions = [
    'Requesting guidance in',
    'Seeking help in',
    'Looking for mentoring in',
  ];
  const skill = skillSeed[skillId - 1];

  return `${
    actions[Math.floor(Math.random() * actions.length)]
  } ${skill.name.toLowerCase()}`;
}

// Function to decide if a request was accepted or declined
function wasRequestAccepted(): boolean {
  return Math.random() < 0.5; // 50% chance of being accepted or declined
}

// Function to generate SkillRequest and Notification seeds
function generateSeeds(): { skillRequestSeed: any[]; notificationSeed: any[] } {
  const skillRequestSeed: any[] = [];
  const notificationSeed: any[] = [];

  for (let i = 1; i < 10; i += 2) {
    skillRequestSeed.push({
      userId: 1,
      senderId: 2,
      skillId: i,
      note: generateRandomText(i),
    });
  }
  for (let i = 2; i < 11; i += 2) {
    skillRequestSeed.push({
      userId: 2,
      senderId: 1,
      skillId: i,
      note: generateRandomText(i),
    });
  }

  userSkillSeed.forEach((userSkill, index) => {
    if (index > 1) {
      userInterestSeed.forEach((userInterest) => {
        if (
          userSkill.skillId === userInterest.skillId &&
          userSkill.userId !== userInterest.userId &&
          userSkill.skillLevel > userInterest.skillLevel
        ) {
          const isAccepted = wasRequestAccepted();
          const text = generateRandomText(userSkill.skillId);

          // Alternate between adding a skill request and a notification
          if (Math.random() < 0.5) {
            // Add as a skill request
            skillRequestSeed.push({
              userId: userSkill.userId,
              senderId: userInterest.userId,
              skillId: userSkill.skillId,
              note: text,
            });
          } else {
            // Add as a notification
            notificationSeed.push({
              senderId: userInterest.userId, // The sender of the interest becomes the sender of the notification
              receiverId: userSkill.userId, // The user with the skill becomes the receiver
              skillId: userSkill.skillId,
              accepted: isAccepted,
            });
          }
        }
      });
    }
  });

  return { skillRequestSeed, notificationSeed };
}

const { skillRequestSeed, notificationSeed } = generateSeeds();

export { skillRequestSeed, notificationSeed };
