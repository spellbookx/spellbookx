export default {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (commit) => commit.startsWith('fixup!') || commit.startsWith('squash!'),
  ],
};
