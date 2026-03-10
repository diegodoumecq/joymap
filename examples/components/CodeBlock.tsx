import { useEffect, useRef, useState } from 'react';
import { CheckIcon } from './CheckIcon';
import { CopyIcon } from './CopyIcon';


interface CodeBlockProps {
  code: string;
}

// Simple syntax highlighter for JavaScript
function highlightJS(code: string): string {
  // Order matters — we process strings/comments first to avoid highlighting inside them
  const tokens: { start: number; end: number; className: string }[] = [];

  // Comments (single-line)
  const commentRe = /\/\/.*$/gm;
  let m: RegExpExecArray | null;
  while ((m = commentRe.exec(code)) !== null) {
    tokens.push({
      start: m.index,
      end: m.index + m[0].length,
      className: 'code-comment',
    });
  }

  // Strings (template literals, double, single)
  const stringRe =
    /`(?:\\[\s\S]|\$\{[^}]*\}|[^`\\])*`|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'/g;
  while ((m = stringRe.exec(code)) !== null) {
    tokens.push({
      start: m.index,
      end: m.index + m[0].length,
      className: 'code-string',
    });
  }

  // Sort tokens by start position
  tokens.sort((a, b) => a.start - b.start);

  // Build highlighted string
  let result = '';
  let lastIndex = 0;

  for (const token of tokens) {
    if (token.start < lastIndex) continue; // Skip overlapping tokens

    // Process un-highlighted portion
    const before = code.slice(lastIndex, token.start);
    result += highlightPlain(before);

    // Add highlighted token
    const text = code.slice(token.start, token.end);
    result += `<span class="${token.className}">${escapeHtml(text)}</span>`;
    lastIndex = token.end;
  }

  // Process remaining
  result += highlightPlain(code.slice(lastIndex));

  return result;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightPlain(code: string): string {
  let result = escapeHtml(code);

  // Keywords
  result = result.replace(
    /\b(const|let|var|function|return|if|else|for|while|class|new|typeof|instanceof|async|await|import|export|default|from|throw|try|catch|finally|this|of|in)\b/g,
    '<span class="code-keyword">$1</span>',
  );

  // Built-ins / known globals
  result = result.replace(
    /\b(console|document|window|Promise|Array|Object|String|Number|Boolean|Map|Set|Proxy|Reflect|TypeError|RegExp|setTimeout|clearTimeout|undefined|null|true|false)\b/g,
    '<span class="code-builtin">$1</span>',
  );

  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>');

  // Methods after dot
  result = result.replace(/\.([a-zA-Z_]\w*)(\s*\()/g, '.<span class="code-method">$1</span>$2');

  // Function calls
  result = result.replace(/\b([a-zA-Z_]\w*)(\s*\()/g, (match, name, paren) => {
    if (match.includes('class="')) return match;
    return `<span class="code-function">${name}</span>${paren}`;
  });

  // Arrow
  result = result.replace(/=&gt;/g, '<span class="code-keyword">=&gt;</span>');

  return result;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = highlightJS(code);
    }
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-secondary/50">
      <div className="flex items-center justify-between border-b border-border bg-secondary/80 px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">Javascript</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <CheckIcon className="h-3.5 w-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <CopyIcon className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed">
          <code ref={codeRef} className="font-mono" />
        </pre>
      </div>
    </div>
  );
}
