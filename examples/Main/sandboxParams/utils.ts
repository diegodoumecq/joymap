import packageJson from '../../../package.json';

export { packageJson };

const codeTransforms: [RegExp, string][] = [
  [new RegExp('../../src/index', 'g'), 'joymap'],
  [
    new RegExp('../rotatingLogo', 'g'),
    './rotatingLogo',
  ],
  [
    new RegExp('bullet.png', 'g'),
    'https://raw.githubusercontent.com/diegodoumecq/joymap/master/assets/bullet.png',
  ],
  [
    new RegExp('gamepad.png', 'g'),
    'https://raw.githubusercontent.com/diegodoumecq/joymap/master/assets/gamepad.png',
  ],
  [
    new RegExp('L1.png', 'g'),
    'https://raw.githubusercontent.com/diegodoumecq/joymap/master/assets/L1.png',
  ],
  [
    new RegExp('L2.png', 'g'),
    'https://raw.githubusercontent.com/diegodoumecq/joymap/master/assets/L2.png',
  ],
  [
    new RegExp('smallBullet.png', 'g'),
    'https://raw.githubusercontent.com/diegodoumecq/joymap/master/assets/smallBullet.png',
  ],
];

export function cleanupCode(code: string) {
  return codeTransforms.reduce((acc, [regex, value]) => acc.replace(regex, value), code);
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
  isTs?: boolean;
  hasReact?: boolean;
  hasLodash?: boolean;
};

export function makePckJson({
  dependencies = {},
  devDependencies = {},
  isTs = true,
  hasLodash = true,
  hasReact = false,
}: makePckJsonOptions = {}) {
  return JSON.stringify({
    dependencies: {
      joymap: packageJson.version,
      ...(isTs ? { tslib: 'latest' } : {}),
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
      'parcel-bundler': '^1.6.1',
      ...(hasLodash ? { '@types/lodash': packageJson.devDependencies['@types/lodash'] } : {}),
      ...(hasReact
        ? {
            '@types/react': packageJson.devDependencies['@types/react'],
            '@types/react-dom': packageJson.devDependencies['@types/react-dom'],
          }
        : {}),
      ...devDependencies,
    },
  });
}
