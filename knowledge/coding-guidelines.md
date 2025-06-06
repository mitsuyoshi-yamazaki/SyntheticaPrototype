## このファイルについて

- 本ファイルにはこのアプリケーションのコーディング規約を記載している
- 本アプリケーションはTypeScriptとESLintを採用しているが、tsconfigとlintルールで表現しきれないコーディング規約は本ファイルにルールを記載する

## Copilotへの指示

- ソースコードを作成・編集する際は、tsconfigやlintルールで規定されたルールに従うこと。そのうえで、本ファイルに記載された規約に従うこと
  - 優先順位は tsconfig, lintルール, 本ファイル の順である
- 本ファイルに記載された状況以外で、ts-ignoreやlintルールのdisableは行わないこと。disableすることが適当と考えられる場合は、人間に指示を仰ぐこと

## コーディング規約

### 一般

- 構造的に等しくとも相互の代入を行わない型はNominal Typeを用いる
- インスタンスメンバや変数は可能な限りimmutableにする
- 例外は使用しない

### TypeScript

- 関数定義は可能な限りfunctionではなくconstを用いる
- 言語仕様としてのEnumは使わず、Literal Union型もしくはDiscriminated Union型を用いる
  - Discriminated Union型を用いる場合は、Discriminatorのプロパティ名は"case"とする
- private変数は "\_" から始まるメンバ名をつける
- forループは forEach(), for-of, for-in の順で優先する。for-inは極力使用しない
