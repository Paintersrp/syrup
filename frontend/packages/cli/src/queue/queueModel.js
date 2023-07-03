import fs from 'fs-extra';
import path from 'path';

import { ModelSchemaTemplate } from '../templates/model/modelSchema.template.js';
import { ModelSerializerTemplate } from '../templates/model/modelSerializer.template.js';
import { ModelUrlsTemplate } from '../templates/model/modelUrls.template.js';
import { ModelViewsTemplate } from '../templates/model/modelViews.template.js';

export async function queueModel(generator, modelDir, modelName, fields) {
  const modelTemplate = ModelSchemaTemplate(modelName, fields);
  await queueModelsFile(generator, modelDir, modelTemplate);

  const serializerTemplate = ModelSerializerTemplate(modelName);
  await queueSerializersFile(generator, modelDir, modelName, serializerTemplate);

  const viewsTemplate = ModelViewsTemplate(modelName);
  await queueViewsFile(generator, modelDir, viewsTemplate);

  const urlsTemplate = ModelUrlsTemplate(modelName);
  await queueUrlsFile(generator, modelDir, urlsTemplate);
}

export async function queueModelsFile(generator, modelDir, template) {
  const modelsFilePath = path.join(modelDir, 'models.py');

  const fileExists = await fs.pathExists(modelsFilePath);

  if (fileExists) {
    // File already exists, append the template
    fs.readFile(modelsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading models.py:', err);
        return;
      }
      const updatedData = data + '\n\n' + template;
      generator.addFileToQueue(updatedData, modelsFilePath, 'Models.py File', false);
    });
  } else {
    // File doesn't exist, create it with the template
    const initialData = 'from django.db import models\n\n' + template;
    fs.writeFile(modelsFilePath, initialData, (err) => {
      if (err) {
        console.error('Error creating models.py:', err);
        return;
      }
      generator.addFileToQueue(initialData, modelsFilePath, 'Models.py File', false);
    });
  }
}

export async function queueSerializersFile(generator, modelDir, modelName, template) {
  const serializerFilePath = path.join(modelDir, 'serializers.py');

  const fileExists = await fs.pathExists(serializerFilePath);

  if (fileExists) {
    // File already exists, modify the content
    fs.readFile(serializerFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading serializers.py:', err);
        return;
      }

      const lines = data.split('\n');

      const serializerClassIndex = lines.findIndex((line) => line.includes('.serializer_class'));

      if (serializerClassIndex === -1) {
        console.error('Error: Serializer class assignment block not found in serializers.py');
        return;
      }

      const serializerBlockStart = lines
        .slice(0, serializerClassIndex + 1)
        .reverse()
        .findIndex((line) => line.trim() === '');
      const insertIndex = serializerClassIndex - serializerBlockStart + 1;

      lines.splice(insertIndex, 0, template);
      lines.splice(
        serializerClassIndex + 1,
        0,
        `${modelName}.serializer_class = ${modelName}Serializer`
      );

      const updatedData = lines.join('\n');
      generator.addFileToQueue(updatedData, serializerFilePath, 'Serializers.py File', false);
    });
  } else {
    // File doesn't exist, create it with the template
    const initialData = 'from rest_framework import serializers\n\n' + template;
    fs.writeFile(serializerFilePath, initialData, (err) => {
      if (err) {
        console.error('Error creating serializers.py:', err);
        return;
      }
      generator.addFileToQueue(initialData, serializerFilePath, 'Serializers.py File', false);
    });
  }
}

export async function queueViewsFile(generator, modelDir, viewsTemplate) {
  const viewsFilePath = path.join(modelDir, 'views.py');

  const fileExists = await fs.pathExists(viewsFilePath);

  if (fileExists) {
    // File already exists, modify the content
    fs.readFile(viewsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading views.py:', err);
        return;
      }

      const updatedData = data + '\n\n' + viewsTemplate;
      generator.addFileToQueue(updatedData, viewsFilePath, 'Views.py File', false);
    });
  } else {
    // File doesn't exist, create it with the template
    const initialData = 'from django.http import HttpResponse\n\n' + viewsTemplate;
    fs.writeFile(viewsFilePath, initialData, (err) => {
      if (err) {
        console.error('Error creating views.py:', err);
        return;
      }
      generator.addFileToQueue(initialData, viewsFilePath, 'Views.py File', false);
    });
  }
}

export async function queueUrlsFile(generator, modelDir, urlTemplate) {
  const urlsFilePath = path.join(modelDir, 'urls.py');

  const fileExists = await fs.pathExists(urlsFilePath);

  if (fileExists) {
    // File already exists, modify the content
    fs.readFile(urlsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading urls.py:', err);
        return;
      }

      const lines = data.split('\n');

      const urlpatternsStartIndex = lines.findIndex((line) => line.includes('urlpatterns'));
      const urlpatternsEndIndex = lines.findIndex(
        (line, index) => index > urlpatternsStartIndex && line.trim().endsWith(']')
      );

      if (urlpatternsStartIndex === -1 || urlpatternsEndIndex === -1) {
        console.error('Error: urlpatterns block not found in urls.py');
        return;
      }

      const insertIndex = urlpatternsEndIndex;

      lines.splice(insertIndex, 0, urlTemplate);

      const updatedData = lines.join('\n');
      generator.addFileToQueue(updatedData, urlsFilePath, 'Urls.py File', false);
    });
  } else {
    // File doesn't exist, create it with the template
    const initialData = 'from django.urls import path\n\n' + urlTemplate;
    fs.writeFile(urlsFilePath, initialData, (err) => {
      if (err) {
        console.error('Error creating urls.py:', err);
        return;
      }
      generator.addFileToQueue(initialData, urlsFilePath, 'Urls.py File', false);
    });
  }
}
