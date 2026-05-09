import { dataSource } from '../typeorm.config';

async function seed() {
  await dataSource.initialize();

  const result = await dataSource.query(`SELECT id FROM air_representation_configs LIMIT 1`);
  
  if (result.length > 0) {
    console.log('Air representation config already seeded, skipping.');
    await dataSource.destroy();
    return;
  }

  const importSections = [
    {
      id: 'imp-1',
      icon: 'Radar',
      title: 'Representação em Aeroportos',
      desc: 'Sendo a extensão da sua empresa, atuamos como uma ponte estratégica, assumindo de forma profissional as operações nos aeroportos GRU (Guarulhos) e VCP (Viracopos).',
      topics: 'Soluções ágeis, seguras e personalizadas\nVasto conhecimento técnico e operacional\nAtendimento exclusivo e dedicado\nParceiro estratégico preparado para complexidade'
    },
    {
      id: 'imp-2',
      icon: 'Landmark',
      title: 'CCT Importação e CE Mercante',
      desc: 'Somos referência no segmento, com atuação ativa desde o período de implantação do CCT Importação.',
      topics: 'Rastreabilidade em cada etapa do processo\nFollow-up atualizado em tempo real\nOperações 24 horas por dia, 7 dias por semana\nEquipe pronta para lançamentos em finais de semana e feriados'
    },
    {
      id: 'imp-3',
      icon: 'Truck',
      title: 'Distribuição de Cargas',
      desc: 'Na Avant, entendemos que a eficiência na distribuição é decisiva para o sucesso das operações de importação.',
      topics: 'Frota credenciada e parceiros estratégicos\nProcessos padronizados de alta qualidade\nSegurança, agilidade e rastreabilidade total\nRedução de custos e otimização de prazos'
    }
  ];

  const exportSections = [
    {
      id: 'exp-1',
      icon: 'Plane',
      title: 'Preparação de cargas',
      desc: 'Exportação aérea exige velocidade, precisão e total conformidade. Oferecemos um serviço completo de preparação de cargas para exportações aéreas.',
      topics: 'Velocidade e precisão documental\nMáxima segurança e eficiência\nKnow-how em comércio exterior\nRedução de custos operacionais'
    },
    {
      id: 'exp-2',
      icon: 'Zap',
      title: 'Operações Urgentes',
      desc: 'Seu cliente não pode esperar? Cuidamos disso! Oferecemos soluções rápidas, especializadas e seguras em exportação aérea.',
      topics: 'Atuação direta nos principais aeroportos\nEstrutura própria e equipe especializada\nProcessos ágeis da coleta ao embarque\nResultados seguros e eficientes'
    },
    {
      id: 'exp-3',
      icon: 'Monitor',
      title: 'Sistemas comércio exterior',
      desc: 'A exportação aérea exige precisão documental e total conformidade com os órgãos reguladores.',
      topics: 'Precisão documental e conformidade\nLançamentos no Portal Único\nE-awb especializado\nTerceirização ágil e segura'
    },
    {
      id: 'exp-4',
      icon: 'PackageCheck',
      title: 'Transporte e Pré-Embarque',
      desc: 'Antes da carga chegar ao aeroporto, cada detalhe da operação faz diferença no sucesso da exportação.',
      topics: 'Soluções completas de transporte\nCheck-list físico e etiquetagem\nPré-cadastro nos terminais\nAtualizações em tempo real'
    }
  ];

  await dataSource.query(
    `INSERT INTO air_representation_configs (header_badge, header_title_dark, header_title_highlight, header_description, import_sections, export_sections)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      'REPRESENTAÇÃO ESTRATÉGICA',
      'Representações',
      'Aéreas',
      'Integramos operações de importação e exportação com foco em agilidade, segurança e conformidade total nos principais aeroportos do Brasil.',
      JSON.stringify(importSections),
      JSON.stringify(exportSections)
    ]
  );

  console.log('Air representation config seeded successfully!');
  await dataSource.destroy();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
