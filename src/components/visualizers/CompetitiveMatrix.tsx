import { IconCheck, IconX, IconShield } from '../ui/CustomSvgIcons';

export function CompetitiveMatrix() {
  const criteria = [
    { key: 'abdm', label: 'ABDM / ABHA integration' },
    { key: 'family', label: 'Family multi-member profiles' },
    { key: 'doctor_browser', label: 'Doctor browser access, no install' },
    { key: 'ai_digitization', label: 'AI digitization of handwritten records' },
    { key: 'provider_lockin', label: 'Provider workflow lock-in strategy' },
    { key: 'entry_motion', label: 'Consumer → Provider entry motion' },
  ];

  const competitors = [
    {
      name: 'AarogyaDamu',
      isHero: true,
      scores: {
        abdm: '✓',
        family: '✓',
        doctor_browser: '✓',
        ai_digitization: '✓',
        provider_lockin: '✓',
        entry_motion: '✓',
      }
    },
    {
      name: 'Eka Care',
      scores: {
        abdm: '✓',
        family: 'Limited',
        doctor_browser: '✗',
        ai_digitization: 'Limited',
        provider_lockin: 'Partial',
        entry_motion: '✗',
      }
    },
    {
      name: 'Ayu',
      isClosest: true,
      scores: {
        abdm: '✓',
        family: '✓',
        doctor_browser: '✗',
        ai_digitization: '✓',
        provider_lockin: '✗',
        entry_motion: '✗',
      }
    },
    {
      name: 'Practo',
      scores: {
        abdm: 'Partial',
        family: '✗',
        doctor_browser: '✗',
        ai_digitization: '✗',
        provider_lockin: '✗',
        entry_motion: '✗',
      }
    },
    {
      name: 'ABHA App',
      scores: {
        abdm: '✓ (native)',
        family: '✗',
        doctor_browser: '✗',
        ai_digitization: '✗',
        provider_lockin: '✗',
        entry_motion: '✗',
      }
    },
  ];

  const renderCell = (val: string, isHero: boolean) => {
    if (val === '✓' || val.includes('native')) {
      return (
        <span className={`inline-flex items-center gap-1 font-bold text-xs ${
          isHero ? 'text-accent bg-accent/10 px-2 py-1 rounded-md' : 'text-sage'
        }`}>
          <IconCheck className="w-3.5 h-3.5" /> {val !== '✓' ? val : ''}
        </span>
      );
    }
    if (val === '✗') {
      return <IconX className="w-3.5 h-3.5 text-foreground-subtle mx-auto" />;
    }
    return <span className="text-xs font-medium text-foreground-muted">{val}</span>;
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-12 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent uppercase tracking-wider">
          <IconShield className="w-3.5 h-3.5" />
          Competitive Advantage
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          A crowded map, <span className="text-accent italic font-normal">with one real look-alike</span>
        </h2>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-3xl bg-surface border border-border shadow-sm">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-border bg-surface-subtle">
              <th className="p-4 sm:p-5 text-xs font-mono uppercase tracking-wider text-foreground-muted">Feature / Capability</th>
              {competitors.map((comp, idx) => (
                <th
                  key={idx}
                  className={`p-4 sm:p-5 text-center text-sm font-bold ${
                    comp.isHero
                      ? 'bg-surface-dark text-white font-serif text-base'
                      : comp.isClosest
                      ? 'text-foreground bg-accent/5'
                      : 'text-foreground'
                  }`}
                >
                  {comp.name}
                  {comp.isClosest && (
                    <span className="block text-[10px] font-sans font-normal text-accent uppercase tracking-wider">
                      Closest Competitor
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs sm:text-sm">
            {criteria.map((item, idx) => (
              <tr key={idx} className="hover:bg-background/50 transition-colors">
                <td className="p-4 sm:p-5 font-semibold text-foreground">{item.label}</td>
                {competitors.map((comp, cIdx) => (
                  <td
                    key={cIdx}
                    className={`p-4 sm:p-5 text-center ${
                      comp.isHero ? 'bg-accent/5 font-bold border-x border-accent/20' : ''
                    }`}
                  >
                    {renderCell(comp.scores[item.key as keyof typeof comp.scores], !!comp.isHero)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Differentiator Callout Box */}
      <div className="p-6 rounded-3xl bg-surface-dark text-white border border-white/10 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-accent font-semibold uppercase tracking-wider">
          <IconShield className="w-4 h-4" /> Unfair Competitive Edge
        </div>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          <strong className="text-white font-bold">Ayu is the closest look-alike</strong> - strong on family record digitization. Our edge is the <strong className="text-accent font-bold">doctor-side workflow:</strong> browser-based, zero-install access that turns a patient-side app into a provider-adoption engine.
        </p>
      </div>
    </div>
  );
}
