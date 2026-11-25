#!/usr/bin/env bash
# Regenerate docs/tests/generated/*.html with real generators (pinned versions).
# The output is committed, so running the tests does NOT need any of these tools.
# Usage: tests/generate.sh [name ...]     (default: all)
# Needs: pandoc, node/npx, uv/uvx, docker (jekyll only)
set -euo pipefail
ROOT=$(cd "$(dirname "$0")/.." && pwd)
SRC=$ROOT/tests/src
OUT=$ROOT/docs/tests/generated
CSS=../../classless.css
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"
export SOURCE_DATE_EPOCH=0

# minimal page template for generators without a usable default theme
shell_head='<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Classless Test Page</title><link rel="stylesheet" href="'$CSS'"></head><body><main><article><h1>Classless Test Page</h1>'
shell_tail='</article></main></body></html>'

gen_pandoc() { # default standalone template, as most people use it
  pandoc "$SRC/content.md" -s --toc --mathml --css "$CSS" \
    --metadata title="Classless Test Page" --metadata author="Pandoc" -o "$OUT/pandoc.html"
}

gen_hugo() { # goldmark renderer + Chroma highlighter
  local d=$TMP/hugo
  mkdir -p "$d/content" "$d/layouts"
  printf 'baseURL="/"\ndisableKinds=["taxonomy","term","RSS","sitemap","404","section","page"]\n[markup.goldmark.renderer]\nunsafe=true\n' > "$d/hugo.toml"
  { printf -- '---\ntitle: Classless Test Page\n---\n'; cat "$SRC/content.md"; } > "$d/content/_index.md"
  echo "$shell_head{{ .TableOfContents }}{{ .Content }}$shell_tail" > "$d/layouts/index.html"
  npx -y hugo-extended@0.170.1 --source "$d" --quiet
  cp "$d/public/index.html" "$OUT/hugo.html"
}

gen_eleventy() { # markdown-it renderer
  local d=$TMP/eleventy
  mkdir -p "$d/_includes"
  echo "$shell_head{{ content | safe }}$shell_tail" > "$d/_includes/page.njk"
  { printf -- '---\nlayout: page.njk\n---\n'; cat "$SRC/content.md"; } > "$d/index.md"
  (cd "$d" && npx -y @11ty/eleventy@3.1.8 --quiet)
  cp "$d/_site/index.html" "$OUT/eleventy.html"
}

gen_jekyll() { # kramdown renderer + Rouge highlighter
  local d=$TMP/jekyll
  mkdir -p "$d/_layouts"
  echo "$shell_head{{ content }}$shell_tail" > "$d/_layouts/page.html"
  { printf -- '---\nlayout: page\n---\n'; cat "$SRC/content.md"; } > "$d/index.md"
  docker run --rm -v "$d:/site" -w /site ruby:3.3 bash -c \
    "gem install -q --no-document jekyll:4.4.1 >/dev/null && jekyll build -q && chown -R $(id -u):$(id -g) /site"
  cp "$d/_site/index.html" "$OUT/jekyll.html"
}

gen_mkdocs() { # Python-Markdown; theme reduced to the bare content
  local d=$TMP/mkdocs
  mkdir -p "$d/docs" "$d/theme"
  printf 'site_name: Classless Test Page\ntheme:\n  name: null\n  custom_dir: theme\nmarkdown_extensions: [tables, fenced_code, footnotes, def_list, admonition, toc]\n' > "$d/mkdocs.yml"
  { cat "$SRC/content.md"; printf '\n!!! note "Note"\n    An admonition.\n'; } > "$d/docs/index.md"
  echo "$shell_head{{ page.content }}$shell_tail" > "$d/theme/main.html"
  uvx --from mkdocs==1.6.1 mkdocs build -q -f "$d/mkdocs.yml"
  cp "$d/site/index.html" "$OUT/mkdocs.html"
}

gen_sphinx() { # "basic" theme markup; its stylesheets are replaced by classless
  local d=$TMP/sphinx
  mkdir -p "$d/src"
  cp "$SRC/content.rst" "$d/src/index.rst"
  printf 'project="Classless Test Page"\nhtml_theme="basic"\n' > "$d/src/conf.py"
  uvx --from sphinx==9.2.0 sphinx-build -q -b html "$d/src" "$d/out"
  # drop theme CSS/JS (not shipped with the fixture) and add classless
  sed -E -e '/<link rel="stylesheet"/d' -e '/<script /d' \
    -e "s#</head>#<link rel=\"stylesheet\" href=\"$CSS\" />\n</head>#" \
    -e "s#(\.\./)*_images/headerimg\.jpg#../../img/headerimg.jpg#g" "$d/out/index.html" > "$OUT/sphinx.html"
}

gen_docutils() { # rst2html5, linked stylesheet only
  uvx --from docutils==0.23 --with pygments==2.19.2 docutils --writer=html5 --link-stylesheet --stylesheet="$CSS" \
    --no-datestamp --no-generator "$SRC/content.rst" "$OUT/docutils.html"
}

gen_asciidoctor() {
  npx -y asciidoctor@4.3.0 -a stylesheet! -a nofooter -o - "$SRC/content.adoc" |
    sed "s#</head>#<link rel=\"stylesheet\" href=\"$CSS\">\n</head>#" > "$OUT/asciidoctor.html"
}

gen_nbconvert() { # Jupyter notebook, "basic" template (no JupyterLab CSS)
  local d=$TMP/nb
  mkdir -p "$d"
  python3 - "$d/nb.ipynb" <<'PY'
import json, sys
md = lambda i, s: {"cell_type": "markdown", "id": i, "metadata": {}, "source": s}
def code(i, src, outputs):
    return {"cell_type": "code", "id": i, "metadata": {}, "execution_count": 1, "source": src, "outputs": outputs}
cells = [
    md("a", "# Classless Test Page\n\nA notebook with *Markdown*, `code` and outputs."),
    code("b", "for i in range(3):\n    print('row', i)", [{"output_type": "stream", "name": "stdout", "text": "row 0\nrow 1\nrow 2\n"}]),
    md("c", "## A DataFrame-like table"),
    code("d", "df", [{"output_type": "execute_result", "execution_count": 1, "metadata": {}, "data": {"text/html":
        '<table class="dataframe"><thead><tr><th></th><th>name</th><th>price</th></tr></thead>'
        '<tbody><tr><th>0</th><td>Apple</td><td>0.50</td></tr><tr><th>1</th><td>Banana</td><td>0.25</td></tr></tbody></table>'}}]),
    code("e", "1/0", [{"output_type": "error", "ename": "ZeroDivisionError", "evalue": "division by zero", "traceback": ["ZeroDivisionError: division by zero"]}]),
]
json.dump({"cells": cells, "metadata": {"language_info": {"name": "python"}}, "nbformat": 4, "nbformat_minor": 5}, open(sys.argv[1], "w"))
PY
  uvx --from nbconvert==7.17.2 jupyter-nbconvert --to html --template basic --stdout "$d/nb.ipynb" > "$d/body.html"
  # the basic template emits a fragment or a full page depending on version
  if grep -qi '<html' "$d/body.html"; then
    sed "s#</head>#<link rel=\"stylesheet\" href=\"$CSS\">\n</head>#" "$d/body.html" > "$OUT/nbconvert.html"
  else
    { echo "${shell_head%<h1>*}"; cat "$d/body.html"; echo "$shell_tail"; } > "$OUT/nbconvert.html"
  fi
}

ALL="pandoc hugo eleventy jekyll mkdocs sphinx docutils asciidoctor nbconvert"
for name in ${@:-$ALL}; do
  echo "== $name"
  "gen_$name"
done
