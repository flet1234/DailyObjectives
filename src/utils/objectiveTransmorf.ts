export const objectivesToString = (objectives: string[]) => {
  let objectivesString = objectives.join(' ');
  return objectivesString;
};

export const stringToObjectives = (objectivesString: string) => {
  let objectives = objectivesString.split(' ');
  return objectives;
};
