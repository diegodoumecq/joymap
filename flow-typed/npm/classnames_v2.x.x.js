// flow-typed signature: 2aa98046265f0f1f1f00a6d07d89027e
// flow-typed version: dc0ded3d57/classnames_v2.x.x/flow_>=v0.28.x

type $npm$classnames$Classes =
  string |
  {[className: string]: ?boolean } |
  Array<string> |
  false |
  void |
  null

declare module 'classnames' {
  declare function exports(
    ...classes: Array<$npm$classnames$Classes>
  ): string;
}
