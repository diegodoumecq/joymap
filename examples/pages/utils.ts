import LZString from 'lz-string';

import packageJson from '../../package.json';

export const { devDependencies, version } = packageJson;

const codeTransforms: [RegExp, string][] = [
  [
    /^\s*import\s+[A-Za-z_$][\w$]*\s+from\s+['"]@\/public\/assets\/[^'"]+\.(png|jpg|jpeg|svg|webp|gif)['"];?\s*(?:\/\/.*)?$/gm,
    '',
  ],
  [
    new RegExp('gamepadUrl', 'g'),
    "'https://raw.githubusercontent.com/diegodoumecq/joymap/master/public/assets/gamepad.png'",
  ],
  [
    new RegExp('l1Url', 'g'),
    "'https://raw.githubusercontent.com/diegodoumecq/joymap/master/public/assets/L1.png'",
  ],
  [
    new RegExp('l2Url', 'g'),
    "'https://raw.githubusercontent.com/diegodoumecq/joymap/master/public/assets/L2.png'",
  ],
];

export function cleanupCode(code: string) {
  return codeTransforms.reduce((acc, [regex, value]) => acc.replaceAll(regex, value), code);
}

export const tsconfig = {
  isBinary: false,
  content: JSON.stringify({
    compilerOptions: {
      target: 'esnext',
      module: 'commonjs',
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
  }),
};

type Deps = Record<string, string>;
type makePckJsonOptions = {
  dependencies?: Deps;
  devDependencies?: Deps;
  hasReact?: boolean;
  hasLodash?: boolean;
  reactScripts?: boolean;
};

export function makePckJson({
  dependencies = {},
  devDependencies = {},
  hasLodash = true,
  hasReact = false,
  reactScripts = false,
}: makePckJsonOptions = {}) {
  return JSON.stringify({
    main: './index.ts',
    dependencies: {
      joymap: packageJson.version,
      tslib: 'latest',
      ...(hasLodash ? { lodash: packageJson.dependencies.lodash } : {}),
      ...(hasReact
        ? {
            react: packageJson.devDependencies.react,
            'react-dom': packageJson.devDependencies['react-dom'],
          }
        : {}),
      ...dependencies,
    },
    devDependencies: {
      ...(hasLodash ? { '@types/lodash': packageJson.devDependencies['@types/lodash'] } : {}),
      ...(hasReact
        ? {
            '@types/react': packageJson.devDependencies['@types/react'],
            '@types/react-dom': packageJson.devDependencies['@types/react-dom'],
          }
        : {}),
      ...(reactScripts ? { 'react-scripts': 'latest' } : { parcel: 'latest' }),
      ...devDependencies,
    },
    ...(reactScripts
      ? {
          scripts: {
            start: 'react-scripts start',
            build: 'react-scripts build',
          },
        }
      : {}),
  });
}

export interface IFiles {
  [key: string]: {
    content: string;
    isBinary: boolean;
  };
}

export function compress(files: IFiles) {
  const input = JSON.stringify({ files });
  return LZString.compressToBase64(input)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}
