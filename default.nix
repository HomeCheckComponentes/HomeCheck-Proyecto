with import <nixpkgs> {};
mkShell {
  nativeBuildInputs = [
    bashInteractive
  ];
  buildInputs = [
    # .NET stuff
    azure-cli
    dotnet-sdk_3
    dotnet-netcore
    mongodb
    omnisharp-roslyn
    nodejs
  ];
}
