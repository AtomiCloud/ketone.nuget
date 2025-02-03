{ pkgs, packages }:
with packages;
{
  system = [
    sg
    atomiutils
  ];

  dev = [
    pls
    git
  ];

  main = [
    infisical
    bun
  ];

  lint = [
    # core
    treefmt
    shellcheck
  ];
}
