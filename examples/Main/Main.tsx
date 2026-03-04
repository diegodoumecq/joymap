import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { GithubIcon } from './icons/GithubIcon';

import fightingResources from './sandboxParams/fightingSandbox';
import reactResources from './sandboxParams/reactSandbox';
import rumbleResources from './sandboxParams/rumbleSandbox';
import logResources from './sandboxParams/logSandbox';
import editorResources from './sandboxParams/editorSandbox';

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
    <div className="flex flex-col h-screen">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center">
              <img src="/assets/logo.png" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              Joymap Examples
            </h1>
          </div>
          <div className="max-w-5xl mx-auto">
            <nav
              className="flex items-center gap-2 overflow-x-auto scrollbar-hide"
              role="tablist"
              aria-label="Filter by category"
            >
              {Object.keys(examples).map((cat) => {
                const isActive = cat === activeCategory;

                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex cursor-pointer uppercase items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full">
        <div className="mx-auto px-4 py-4 flex flex-col flex-1 min-h-0 w-full max-w-5xl">
          {!current.description && !current.tags.length ? null : (
            <div className="mb-6">
              <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl text-pretty">
                {current.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    data-slot="badge"
                    className={
                      'inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 font-mono text-xs'
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {!!current.params && (
            <form
              action="https://codesandbox.io/api/v1/sandboxes/define"
              method="POST"
              target="_blank"
            >
              <input type="hidden" name="parameters" value={current.params} />
              <button type="submit" className="px-2 h-8 gap-2">
                <img src="/assets/codesandbox.svg" />
                <span>Edit on codesandbox</span>
              </button>
            </form>
          )}
          {current.gitPath && (
            <button
              type="button"
              className="px-2 h-8 gap-2"
              onClick={() => {
                window.open(`https://github.com/diegodoumecq/joymap/${current.gitPath}`, '_blank');
              }}
            >
              <GithubIcon />
              <span>View on github</span>
            </button>
          )}

          {current.code && <CodeBlock code={current.code} />}

          <div className="flex-1 min-h-0 w-full">
            <iframe
              key={current.html}
              src={current.html}
              className="w-full h-full block relative"
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-4">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono">{'v1.0.0'}</span>
        </div>
      </footer>
    </div>
  );
}
