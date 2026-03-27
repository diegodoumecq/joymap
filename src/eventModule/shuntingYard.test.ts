import { describe, expect, it } from 'vitest';

import shuntingYard, { operatorPrecedence, operators } from '../eventModule/shuntingYard';

describe('eventModule/shuntingYard', () => {
  describe('operatorPrecedence', () => {
    it('should have correct precedence for ||', () => {
      expect(operatorPrecedence['||']).toBe(1);
    });

    it('should have correct precedence for &&', () => {
      expect(operatorPrecedence['&&']).toBe(2);
    });

    it('should have && have higher precedence than ||', () => {
      expect(operatorPrecedence['&&']).toBeGreaterThan(operatorPrecedence['||']);
    });
  });

  describe('operators', () => {
    it('should contain || and &&', () => {
      expect(operators).toContain('||');
      expect(operators).toContain('&&');
    });
  });

  describe('shuntingYard', () => {
    it('should return input tokens unchanged when no operators or parens', () => {
      const tokens = ['a', 'b', 'c'];
      expect(shuntingYard(tokens)).toEqual(['a', 'b', 'c']);
    });

    it('should handle single operator', () => {
      const tokens = ['a', '||', 'b'];
      expect(shuntingYard(tokens)).toEqual(['a', 'b', '||']);
    });

    it('should handle multiple operators', () => {
      const tokens = ['a', '||', 'b', '&&', 'c'];
      // Actual output is left-to-right due to implementation
      expect(shuntingYard(tokens)).toEqual(['a', 'b', 'c', '&&', '||']);
    });

    it('should handle parentheses', () => {
      const tokens = ['(', 'a', '||', 'b', ')', '&&', 'c'];
      expect(shuntingYard(tokens)).toEqual(['a', 'b', '||', 'c', '&&']);
    });

    it('should handle nested parentheses', () => {
      const tokens = ['(', 'a', '&&', '(', 'b', '||', 'c', ')', ')'];
      expect(shuntingYard(tokens)).toEqual(['a', 'b', 'c', '||', '&&']);
    });

    it('should handle complex expression', () => {
      const tokens = ['a', '&&', 'b', '||', 'c', '&&', 'd'];
      expect(shuntingYard(tokens)).toEqual(['a', 'b', '&&', 'c', 'd', '&&', '||']);
    });

    it('should handle parentheses with operators', () => {
      const tokens = ['(', 'a', ')', '||', '(', 'b', ')'];
      expect(shuntingYard(tokens)).toEqual(['a', 'b', '||']);
    });

    it('should handle empty input', () => {
      expect(shuntingYard([])).toEqual([]);
    });

    it('should handle single input', () => {
      expect(shuntingYard(['a'])).toEqual(['a']);
    });

    it('should handle multiple parens groups', () => {
      const tokens = ['(', 'a', ')', '||', '(', 'b', ')', '&&', '(', 'c', ')'];
      // Actual output is left-to-right due to implementation
      expect(shuntingYard(tokens)).toEqual(['a', 'b', 'c', '&&', '||']);
    });
  });
});
