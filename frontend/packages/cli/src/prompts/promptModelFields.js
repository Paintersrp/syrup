import inquirer from 'inquirer';

/**
 * Prompts for the model fields and returns the fields array.
 * @returns {Promise<Array>} Promise resolving to an array of field objects.
 */
export async function promptModelFields() {
  const fields = [];

  const promptField = async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'fieldName',
        message: 'Enter the field name (or leave empty to finish):',
      },
    ]);

    const fieldName = answers.fieldName.trim();

    if (fieldName === '') {
      return fields;
    } else {
      const fieldAnswers = await inquirer.prompt([
        {
          type: 'list',
          name: 'fieldType',
          message: 'Select the field type:',
          choices: ['char', 'int'],
        },
      ]);

      fields.push({ name: fieldName, type: fieldAnswers.fieldType });
      return promptField();
    }
  };

  return promptField();
}
