#!/usr/bin/env bash
# Make the live demo the new golden copy, so every nightly reset brings back what is in it now (the data in the demo video).
# Copies the whole demo database, visitors' changes too: reset the demo first, then make your edits, then promote the same day.
# The previous golden is kept as <golden>-prev. Needs the turso CLI, signed in.
#   scripts/demo-promote.sh sb|ls|sav      (sb = boiler-erp, ls = electronics-erp, sav = interiors-erp)
set -euo pipefail
case "${1:-}" in sb|ls|sav) d=$1 ;; *) echo "usage: $0 sb|ls|sav" >&2; exit 1 ;; esac
g=$d-demo-golden

turso db destroy "$g-prev" --yes 2>/dev/null || true
turso db create "$g-prev" --group "${d}demo" --from-db "$g" -w
turso db destroy "$g" --yes
trap 'echo "Promote failed after golden was removed. Restore: turso db create $g --group ${d}demo --from-db $g-prev -w" >&2' ERR
turso db create "$g" --group "${d}demo" --from-db "$d-demo" -w
echo "Done: $g is now a copy of $d-demo (old golden kept as $g-prev)."
