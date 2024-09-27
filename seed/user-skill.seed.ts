import { userSeed } from './user.seed';
import { skillSeed } from './skill.seed';

// Function to generate a random note for a skill
function generateRandomNote(): string {
  const notes = [
    'I enjoy',
    'There is nothing I prefer doing than',
    'I would like to say im pretty decent at',
    'Come to me for help with',
    'Just a dude who is passionate about',
    'Avid enjoyer of',
  ];
  return notes[Math.floor(Math.random() * notes.length)];
}

// Function to generate the UserSkill seed
function generateUserSkillSeed(): any[] {
  const userSkillSeed: any[] = [];

  for (let i = 1; i < 10; i += 2) {
    const randomNote = generateRandomNote();

    userSkillSeed.push({
      userId: 1,
      skillId: i,
      skillLevel: 3,
      note: `Hi! My name is Chuck Norris. ${randomNote} ${skillSeed[
        i - 1
      ].name.toLowerCase()}`,
    });
  }

  for (let i = 2; i < 11; i += 2) {
    const randomNote = generateRandomNote();

    userSkillSeed.push({
      userId: 2,
      skillId: i,
      skillLevel: 3,
      note: `${randomNote} ${skillSeed[i - 1].name.toLowerCase()}`,
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

          const randomSkillLevel = Math.floor(Math.random() * 4); // Skill level between 0 and 3
          const randomNote = generateRandomNote();

          userSkillSeed.push({
            userId: index + 1,
            skillId: skillId,
            skillLevel: randomSkillLevel,
            note: `${randomNote} ${skillSeed[
              randomSkillIndex
            ].name.toLowerCase()}`,
          });
        }
      }
    }
  });

  return userSkillSeed;
}

export const userSkillSeed = generateUserSkillSeed();
