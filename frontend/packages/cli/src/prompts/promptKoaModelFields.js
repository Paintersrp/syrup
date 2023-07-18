import inquirer from 'inquirer';

/**
 * Prompts for the model fields and returns the fields array.
 * @returns {Promise<Array>} Promise resolving to an array of field objects.
 */
export async function promptKoaModelFields() {
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
          choices: ['STRING', 'NUMBER', 'BOOLEAN'],
        },
      ]);

      if (fieldAnswers.fieldType === 'STRING') {
        const stringFieldAnswers = await inquirer.prompt([
          {
            type: 'input',
            name: 'minLength',
            message: 'Enter the minimum length of the string field:',
            validate: (value) => {
              if (value.trim().length > 0 && Number.isInteger(Number(value))) {
                return true;
              }
              return 'Please enter a valid integer value for the minimum length.';
            },
          },
          {
            type: 'input',
            name: 'maxLength',
            message: 'Enter the maximum length of the string field:',
            validate: (value) => {
              if (value.trim().length > 0 && Number.isInteger(Number(value))) {
                return true;
              }
              return 'Please enter a valid integer value for the maximum length.';
            },
          },
        ]);

        fieldAnswers.minLength = stringFieldAnswers.minLength;
        fieldAnswers.maxLength = stringFieldAnswers.maxLength;
      }

      const requiredAnswer = await inquirer.prompt([
        {
          type: 'list',
          name: 'isRequired',
          message: 'Is the field required or optional?',
          choices: ['required', 'optional'],
        },
      ]);

      const verboseNameAnswer = await inquirer.prompt([
        {
          type: 'input',
          name: 'verboseName',
          message: 'Enter the verbose field name (or leave empty to skip):',
        },
      ]);

      const defaultValueAnswer = await inquirer.prompt([
        {
          type: 'input',
          name: 'defaultValue',
          message: 'Enter the default value (or leave empty to skip):',
        },
      ]);

      fields.push({
        name: fieldName,
        type: fieldAnswers.fieldType,
        min: fieldAnswers.minLength,
        max: fieldAnswers.maxLength,
        required: requiredAnswer.isRequired,
        verbose: verboseNameAnswer.verboseName,
        defaultValue: defaultValueAnswer.defaultValue,
      });

      return promptField();
    }
  };

  return promptField();
}
