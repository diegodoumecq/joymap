declare module 'write-file-webpack-plugin' {
  type main = () => {
    apply: (compiler: any) => void;
  };
  export default main;
}
