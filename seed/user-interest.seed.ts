import { userSeed } from './user.seed';
import { skillSeed } from './skill.seed';

// Function to generate a random skill level
function generateRandomSkillLevel(): number {
  return Math.floor(Math.random() * 4); // Skill level between 1 and 4
}

// Function to generate the UserInterest seed
function generateUserInterestSeed(): any[] {
  const userInterestSeed: any[] = [];

  for (let i = 2; i < 11; i += 2) {
    userInterestSeed.push({
      userId: 1,
      skillId: i,
      skillLevel: 0,
    });
  }

  for (let i = 1; i < 10; i += 2) {
    userInterestSeed.push({
      userId: 2,
      skillId: i,
      skillLevel: 0,
    });
  }

  userSeed.forEach((user, index) => {
    if (index > 2) {
      // Create a set to track assigned skills and avoid duplicates
      const assignedSkills = new Set<number>();

      while (assignedSkills.size < 5) {
        const randomSkillIndex = Math.floor(Math.random() * skillSeed.length);
        const skillId = randomSkillIndex + 1;

        // Only add the skill if it's not already assigned to this user
        if (!assignedSkills.has(skillId)) {
          assignedSkills.add(skillId);

          const randomSkillLevel = generateRandomSkillLevel();

          userInterestSeed.push({
            userId: index + 1,
            skillId: skillId,
            skillLevel: randomSkillLevel,
          });
        }
      }
    }
  });

  return userInterestSeed;
}

export const userInterestSeed = generateUserInterestSeed();
