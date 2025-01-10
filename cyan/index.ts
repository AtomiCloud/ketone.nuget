import { Cyan, GlobType, IDeterminism, IInquirer, StartTemplateWithLambda } from '@atomicloud/cyan-sdk';

StartTemplateWithLambda(async (i: IInquirer, d: IDeterminism): Promise<Cyan> => {
  const name = await i.text('Name', "Nuget Package's Name. Please use Pascal Case");

  const platform = await i.text('Platform', "AtomiCloud LPSM Service Tree's Platform");
  const service = await i.text('Service', "AtomiCloud LPSM Service Tree's Service");

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
