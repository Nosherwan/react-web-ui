declare module "eslint-plugin-react-hooks" {
  const plugin: {
    configs: {
      recommended: {
        rules: Record<string, unknown>;
      };
    };
  };
  export default plugin;
}
