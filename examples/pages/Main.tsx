import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  CodeBlock,
  GithubIcon,
  IframeCard,
  Link,
  StackblitzButton,
  Tooltip,
  TooltipProvider,
} from '@/examples/components';
import logoUrl from '../assets/logo.png';
import { editorFiles } from './Editor/_files';
import { fightingFiles } from './Fighting/_files';
import { logFiles } from './Log/_files';
import { navigationFiles } from './Navigation/_files';
import { phaserFiles } from './Phaser/_files';
import { reactFiles } from './React/_files';
import { rumbleFiles } from './Rumble/_files';
import { version } from './utils';

// const _code = `const users = [
//   { name: "Alice", age: 28, active: true },
//   { name: "Bob", age: 34, active: false },
//   { name: "Carol", age: 22, active: true },
//   { name: "Dave", age: 45, active: true },
// ];

// const activeNames = users
//   .filter(user => user.active)
//   .map(user => user.name);

// console.log(activeNames);
// // => ["Alice", "Carol", "Dave"]`;

interface Page {
  html: string;
  gitPath?: string;
  stackblitz?: Record<string, string>;
  description?: string;
  tags: string[];
  code?: string;
}

export const examples: Record<string, Page> = {
  readme: {
    html: 'examples/pages/Readme/index.html',
    tags: [],
  },
  react: {
    html: 'examples/pages/React/index.html',
    gitPath: 'tree/master/examples/pages/React',
    stackblitz: reactFiles,
    tags: ['queryModule', 'react'],
    description:
      'A React component that visualizes gamepad input in real-time with button and stick visualization.',
  },
  fighting: {
    html: 'examples/pages/Fighting/index.html',
    gitPath: 'tree/master/examples/pages/Fighting',
    stackblitz: fightingFiles,
    tags: ['queryModule'],
    description: 'A fighting game demo with fast input handling and combo detection.',
  },
  rumble: {
    html: 'examples/pages/Rumble/index.html',
    gitPath: 'tree/master/examples/pages/Rumble',
    stackblitz: rumbleFiles,
    tags: ['queryModule', 'game', 'canvas'],
    description: 'Demonstrates gamepad vibration/rumble effects on supported controllers.',
  },
  log: {
    html: 'examples/pages/Log/index.html',
    gitPath: 'tree/master/examples/pages/Log',
    stackblitz: logFiles,
    tags: ['queryModule', 'html', 'console'],
    description: 'Displays all gamepad events in a scrollable log for debugging.',
  },
  editor: {
    html: 'examples/pages/Editor/index.html',
    gitPath: 'tree/master/examples/pages/Editor',
    stackblitz: editorFiles,
    tags: ['eventModule', 'react', 'WYSIWYG'],
    description: 'A text editor example that binds gamepad buttons to keyboard events.',
  },
  phaser: {
    html: 'examples/pages/Phaser/index.html',
    gitPath: 'tree/master/examples/pages/Phaser',
    stackblitz: phaserFiles,
    tags: ['queryModule', 'game', 'phaser'],
    description: 'A Phaser game menu demonstrating a game menu with joymap.',
  },
  nav: {
    html: 'examples/pages/Navigation/index.html',
    gitPath: 'tree/master/examples/pages/Navigation',
    stackblitz: navigationFiles,
    tags: ['eventModule', 'plain html', 'accesibility'],
    description:
      'Navigate any website using a gamepad with spatial focus detection and section skipping.',
  },
};

export function Main() {
  const { page } = useParams();
  const navigate = useNavigate();

  const activeCategory = Object.keys(examples).includes(page ?? '') ? page! : 'readme';

  const handleNavigate = (cat: string) => navigate(`/examples/${cat}`);

  const current = examples[activeCategory];

  if (!current) return null;

  return (
    <TooltipProvider>
      <div className="flex h-screen flex-col">
        <header className="sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary">
                <img src={logoUrl} />
              </div>
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                Joymap Examples
              </h1>
            </div>
            <div className="mx-auto flex max-w-5xl self-stretch">
              <nav
                className="scrollbar-hide flex items-center gap-2 overflow-x-auto px-2"
                role="tablist"
                aria-label="Filter by category"
              >
                {Object.keys(examples).map((cat) => {
                  const isActive = cat === activeCategory;

                  return (
                    <Button
                      key={cat}
                      role="tab"
                      onClick={() => handleNavigate(cat)}
                      isActive={isActive}
                    >
                      {cat}
                    </Button>
                  );
                })}
              </nav>
            </div>
          </div>
        </header>

        <main className="flex w-full flex-1 flex-col">
          <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 py-4">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  {current.tags.map((tag) => (
                    <span
                      key={tag}
                      className={
                        'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md bg-secondary px-4 py-0.5 font-mono text-xs font-medium whitespace-nowrap text-secondary-foreground'
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end">
                  {current.stackblitz && <StackblitzButton files={current.stackblitz} />}
                  {current.gitPath && (
                    <Tooltip content="View example on github">
                      <Link
                        target="_blank"
                        href={`https://github.com/diegodoumecq/joymap/${current.gitPath}`}
                      >
                        <GithubIcon />
                      </Link>
                    </Tooltip>
                  )}
                </div>
              </div>

              <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
                {current.description}
              </p>
            </div>

            {current.code && <CodeBlock code={current.code} />}

            <IframeCard
              path={
                activeCategory === 'readme'
                  ? 'README.md'
                  : current.html.replace(/\/index\.html$/, '/')
              }
            >
              <iframe
                key={current.html}
                src={`${import.meta.env.BASE_URL}${current.html}`}
                className="relative block h-full w-full"
              />
            </IframeCard>
          </div>
        </main>

        <footer className="border-t border-border py-4">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
            <span className="font-mono text-xs text-muted-foreground">v{version}</span>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
