#!/usr/bin/env bash
set -euo pipefail

mkdir -p packages/schema-validator/src
mkdir -p packages/schema-generator/src

cat >tsconfig.base.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM"],
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "composite": true,
    "strict": true,
    "noEmit": false,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@spellbookx/*": ["packages/*/src"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
EOF

cat >tsconfig.json <<'EOF'
{
  "files": [],
  "references": [
    { "path": "packages/schema-validator" },
    { "path": "packages/schema-generator" }
  ]
}
EOF

cat >pnpm-workspace.yaml <<'EOF'
packages:
  - packages/*
EOF

# package.json (placeholder)
cat >package.json <<'EOF'
{
  "name": "spellbookx",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc -b"
  },
  "devDependencies": {
    "typescript": "^5.4.5"
  }
}
EOF

for pkg in schema-validator schema-generator; do
  cat >packages/$pkg/tsconfig.json <<EOF
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"],
  "references": []
}
EOF

  cat >packages/$pkg/src/index.ts <<EOF
// ${pkg} entrypoint
EOF
done

# Aggiungi il riferimento a schema-validator in schema-generator
jq '.references = [{"path": "../schema-validator"}]' \
  packages/schema-generator/tsconfig.json >tmp.json && mv tmp.json packages/schema-generator/tsconfig.json

echo "✅ Monorepo setup complete."
