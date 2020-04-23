const codeTransforms: [RegExp, string][] = [
  [new RegExp('../../src/index', 'g'), 'joymap'],
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
