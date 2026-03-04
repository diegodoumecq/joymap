import { useState } from 'react';

import { CodeBlock } from './CodeBlock';
import { CodesandboxLink } from './components';
import { Button } from './components/Button';
import { GithubIcon } from './components/GithubIcon';
import { IframeCard } from './components/IframeCard';
import { Link } from './components/Link';
import editorResources from './sandboxParams/editorSandbox';
import fightingResources from './sandboxParams/fightingSandbox';
import logResources from './sandboxParams/logSandbox';
import reactResources from './sandboxParams/reactSandbox';
import rumbleResources from './sandboxParams/rumbleSandbox';
import { version } from './sandboxParams/utils';

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
  title: string;
  gitPath?: string;
  params?: string;
  description?: string;
  tags: string[];
  code?: string;
}

export const examples: Record<string, Page> = {
  readme: {
    html: 'examples/Readme/index.html',
    title: 'Readme',
    tags: [],
  },
  react: {
    html: 'examples/React/index.html',
    title: 'React Example',
    gitPath: 'tree/master/examples/React',
    params: reactResources,
    tags: ['queryModule', 'react'],
    description:
      'A React component that visualizes gamepad input in real-time with button and stick visualization.',
  },
  fighting: {
    html: 'examples/Fighting/index.html',
    title: 'Fighting Example',
    gitPath: 'tree/master/examples/Fighting',
    params: fightingResources,
    tags: ['queryModule'],
    description: 'A fighting game demo with fast input handling and combo detection.',
  },
  rumble: {
    html: 'examples/Rumble/index.html',
    title: 'Rumble Example',
    gitPath: 'tree/master/examples/Rumble',
    params: rumbleResources,
    tags: ['queryModule', 'canvas'],
    description: 'Demonstrates gamepad vibration/rumble effects on supported controllers.',
  },
  log: {
    html: 'examples/Log/index.html',
    title: 'Log Example',
    gitPath: 'tree/master/examples/Log',
    params: logResources,
    tags: ['queryModule', 'html', 'console'],
    description: 'Displays all gamepad events in a scrollable log for debugging.',
  },
  editor: {
    html: 'examples/Editor/index.html',
    title: 'Editor Example',
    gitPath: 'tree/master/examples/Editor',
    params: editorResources,
    tags: ['eventModule', 'react'],
    description: 'A text editor example that binds gamepad buttons to keyboard events.',
  },
};

export function Main() {
  const [activeCategory, setActiveCategory] = useState('readme');

  const current = examples[activeCategory];

  if (!current) return null;

  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary">
              <img src="/assets/logo.png" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              Joymap Examples
            </h1>
          </div>
          <div className="mx-auto max-w-5xl">
            <nav
              className="scrollbar-hide flex items-center gap-2 overflow-x-auto"
              role="tablist"
              aria-label="Filter by category"
            >
              {Object.keys(examples).map((cat) => {
                const isActive = cat === activeCategory;

                return (
                  <Button
                    key={cat}
                    role="tab"
                    onClick={() => setActiveCategory(cat)}
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
                {!!current.params && <CodesandboxLink value={current.params} />}
                {current.gitPath && (
                  <Link
                    target="_blank"
                    href={`https://github.com/diegodoumecq/joymap/${current.gitPath}`}
                  >
                    <GithubIcon />
                    <span>View on github</span>
                  </Link>
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
              src={current.html}
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
  );
}
