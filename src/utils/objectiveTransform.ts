import uuid from 'react-native-uuid';
import {Objective} from '../interfaces-and-types/interfacesAndTypes';

export const objectivesToString = (objectives: Objective[]) => {
  let arrayOfTitles = objectives.map(objective => objective.title);
  let objectivesString = arrayOfTitles.join('\n');
  return objectivesString;
};

export const stringToObjectives = (objectivesString: string): Objective[] => {
  let objectivesTitlesList = objectivesString.split('\n');
  let objectives = objectivesTitlesList
    .map(objectiveTitle => objectiveTitle.trim()) // Remove extra spaces
    .filter(objectiveTitle => objectiveTitle.length > 0) // Remove empty lines
    .map(objectiveTitle => {
      return {
        id: uuid.v4() as string,
        title: objectiveTitle,
        completed: false,
      };
    });
  return objectives;
};
