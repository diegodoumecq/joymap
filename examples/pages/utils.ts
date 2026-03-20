import packageJson from '../../package.json';

export const { devDependencies, version } = packageJson;

const codeTransforms: [RegExp, string][] = [
  [
    /^\s*import\s+[A-Za-z_$][\w$]*\s+from\s+['"]@\/examples\/assets\/[^'"]+\.(png|jpg|jpeg|svg|webp|gif)['"];?\s*(?:\/\/.*)?$/gm,
    '',
  ],
  [
    new RegExp('gamepadUrl', 'g'),
    "'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/gamepad.png'",
  ],
  [
    new RegExp('l1Url', 'g'),
    "'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/L1.png'",
  ],
  [
    new RegExp('l2Url', 'g'),
    "'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/L2.png'",
  ],
  [
    new RegExp('logoUrl', 'g'),
    "'https://raw.githubusercontent.com/diegodoumecq/joymap/master/examples/assets/logo.png'",
  ],
];

export function cleanupCode(code: string) {
  return codeTransforms.reduce((acc, [regex, value]) => acc.replaceAll(regex, value), code);
}

export const tsconfig = JSON.stringify({
  compilerOptions: {
    target: 'ESNext',
    module: 'ESNext',
    moduleResolution: 'node',
    importHelpers: true,
    sourceMap: true,
    allowSyntheticDefaultImports: true,
    rootDir: './',
    lib: ['esnext', 'dom'],
    strict: true,
    alwaysStrict: true,
    allowJs: true,
    baseUrl: './',
    jsx: 'react',
    esModuleInterop: true,
  },
});

export const viteconfig = `
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [react()],
  })
`;

type Deps = Record<string, string>;
type makePckJsonOptions = {
  dependencies?: Deps;
  hasReact?: boolean;
  hasLodash?: boolean;
};

export function makePckJson({
  dependencies = {},
  hasLodash = true,
  hasReact = false,
}: makePckJsonOptions = {}) {
  return JSON.stringify({
    main: './index.ts',
    // type: 'module',
    scripts: {
      start: 'vite',
      build: 'tsc -b && vite build',
    },
    dependencies: {
      joymap: packageJson.version,
      typescript: '~5.9.3',
      vite: '^8.0.0',
      ...(hasLodash
        ? {
            lodash: packageJson.dependencies.lodash,
            '@types/lodash': packageJson.devDependencies['@types/lodash'],
          }
        : {}),
      ...(hasReact
        ? {
            react: packageJson.devDependencies.react,
            'react-dom': packageJson.devDependencies['react-dom'],
            '@types/react': packageJson.devDependencies['@types/react'],
            '@types/react-dom': packageJson.devDependencies['@types/react-dom'],
            '@vitejs/plugin-react': '^6.0.1',
          }
        : {}),
      ...dependencies,
    },
  });
}
