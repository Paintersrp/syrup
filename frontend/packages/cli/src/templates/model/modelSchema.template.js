export const ModelSchemaTemplate = (modelName, fields) => {
  const fieldDefinitions = fields.map(generateFieldDefinition).join('\n');

  return `
from django.db import models
from backend.customs import *
  
class ${modelName}(models.Model): 
    \n${fieldDefinitions}
    
    def method(self):
        pass

    def __str__(self):
        return self.id
      
    # Define any additional model settings here
    class Meta:
        verbose_name = '${modelName}'
        verbose_name_plural = '${modelName}s'`;
};

function generateFieldDefinition(field) {
  const { name, type } = field;
  let fieldDefinition = '';

  switch (type) {
    case 'char':
      fieldDefinition = `    ${name} = CustomCharField(max_length=255)`;
      break;
    case 'int':
      fieldDefinition = `    ${name} = CustomDecimalField()`;
      break;
    case 'text':
      fieldDefinition = `    ${name} = CustomTextField()`;
      break;
    case 'email':
      fieldDefinition = `    ${name} = CustomEmailField(max_length=255)`;
      break;
    case 'boolean':
      fieldDefinition = `    ${name} = CustomBooleanField(max_length=255)`;
      break;
    case 'url':
      fieldDefinition = `    ${name} = CustomURLField(max_length=255)`;
      break;
    default:
      fieldDefinition = '';
  }

  return fieldDefinition;
}
