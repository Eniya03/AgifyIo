import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  //  Cucumber preprocessor plugin
  await addCucumberPreprocessorPlugin(on, config);

  //  ESBuild plugin
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  //  environment variable for the API key
  config.env.API_KEY = process.env.CYPRESS_API_KEY;

  
  return config;
}

export default defineConfig({
  e2e: {
   
    specPattern: '**/*.feature',

   
    setupNodeEvents,

    
    env: {
      TAGS: 'not @ratelimit',
    },
  },
});
