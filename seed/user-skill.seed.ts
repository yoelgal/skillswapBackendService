import { userSeed } from './user.seed';
import { skillSeed } from './skill.seed';

// Function to generate a random note for a skill
function generateRandomNote(): string {
  const notes = ['Intermediate at', 'Beginner at', 'Experienced in'];
  return notes[Math.floor(Math.random() * notes.length)];
}

// Function to generate the UserSkill seed
function generateUserSkillSeed(): any[] {
  const userSkillSeed: any[] = [];

  userSeed.forEach((user, index) => {
    // Create a set to track assigned skills and avoid duplicates
    const assignedSkills = new Set<number>();

    while (assignedSkills.size < 5) {
      const randomSkillIndex = Math.floor(Math.random() * skillSeed.length);
      const skillId = randomSkillIndex + 1;

      // Only add the skill if it's not already assigned to this user
      if (!assignedSkills.has(skillId)) {
        assignedSkills.add(skillId);

        const randomSkillLevel = Math.floor(Math.random() * 4) + 1; // Skill level between 1 and 4
        const randomNote = generateRandomNote();

        userSkillSeed.push({
          userId: index + 1,
          skillId: skillId,
          skillLevel: randomSkillLevel,
          note: `${randomNote} ${skillSeed[randomSkillIndex].name}`,
        });
      }
    }
  });

  return userSkillSeed;
}

export const userSkillSeed = generateUserSkillSeed();
