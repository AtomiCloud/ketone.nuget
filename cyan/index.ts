import { Cyan, GlobType, IDeterminism, IInquirer, StartTemplateWithLambda } from '@atomicloud/cyan-sdk';

StartTemplateWithLambda(async (i: IInquirer, d: IDeterminism): Promise<Cyan> => {
  const name = await i.text('Name', "Nuget Package's Name. Please use Pascal Case");

  const p = await i.text('Platform', "AtomiCloud LPSM Service Tree's Platform");
  const s = await i.text('Service', "AtomiCloud LPSM Service Tree's Service");

  const platform = p.toLowerCase();
  const service = s.toLowerCase();

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const namespace = capitalize(platform) + capitalize(service);

  const desc = await i.text('Description', "Nuget Package's Description");

  return {
    processors: [
      {
        name: 'cyan/default',
        files: [
          {
            glob: '**/*',
            root: 'template',
            type: GlobType.Template,
            exclude: ['**/logo.png'],
          },
          {
            glob: '**/logo.png',
            root: 'template/',
            type: GlobType.Copy,
            exclude: [],
          },
        ],
        config: {
          vars: {
            name,
            platform,
            service,
            namespace,
            desc,
          },
          parser: {
            varSyntax: [['let___', '___']],
          },
        },
      },
    ],
    plugins: [],
  };
});
