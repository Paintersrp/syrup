import { execSync } from 'child_process';

import { handleFunction } from '../utils/error.js';
import { getPaths } from '../utils/getPaths.js';


// Log feedback
export async function generateEndpoint(app_name) {
  await handleFunction(async () => {
    const paths = getPaths();

    execSync(`python manage.py startapp ${app_name}`, {
      stdio: 'inherit',
      cwd: paths.api.abs,
    });
  });
}
