# Repository workflow notes

## Getting changes to GitHub
- Local edits (including the localization fixes to the schedule/document views) live only on this branch until you push them to the remote repository.
- To publish them on GitHub, run `git push origin work` (or your active branch name).
- After the push, open a pull request if you want code review or CI to run on GitHub.

## Recent localization adjustment
- The schedule day header, hint, and documents header/search strings were wired to existing `data-i18n` keys so language toggles redraw those labels without hard-coded English copies.
- Supporting IDs (`scheduleDayTitle`, `scheduleDayHint`, `documentsHeader`) let the language-applier update those nodes whenever the locale changes.
